// object to define the typedevs/queries - need it to use any query
import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      email
      password
      payment {
        card_number
        cvv
        expiration_date
      }
      isAdmin
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
  query productList {
    products {
      _id
      title
      description
      image
      price
      quantity
      category {
        name
      }
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
