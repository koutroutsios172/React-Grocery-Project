import React from "react";
import Productitem from "./Productitem";

function AllProducts({ allProducts }) {
  return (
    <div className="mt-10">
      <h2 className="text-green-600 font-bold text-2xl">Our Popular Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {allProducts.map((product, index) =>
          index < 2 ? (
            <Productitem key={product.id || index} product={product} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default AllProducts;
