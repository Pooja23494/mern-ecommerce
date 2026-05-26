import { Input } from "@/components/ui/input";
import axios from "axios";

import { Edit, Eye, Search, Users, Mail } from "lucide-react";

import React, { useEffect, useState } from "react";

import userLogo from "/user.png";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch Users
  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/all-user`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter Users
  let filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          User Management
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          View and manage registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-md mb-8">
        <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />

        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="pl-10 h-11 rounded-xl bg-white shadow-sm"
        />
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-md py-20">
          <Users className="w-16 h-16 text-gray-400" />

          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            No Users Found
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Try searching with another keyword
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => {
            return (
              <div
                key={user._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100"
              >
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={user?.profilePic || userLogo}
                    alt={user?.firstName}
                    className="rounded-full w-16 h-16 object-cover border-2 border-pink-500"
                  />

                  <div className="flex-1 overflow-hidden">
                    <h1 className="font-bold text-lg text-gray-800 truncate">
                      {user?.firstName} {user?.lastName}
                    </h1>

                    <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                      <Mail className="w-4 h-4 shrink-0" />

                      <p className="truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  {/* Edit */}
                  <Button
                    onClick={() => navigate(`/dashboard/users/${user._id}`)}
                    variant="outline"
                    className="flex-1 rounded-xl border-pink-500 text-pink-600 hover:bg-pink-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>

                  {/* Orders */}
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/users/orders/${user._id}`)
                    }
                    className="flex-1 rounded-xl bg-pink-600 hover:bg-pink-700"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Orders
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
