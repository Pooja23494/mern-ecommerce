import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* info */}
        <div>
          <Link to="/">
            <img src="/Ekart.png" alt="logo" className="w-32" />
          </Link>

          <p className="mt-3 text-sm leading-6">
            Powering Your World with the Best in Electronics.
          </p>

          <p className="mt-2 text-sm">
            123 Electronics St, Style City, NY 10001
          </p>

          <p className="text-sm mt-1">Email: support@Zaptro.com</p>

          <p className="text-sm mt-1">Phone: (123) 456-7890</p>
        </div>

        {/* customer service */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold">Customer Service</h3>

          <ul className="mt-3 text-sm space-y-2">
            <li className="hover:text-pink-500 cursor-pointer">Contact Us</li>

            <li className="hover:text-pink-500 cursor-pointer">
              Shipping & Returns
            </li>

            <li className="hover:text-pink-500 cursor-pointer">FAQs</li>

            <li className="hover:text-pink-500 cursor-pointer">
              Order Tracking
            </li>

            <li className="hover:text-pink-500 cursor-pointer">Size Guide</li>
          </ul>
        </div>

        {/* social media */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold">Follow Us</h3>

          <div className="flex gap-4 mt-4 text-2xl">
            <FaFacebook className="hover:text-pink-500 cursor-pointer transition" />

            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />

            <FaPinterest className="hover:text-pink-500 cursor-pointer transition" />

            <FaTwitterSquare className="hover:text-pink-500 cursor-pointer transition" />
          </div>
        </div>

        {/* newsletter */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold">Stay in the loop</h3>

          <p className="mt-3 text-sm leading-6">
            Subscribe to get special offers, free giveaways, and more.
          </p>

          <form className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-3 rounded-md sm:rounded-l-md sm:rounded-r-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              type="submit"
              className="bg-pink-600 text-white px-5 py-3 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-red-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* bottom section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm px-4">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-pink-500 font-semibold">Ekart</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
