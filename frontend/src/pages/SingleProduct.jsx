import Breadcrums from "@/components/Breadcrums";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const params = useParams();

  const productId = params.id;

  const { products } = useSelector((store) => store.product);

  const product = products.find((item) => item._id === productId);

  // prevent crash before product loads
  if (!product) {
    return (
      <div className="pt-24 text-center text-lg font-semibold">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
      {/* breadcrumbs */}
      <Breadcrums product={product} />

      {/* product section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* product images */}
        <div className="w-full">
          <ProductImg images={product.productImg} />
        </div>

        {/* product description */}
        <div className="w-full">
          <ProductDesc product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
