import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      password
      username
    }
  }
}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      _id
      email
      password
      username
    }
    token
  }
}
`;

export const ADD_PAYMENT_INFO = gql`
  mutation AddPaymentInfo($payment: PaymentInput!) {
    addPaymentInfo(payment: $payment) {
      _id
      username
      email
      payment {
        card_number
        expiration_date
        cvv
      }
    }
  }
`;