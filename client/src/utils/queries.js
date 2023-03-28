import { gql } from '@apollo/client';

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
  }
}
`;

export const QUERY_USER = gql`
  query User($username: String!) {
  user(username: $username) {
    email
    password
    payment {
      card_number
      cvv
      expiration_date
    }
  }
}
`;

