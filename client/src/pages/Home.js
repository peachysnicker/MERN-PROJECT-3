import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.productList || [];
  const [currentCategory, setCurrentCategory] = useState(null);

  const filteredProducts = currentCategory
    ? products.filter((product) => product.category._id === currentCategory)
    : products;

  return (

    <div className="">
      <img
        id="landing"
        src="homepage.png"
        width="100%"
        className=""
        alt="woman hiking"
      />
      <div id="categoryMenu" className="p-4 col-12 d-flex justify-content-end">
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
      <div>
        <img
          id="productBanner"
          src="product-banner.png"
          width="100%"
          alt="product banner"
        />
      </div>
      <div
        id="categoryMenu"
        className="p-4 col-12 d-flex justify-content-end"
      ></div>
      {/* coniditonal rendering while loading is true then show div ..loading.. */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        // or if not loading - render the profile list
        <ProductList products={products} title="Products available!" />
      )}
      <div>
        <img
          id="biking"
          src="wheels-banner.png"
          width="100%"
          className=""
          alt="mountain biking"
        />
      </div>
    </div>
  );
};

export default Home;