import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Package,
  ShoppingCart,
  IndianRupee,
  User,
  CalendarDays,
  Loader2,
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/order/all`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("❌ Failed to fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-pink-600" />

        <p className="mt-4 text-gray-600 font-medium">Loading all orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Admin Orders
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage and monitor all customer orders
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl shadow-md">
          <Package className="w-16 h-16 text-gray-400" />

          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            No Orders Found
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Orders will appear here once customers purchase products.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto bg-white rounded-3xl shadow-md">
            <table className="w-full text-left">
              <thead className="bg-pink-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Order ID
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Products
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Order ID */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      #{order._id.slice(-6)}
                    </td>

                    {/* User */}
                    <td className="px-6 py-4">
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {order.user?.firstName} {order.user?.lastName}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {order.user?.email}
                        </p>
                      </div>
                    </td>

                    {/* Products */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.products.map((p, idx) => (
                          <div key={idx} className="text-sm text-gray-700">
                            {p.productName} × {p.quantity}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-medium">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-5 lg:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-md p-5"
              >
                {/* Top */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h2 className="font-bold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* User */}
                <div className="mt-5 flex items-start gap-3">
                  <User className="w-5 h-5 text-pink-600 mt-0.5" />

                  <div>
                    <h3 className="font-medium text-gray-800">
                      {order.user?.firstName} {order.user?.lastName}
                    </h3>

                    <p className="text-sm text-gray-500">{order.user?.email}</p>
                  </div>
                </div>

                {/* Products */}
                <div className="mt-5 flex gap-3">
                  <ShoppingCart className="w-5 h-5 text-pink-600 mt-1" />

                  <div className="space-y-1">
                    {order.products.map((p, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        {p.productName} × {p.quantity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2 text-pink-600 font-bold">
                    <IndianRupee className="w-4 h-4" />₹
                    {order.amount.toLocaleString("en-IN")}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays className="w-4 h-4" />

                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
