import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import Auth from '../utils/auth';

function Cart() {
  const username = Auth.getProfile().data.username;
  const {loading, data} = useQuery(GET_USER_CART, {
    variables: {username}
  });
  console.log(data);

  if (loading) {
    return <h2>Loading...</h2>
  }
  console.log("mitsu")
  let totalPrice = 0;
  for (let i = 0; i < data.user.cart.products.length; i++) {
    totalPrice = totalPrice + data.user.cart.products[i].productId.price;
  }

  return (
    <div>
      <h1>{data.user.cart.products.length}</h1>
      <div>{data.user.cart.products.map(p => {
        return (
          <>
            <div>Product ID: {p.productId._id}</div>
            <div>name: {p.productId.title}</div>
            <div>Price {p.productId.price * p.quantity}</div>
          </>
        )
      })}</div>
      <div>Total price: {totalPrice}</div>
      <button>Checkout</button>
    </div>
  )
}

export default Cart;