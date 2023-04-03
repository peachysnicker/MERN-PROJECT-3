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

  type CartProduct {
    productId: Product
    quantity: Int!
    name: String!
    image: String
  }

  type Cart {
    _id: ID!
    products: [CartProduct!]!
    createdAt: String!
    updatedAt: String!
  }

  input CartProductInput {
    productId: ID!
    quantity: Int!
  }

  input UpdateCartProductInput {
    productId: ID!
    quantity: Int!
  }

  input UpdateCartInput {
    products: [UpdateCartProductInput!]!
  }

  input ProductInput {
  title: String
  description: String
  image: String
  price: Float
  quantity: Int
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
    cart: Cart
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
    productList: [Product!]!
    productsByCategory(category: String!): [Product!]!
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
    updateProduct(_id: ID!, product: ProductInput!): Product
    addPaymentInfo(payment: PaymentInput!): User!
    addAddress(address: AddressInput!): User!
    deleteProduct(_id: ID!): Product 
    addProduct(product: ProductInput!): Product!
    updateCart(cartData: UpdateCartInput!): Cart
    removeProductFromCart(cartId: ID!, productId: ID!): Cart!
    clearCart(id: ID!): Cart!
  }
`;

module.exports = typeDefs;
