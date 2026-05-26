import OrderCard from "@/components/OrderCard";

import axios from "axios";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Loader2, PackageSearch } from "lucide-react";

const ShowUserOrders = () => {
  const params = useParams();

  const [userOrder, setUserOrder] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch User Orders
  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/order/user-order/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUserOrder(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-pink-600" />

        <p className="mt-4 text-gray-600 font-medium">Loading user orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          User Orders
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          View all orders placed by this user
        </p>
      </div>

      {/* Empty State */}
      {userOrder.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-md py-20 text-center">
          <PackageSearch className="w-16 h-16 text-gray-400" />

          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            No Orders Found
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            This user has not placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <OrderCard userOrder={userOrder} />
        </div>
      )}
    </div>
  );
};

export default ShowUserOrders;
