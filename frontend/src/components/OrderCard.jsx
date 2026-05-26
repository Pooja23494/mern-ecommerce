import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* header */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => navigate(-1)} className="cursor-pointer">
            <ArrowLeft />
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
        </div>

        {/* no orders */}
        {userOrder?.length === 0 ? (
          <p className="text-gray-800 text-lg sm:text-2xl">
            No Orders found for this user
          </p>
        ) : (
          <div className="space-y-6 w-full">
            {userOrder?.map((order) => (
              <div
                key={order._id}
                className="shadow-lg rounded-2xl p-4 sm:p-5 border border-gray-200 bg-white"
              >
                {/* order header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold break-all">
                      Order ID:
                    </h2>

                    <p className="text-gray-600 text-sm break-all">
                      {order._id}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    Amount:{" "}
                    <span className="font-bold text-black">
                      {order.currency} {order.amount.toFixed()}
                    </span>
                  </p>
                </div>

                {/* user info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">User:</span>{" "}
                      {order.user?.firstName || "Unknown"}{" "}
                      {order.user?.lastName}
                    </p>

                    <p className="text-sm text-gray-500 break-all">
                      Email: {order.user?.email || "N/A"}
                    </p>
                  </div>

                  <span
                    className={`w-max text-white px-3 py-1 rounded-lg text-sm ${
                      order.status === "Paid"
                        ? "bg-green-500"
                        : order.status === "Failed"
                          ? "bg-red-500"
                          : "bg-orange-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* products */}
                <div>
                  <h3 className="font-medium mb-3 text-lg">Products:</h3>

                  <ul className="space-y-3">
                    {order.products.map((product, index) => (
                      <li
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 sm:items-center bg-gray-50 p-3 rounded-xl"
                      >
                        {/* image */}
                        <img
                          onClick={() =>
                            navigate(`/products/${product.productId?._id}`)
                          }
                          src={product.productId?.productImg?.[0]?.url}
                          alt="product"
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                        />

                        {/* product details */}
                        <div className="flex-1 space-y-1">
                          <p className="font-medium line-clamp-2 text-sm sm:text-base">
                            {product.productId?.productName}
                          </p>

                          <p className="text-xs sm:text-sm text-gray-500 break-all">
                            {product?.productId?._id}
                          </p>

                          <p className="font-semibold text-pink-600">
                            ₹{product.productId?.productPrice} x{" "}
                            {product.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
