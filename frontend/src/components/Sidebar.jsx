import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
} from "lucide-react";

import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full md:w-72 md:h-screen bg-pink-50 border-t md:border-t-0 md:border-r border-pink-200">
      <div className="flex md:flex-col justify-around md:justify-start items-center md:items-start md:pt-24 md:px-5 py-3 md:space-y-3">
        {/* dashboard */}
        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 text-xs md:text-lg font-bold cursor-pointer p-2 md:px-4 md:py-3 rounded-xl w-auto 
          md:w-full transition ${
            isActive
              ? "bg-pink-600 text-white"
              : "text-gray-700 hover:bg-pink-100"
          }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="hidden sm:block">Dashboard</span>
        </NavLink>

        {/* add product */}
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 text-xs md:text-lg font-bold cursor-pointer p-2 md:px-4 md:py-3 rounded-xl w-auto 
          md:w-full transition ${
            isActive
              ? "bg-pink-600 text-white"
              : "text-gray-700 hover:bg-pink-100"
          }`
          }
        >
          <PackagePlus size={20} />
          <span className="hidden sm:block">Add Product</span>
        </NavLink>

        {/* products */}
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 text-xs md:text-lg font-bold cursor-pointer p-2 md:px-4 md:py-3 rounded-xl w-auto 
          md:w-full transition ${
            isActive
              ? "bg-pink-600 text-white"
              : "text-gray-700 hover:bg-pink-100"
          }`
          }
        >
          <PackageSearch size={20} />
          <span className="hidden sm:block">Products</span>
        </NavLink>

        {/* users */}
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 text-xs md:text-lg font-bold cursor-pointer p-2 md:px-4 md:py-3 rounded-xl w-auto 
          md:w-full transition ${
            isActive
              ? "bg-pink-600 text-white"
              : "text-gray-700 hover:bg-pink-100"
          }`
          }
        >
          <Users size={20} />
          <span className="hidden sm:block">Users</span>
        </NavLink>

        {/* orders */}
        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 text-xs md:text-lg font-bold cursor-pointer p-2 md:px-4 md:py-3 rounded-xl w-auto 
          md:w-full transition ${
            isActive
              ? "bg-pink-600 text-white"
              : "text-gray-700 hover:bg-pink-100"
          }`
          }
        >
          <FaRegEdit size={18} />
          <span className="hidden sm:block">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
