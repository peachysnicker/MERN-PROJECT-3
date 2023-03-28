const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
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
        throw new AuthenticationError('You need to be logged in to add payment info.');
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
