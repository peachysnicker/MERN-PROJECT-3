const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Async function "categories" that queries for a list of Category docs and returns the result
    categories: async () => {
      return await Category.find();
    },

    // Async function "products" that queries for Product docs based on optional category and title parameters, constructs a filter object based on those params, populates the related Category object for each Product, and returns the resulting list of Product docs
    products: async (parent, { category, title }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (title) {
        params.title = {
          $regex: title,
        };
      }

      return await Product.find(params).populate("category");
    },

    // Async function "product" that queries for a Product doc with  _id and returns it, along with its related Category object (if exists)
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
  },

  // When someone signs up the args are received as second argument. Then a token is created for the user
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      // Token returned with the user
      return { token, user };
    },

    // When logging in will send email and password as second argument as single object to match with the user. It is then authenticated or not.
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      // token and user returned
      return { token, user };
    },

    addPaymentInfo: async (_, { payment }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to add payment info."
        );
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { payment },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
