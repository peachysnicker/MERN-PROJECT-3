const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    // Returns the user associated with the current context if they are logged in or throws an AuthenticationError if not
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //return a user object by username
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    //finds and returns the user withcurrent context and their orders sorted by purchase date or error if user is not logged in
    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate({
    //       path: 'orders.products',
    //       populate: 'category'
    //     });

    //     user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

    //     return user;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },

    // Async function "categories" that queries for a list of Category docs and returns the result
    categories: async () => {
      return await Category.find();
    },

    // Async function "product" that queries for a Product doc with  _id and returns it, along with its related Category object (if exists)
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    // Async function "products" that queries for Product docs based on optional category and title parameters, constructs a filter object based on those params, populates the related Category object for each Product, and returns the resulting list of Product docs
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    // Returns an order associated with the logged-in user, after fetching the user and populating the products and categories associated with that order
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    // Checkout - payment currency changed to CAD
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "cad",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    // create new user based on args, signs a token using a helper function signToken() & returns token and user object as an object
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
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
      return { token, user };
    },

    // adds order object containing an array of product object to a user orders array and error if no user is logged in
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },

    //updates a user's information with the provided arguments and returns the updated user object or throw error if not logged in
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    //product's quantity by decr  by the absolute value of the provided quantity & returns the updated product object
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    // Adds payment information to user account and returns the updated user object or error if not logged in
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
    addAddress: async (_, { address }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to add address info."
        );
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { address },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
