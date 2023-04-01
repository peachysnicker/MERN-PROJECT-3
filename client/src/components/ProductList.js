import React from "react";
import { GET_ME } from "../utils/queries";
import { UPDATE_CART } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const ProductList = ({ products, title, image, currentCategory = null }) => {
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

  // Filter products based on currentCategory
  const filteredProducts = currentCategory
    ? products.filter((product) => {
        return product.category._id === currentCategory;
      })
    : products;

  return (
    <div>
      <h3>{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {filteredProducts && filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {product.title} <br />
                  <img
                    src={`/images/${product.image}`}
                    alt={product.title}
                  />
                </h4>
                {Auth.loggedIn() ? (
                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                ) : (
                  <div>Login to add item to cart</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h4>No products found</h4>
        )}
      </div>
    </div>
  );
};

export default ProductList;