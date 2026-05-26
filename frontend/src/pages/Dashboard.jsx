import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 w-full md:ml-75 px-4 sm:px-6 lg:px-8 pt-24 pb-10 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
