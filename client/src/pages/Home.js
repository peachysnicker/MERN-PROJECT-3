import React from "react";
import ProductList from "../components/ProductList";
// custom hook from apollo/client library - allows us to use the queries
import { useQuery } from "@apollo/client";
// bring in the object query_profiles bc we want to use it inside the hook
import { QUERY_ALL_PRODUCTS } from "../utils/queries";

const Home = () => {
  // loading is the status : true or false, data is the result from that query
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  //Prop - Checking when the data comes back set it to profiles data?. - means if data is there then get the profiles object or give an empty array
  const products = data?.products || [];

  return (
    <div>
      <div className="home-container">Home</div>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {/* coniditonal rendering while loading is true then show div ..loading.. */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            // or if not loading - render the profile list
            <ProductList products={products} title="Products available!" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
