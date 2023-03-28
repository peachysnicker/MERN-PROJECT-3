const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    # There is now a field to store the user's password
    email: String
    password: String
  }

  # Set up an Auth type to handle returning data from a profile created or user login
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    # Set up mutations to handle creating a profile or logging into a profile and return Auth type
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
