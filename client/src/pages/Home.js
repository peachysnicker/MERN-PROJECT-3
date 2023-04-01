import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
// custom hook from apollo/client library - allows us to use the queries
import { useQuery } from "@apollo/client";
// bring in the object query_profiles bc we want to use it inside the hook
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  // loading is the status : true or false, data is the result from that query
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  //Prop - Checking when the data comes back set it to profiles data?. - means if data is there then get the profiles object or give an empty array
  const products = data?.productList || [];
  const [currentCategory, setCurrentCategory] = useState("");
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
      <CategoryMenu setCurrentCategory={setCurrentCategory} />
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
        <ProductList
          products={filteredProducts}
          title="Products available!"
          currentCategory={currentCategory}
        />
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
