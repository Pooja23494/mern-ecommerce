import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { Users, ShoppingBag, Package, IndianRupee } from "lucide-react";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    sales: [],
  });

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/order/sales`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Chart Data
  const chartData = {
    labels: (stats.sales || []).map((item) => item.date),

    datasets: [
      {
        label: "Sales",
        data: (stats.sales || []).map((item) => item.amount),

        borderColor: "#ec4899",
        backgroundColor: "rgba(236,72,153,0.15)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#ec4899",
        pointBorderColor: "#fff",
        pointRadius: 4,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Monitor sales, users, products, and orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Users */}
        <Card className="border-0 shadow-lg rounded-2xl bg-linear-to-r from-pink-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>

            <Users className="w-5 h-5" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
          </CardContent>
        </Card>

        {/* Products */}
        <Card className="border-0 shadow-lg rounded-2xl bg-linear-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>

            <ShoppingBag className="w-5 h-5" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">{stats.totalProducts}</h2>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="border-0 shadow-lg rounded-2xl bg-linear-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>

            <Package className="w-5 h-5" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">{stats.totalOrders}</h2>
          </CardContent>
        </Card>

        {/* Sales */}
        <Card className="border-0 shadow-lg rounded-2xl bg-linear-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>

            <IndianRupee className="w-5 h-5" />
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              ₹ {stats.totalSales?.toFixed(2)}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="mt-8 rounded-2xl shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Sales Overview (Last 30 Days)
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-75 sm:h-100">
            <Line data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSales;
