import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { REMOVE_FROM_CART } from '../utils/mutations';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const username = Auth.getProfile().data.username;
  const { loading, data } = useQuery(GET_USER_CART, {
    variables: { username }
  });

  const [removeProductFromCart] = useMutation(REMOVE_FROM_CART);

  const handleRemoveProduct = (cartId, productId) => {
    removeProductFromCart({
      variables: {
        cartId: cartId,
        productId: productId,
      },
      refetchQueries: [{ query: GET_USER_CART, variables: { username } }]
    });
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  const cartProducts = data.user.cart.products.reduce((accumulator, currentProduct) => {
    const existingProductIndex = accumulator.findIndex(product => product.productId._id === currentProduct.productId._id);
    if (existingProductIndex >= 0) {
      accumulator[existingProductIndex].quantity += 1;
    } else {
      accumulator.push({ ...currentProduct, quantity: 1 });
    }
    return accumulator;
  }, []);

  let totalPrice = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    totalPrice = totalPrice + (cartProducts[i].quantity * cartProducts[i].productId.price);
  }
  totalPrice = totalPrice.toFixed(2);
  return (
    <div className='cart-container'>
      <button onClick={() => window.location.reload()}> <FontAwesomeIcon icon={faArrowsRotate} /></button>
      <h4>Total number of items in cart: {data.user.cart.products.length}</h4>
      <h5 style={{ display: 'none' }}>Cart ID: <span id="cartId">{data.user.cart._id}</span></h5>
      <div>{cartProducts.map((p, index) => {
        return (
          <div className='cart-item' key={index}>
            {/* <div>Product ID: {p.productId._id}</div> */}
            <div>Product: {p.productId.title} </div>
           
            <img
                  src={`/images/${p.productId.image}`}
                  alt={p.productId.title}
                />
             <div>Price: ${p.productId.price} each</div>
            <div>Quantity: {p.quantity}</div>
            <button onClick={() => {
              const cartId = document.getElementById('cartId').innerText;
              handleRemoveProduct(cartId, p.productId._id);
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