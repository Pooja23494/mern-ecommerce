import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/productSlice";

const ProductCard = ({ product, loading }) => {
  const { productImg, productPrice, productName } = product;

  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
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
        toast.success("Product added to Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shadow-lg rounded-xl overflow-hidden bg-white h-full flex flex-col transition-all duration-300 hover:shadow-2xl">
      {/* image */}
      <div className="w-full aspect-square overflow-hidden bg-gray-100">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            onClick={() => navigate(`/products/${product._id}`)}
            src={productImg[0]?.url}
            alt={productName}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      {/* content */}
      {loading ? (
        <div className="p-3 space-y-3">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
      ) : (
        <div className="p-3 flex flex-col flex-1">
          <h1 className="font-semibold text-sm sm:text-base line-clamp-2">
            {productName}
          </h1>

          <h2 className="font-bold text-lg mt-2 text-pink-600">
            ₹{productPrice}
          </h2>

          <Button
            onClick={() => addToCart(product._id)}
            className="bg-pink-600 mt-4 w-full cursor-pointer hover:bg-pink-800 flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
