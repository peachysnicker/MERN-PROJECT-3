const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Payment {
    card_number: String
    expiration_date: String
    cvv: String
  }

  type Address {
    street: String
    city: String
    province: String
    postal_code: String
    phone: String
  }

  type Product {
    _id: ID
    title: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: String
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
    address: Address
    isAdmin: Boolean
  }

  input PaymentInput {
    card_number: String!
    expiration_date: String!
    cvv: String!
  }

  input AddressInput {
    street: String
    city: String
    province: String
    postal_code: String
    phone: String
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
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    productList: [Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addPaymentInfo(payment: PaymentInput!): User!
    addAddress(address: AddressInput!): User!
    deleteProduct(_id: ID!): Product 
  }
`;

module.exports = typeDefs;
