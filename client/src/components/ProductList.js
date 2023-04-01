import React from "react";
import { GET_ME } from "../utils/queries";
import { UPDATE_CART } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

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
    <div className="flex-row justify-space-between my-4">
      {products &&
        products.map((products) => (
          <div key={products._id} className="col-3 col-3">
            <div className="card mb-3">
              <h5 className="card-header p-2 m-0">
                {products.title} <br />
                <img
                  className="col-3 justify-content-center"
                  src={`/images/${products.image}`}
                  alt={products.title}
                />
              </h5>
              <button className=" " onClick={() => addToCart(products)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
