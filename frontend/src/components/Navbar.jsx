import {
  ShoppingCart,
  Menu,
  X,
  Home,
  Package,
  User,
  LayoutDashboard,
  LogOut,
  LogIn,
} from "lucide-react";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Logout
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(null));
        setMenuOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-pink-100 shadow-sm">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <img
            src="/Ekart.png"
            alt="logo"
            className="w-24 sm:w-28 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7 text-[16px] font-semibold text-gray-700">
            <Link to={"/"} className="hover:text-pink-600 transition">
              <li>Home</li>
            </Link>

            <Link to={"/products"} className="hover:text-pink-600 transition">
              <li>Products</li>
            </Link>

            {user && (
              <Link
                to={`/profile/${user._id}`}
                className="hover:text-pink-600 transition"
              >
                <li>Hello, {user.firstName}</li>
              </Link>
            )}

            {admin && (
              <Link
                to={`/dashboard/sales`}
                className="hover:text-pink-600 transition"
              >
                <li>Dashboard</li>
              </Link>
            )}
          </ul>

          {/* Cart */}
          <Link
            to={"/cart"}
            className="relative hover:text-pink-600 transition"
          >
            <ShoppingCart className="w-6 h-6" />

            <span
              className="absolute -top-2 -right-3 bg-pink-600 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center 
            font-semibold"
            >
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* Auth Button */}
          {user ? (
            <Button
              onClick={handleLogout}
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl px-5"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-linear-to-r from-pink-500 to-purple-600 hover:opacity-90 rounded-xl px-5"
            >
              Login
            </Button>
          )}
        </nav>

        {/* Mobile Right */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />

            <span
              className="absolute -top-2 -right-3 bg-pink-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center 
            font-semibold"
            >
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-pink-100 transition"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-pink-600" />
            ) : (
              <Menu className="w-7 h-7 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-18 left-0 w-full bg-white shadow-xl border-t border-pink-100 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        <div className="px-5 py-6">
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg">
                {user.firstName?.charAt(0)}
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          {/* Mobile Links */}
          <ul className="flex flex-col mt-5 gap-2">
            <Link
              to={"/"}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 text-gray-700 font-medium transition"
            >
              <Home className="w-5 h-5 text-pink-600" />
              Home
            </Link>

            <Link
              to={"/products"}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 text-gray-700 font-medium transition"
            >
              <Package className="w-5 h-5 text-pink-600" />
              Products
            </Link>

            {user && (
              <Link
                to={`/profile/${user._id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 text-gray-700 font-medium transition"
              >
                <User className="w-5 h-5 text-pink-600" />
                My Profile
              </Link>
            )}

            {admin && (
              <Link
                to={`/dashboard/sales`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 text-gray-700 font-medium transition"
              >
                <LayoutDashboard className="w-5 h-5 text-pink-600" />
                Dashboard
              </Link>
            )}
          </ul>

          {/* Bottom Button */}
          <div className="mt-6">
            {user ? (
              <Button
                onClick={handleLogout}
                className="w-full h-12 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-base"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="w-full h-12 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 text-white text-base"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
