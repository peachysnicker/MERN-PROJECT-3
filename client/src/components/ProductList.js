import React from "react";

const productList = ({ products, title, image }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {products &&
          products.map((products) => (
            <div key={products._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {products.title} <br />
                  <img src={products.image} alt={products.title} />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default productList;
