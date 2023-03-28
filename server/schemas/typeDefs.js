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
    # image: String
    # quantity: Int
    price: Float
    # category: Category
  }
  type Order {
    _id: ID
    purchaseDate: String
    # products: [Product]
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    payment: Payment
  }

  input PaymentInput {
    card_number: String!
    expiration_date: String!
    cvv: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    # for adding payment info to User profile
    addPaymentInfo(payment: PaymentInput!): User!
  }
`;

module.exports = typeDefs;
