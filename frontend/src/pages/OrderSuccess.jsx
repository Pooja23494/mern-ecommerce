import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 via-white to-pink-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center border border-pink-100">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-5 rounded-full animate-bounce">
            <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-green-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-6">
          Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
          Thank you for your purchase! Your order has been placed successfully
          and will be delivered soon.
        </p>

        {/* Order Info */}
        <div className="mt-6 bg-pink-50 border border-pink-100 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center gap-3">
            <Package className="text-pink-600 w-5 h-5" />
            <p className="text-sm text-gray-700">
              Order status updated successfully
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ShoppingBag className="text-pink-600 w-5 h-5" />
            <p className="text-sm text-gray-700">
              You can track your order anytime
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-medium hover:bg-pink-700 active:scale-95 transition-all duration-300"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="w-full border border-pink-600 text-pink-600 py-3 rounded-xl font-medium hover:bg-pink-50 active:scale-95 transition-all 
            duration-300"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
