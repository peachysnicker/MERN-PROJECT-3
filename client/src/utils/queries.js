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
  query category {
    categories {
      _id
      name
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
    }
  }
`;
