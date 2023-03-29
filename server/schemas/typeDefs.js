const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Payment {
    card_number: String
    expiration_date: String
    cvv: String
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    title: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }
  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    payment: Payment
    orders: [Order]
  }

  input PaymentInput {
    card_number: String!
    expiration_date: String!
    cvv: String!
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    # for adding payment info to User profile
    addPaymentInfo(payment: PaymentInput!): User!
  }
`;

module.exports = typeDefs;
