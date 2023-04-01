import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { REMOVE_FROM_CART } from '../utils/mutations';
import Auth from '../utils/auth';

function Cart() {
  const username = Auth.getProfile().data.username;
  const {loading, data} = useQuery(GET_USER_CART, {
    variables: {username}
  });
  console.log(data);
  const [removeProductFromCart] = useMutation(REMOVE_FROM_CART);
  function handleRemoveProduct(cartId, productId) {
    removeProductFromCart({
      variables: {
        cartId: cartId,
        productId: productId,
      },
    });
  }

  if (loading) {
    return <h2>Loading...</h2>
  }
  let totalPrice = 0;
  for (let i = 0; i < data.user.cart.products.length; i++) {
    totalPrice = totalPrice + data.user.cart.products[i].productId.price;
  }


  return (
    <div className='cart-container'>
      <h4>Total number of items in cart: {data.user.cart.products.length}</h4>
      <h5 style={{display: 'none'}}>Cart ID: <span id="cartId">{data.user.cart._id}</span></h5>
      <div>{data.user.cart.products.map(p => {
        return (
          <div className='cart-item'>
            <div>Product ID: {p.productId._id}</div>
            <div>Product: ${p.productId.title}</div>
            <div>Price: ${p.productId.price}</div>
            <button onClick={() => {
              const cartId = document.getElementById('cartId').innerText;
              console.log(cartId);
              handleRemoveProduct(cartId, p.productId._id);
              document.location.reload();
            }}>Remove</button>
          </div>
        )
      })}</div>
      <div>Total price: ${totalPrice}</div>
      <button onClick={(() => {
        if (data.user.cart.products.length === 0) {
          alert('Nothing in cart');
        } else {
          document.location.assign('/checkout')
        }
      })}>Checkout</button>
    </div>
  )
}

export default Cart;