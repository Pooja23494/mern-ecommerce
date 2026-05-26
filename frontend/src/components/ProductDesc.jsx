import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();

  const addTocart = async (productId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* product name */}
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 leading-tight">
        {product.productName}
      </h1>

      {/* category & brand */}
      <p className="text-gray-600 text-sm sm:text-base">
        {product.category} | {product.brand}
      </p>

      {/* price */}
      <h2 className="text-pink-500 font-bold text-2xl sm:text-3xl">
        ₹{product.productPrice}
      </h2>

      {/* description */}
      <p className="text-muted-foreground text-sm sm:text-base leading-7">
        {product.productDesc}
      </p>

      {/* quantity */}
      <div className="flex flex-wrap gap-3 items-center">
        <p className="text-gray-800 font-semibold">Quantity:</p>

        <Input type="number" className="w-20" defaultValue={1} min={1} />
      </div>

      {/* button */}
      <Button
        onClick={() => addTocart(product._id)}
        className="bg-pink-600 w-full sm:w-max cursor-pointer hover:bg-pink-700"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
