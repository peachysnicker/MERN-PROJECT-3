// object to define the typedevs/queries - need it to use any query
import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      payment {
        card_number
        expiration_date
        cvv
      }
      address {
        street
        city
        province
        postal_code
        phone
      }
      isAdmin
      cart {
        _id
        products {
          productId {
            _id
            title
            description
            image
            quantity
            price
            category
          }
          quantity
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      isAdmin
      username
      email
      password
      payment {
        card_number
        cvv
        expiration_date
      }
      address {
        city
        phone
        postal_code
        province
        street
      }
    }
  }
`;
export const QUERY_ALL_PRODUCTS = gql`
  query queryAllProducts {
    productList {
      _id
      title
      description
      image
      quantity
      price
      category
    }
  }
`;
export const QUERY_CATEGORIES = gql`
  query GetProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
      _id
      title
      description
      image
      price
      quantity
      category
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query ProductList {
    productList {
      _id
      description
      image
      price
      quantity
      title
      category
    }
  }
`;

export const GET_USER_CART = gql`
  query getUserCart($username: String!) {
  user(username: $username) {
    cart {
      _id
      createdAt
      products {
        productId {
          _id
          category
          price
          title
        }
        quantity
      }
    }
    username
    email
  }
}
`;

export const GET_CART_ID = gql`
  query getCartId($username: String!) {
  user(username: $username) {
    cart {
      _id
    }
  }
}
`;
