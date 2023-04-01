import React from 'react';
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_USER_CART} from "../utils/queries";

function Checkout() {
  const username = Auth.getProfile().data.username;
  console.log(username);
  
  const {loadingCart, cartData} = useQuery(GET_USER_CART, {
    variables: {username}
  });
  console.log(cartData);

  const { loadingQuery, data } = useQuery(GET_ME);

  const placeOrder = () => {
    document.getElementById('checkout-container').innerHTML = `
    <h2>Thank you for shopping at SIC, your order is on the way...</h2>`;
    setTimeout(() => {
      document.location.assign('/');
    }, 3000);
  }


  if (loadingQuery || loadingCart) {
    return <div>Loading...</div>
  }

  return (
    <div className='checkout-container' id='checkout-container'>
      {Auth.loggedIn() ? (
        <div>
          <h3>Checkout</h3>
          <div>User: {data ? data.me.username : ''}</div>
          <div>Address: {data ? `${data.me.address.street}, ${data.me.address.city}, ${data.me.address.province}, ${data.me.address.postal_code}`:''}</div>
          <div>Phone: {data ? data.me.address.phone:''}</div>
          <button onClick={placeOrder}>Place order</button>
        </div>
      ):(
        <h3>You need to <a href="/login">login</a></h3>
      )}
    </div>
  )
}

export default Checkout;