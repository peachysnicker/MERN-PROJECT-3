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

export const ADD_ADDRESS = gql`
  mutation AddAddress($address: AddressInput!) {
    addAddress(address: $address) {
      _id
      username
      email
      address {
        street
        city
        province
        postal_code
        phone
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
  deleteProduct(_id: $id) {
    title
    _id
  }
}
`;

export const UPDATE_CART = gql`
mutation UpdateCart($cartData: UpdateCartInput!) {
  updateCart(cartData: $cartData) {
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
`