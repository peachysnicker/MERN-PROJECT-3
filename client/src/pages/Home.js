import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.productList || [];
  const [currentCategory, setCurrentCategory] = useState(null);

  const filteredProducts = currentCategory
    ? products.filter((product) => product.category._id === currentCategory)
    : products;

  return (
    <div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <CategoryMenu
            setCurrentCategory={setCurrentCategory}
          />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProductList
              products={filteredProducts}
              title="Products available!"
              currentCategory={currentCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;