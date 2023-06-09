import React from "react";
import { Link } from "react-router-dom";
import { GET_ME } from "../utils/queries";
import { UPDATE_CART } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";

const ProductList = ({ products, title, image }) => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [updateCart] = useMutation(UPDATE_CART);

  async function addToCart(product) {
    console.log(product);

    console.log(userData);

    const products = userData.cart.products.map((p) => {
      return {
        productId: p.productId._id,
        title: p.title,
        quantity: p.quantity,
      };
    });

    products.push({
      productId: product._id,
      quantity: 1,
    });

    console.log(products);

    const response = await updateCart({
      variables: {
        cartData: {
          products: products,
        },
      },
    });
  }

  if (loading) {
    return <h2>STILL LOADING, PLEASE WAIT</h2>;
  }

  return (
    <div className="row d-inline-flex  justify-content-space-around my-4">
      {products &&
        products.map((products) => (
          <div key={products._id} className="col-3 p-2">
            <div className="card mb-3">
              <h5 className="card-title p-2 m-0">
                {products.title} <br />
                <img
                  className="col-10 p-4"
                  src={`/images/${products.image}`}
                  alt={products.title}
                />
              </h5>
              {Auth.loggedIn() ? (
                <button className="addCart" onClick={() => addToCart(products)}>
                  Add to Cart
                </button>
              ) : (
                <div>
                  <Link className="plsLogin" to="/login">
                    Login to add items to cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
