import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Camera } from "lucide-react";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import axios from "axios";

import userLogo from "/user.png";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { toast } from "sonner";

import { setUser } from "@/redux/userSlice";

const UserInfo = () => {
  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const params = useParams();

  const userId = params.id;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState(null);

  const [file, setFile] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  // Submit Form
  const submitHandle = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Get User Details
  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/get-user/${userId}`,
      );

      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // Loading State
  if (!updateUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-pink-600" />

        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft />
        </Button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Update Profile
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage user information and profile details
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side - Profile */}
          <div className="flex flex-col items-center lg:w-1/3">
            <div className="relative">
              <img
                src={updateUser?.profilePic || userLogo}
                alt="profile"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-pink-500 shadow-md"
              />

              <label
                className="absolute bottom-2 right-2 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full cursor-pointer shadow-lg 
              transition"
              >
                <Camera className="w-5 h-5" />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-800 text-center">
              {updateUser?.firstName} {updateUser?.lastName}
            </h2>

            <p className="text-gray-500 text-sm mt-1 text-center break-all">
              {updateUser?.email}
            </p>
          </div>

          {/* Right Side - Form */}
          <form onSubmit={submitHandle} className="flex-1 space-y-5">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>First Name</Label>

                <Input
                  type="text"
                  name="firstName"
                  value={updateUser?.firstName || ""}
                  onChange={handleChange}
                  placeholder="John"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Last Name</Label>

                <Input
                  type="text"
                  name="lastName"
                  value={updateUser?.lastName || ""}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                name="email"
                value={updateUser?.email || ""}
                disabled
                className="h-11 rounded-xl bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number</Label>

              <Input
                type="text"
                name="phoneNo"
                value={updateUser?.phoneNo || ""}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="h-11 rounded-xl"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label>Address</Label>

              <Input
                type="text"
                name="address"
                value={updateUser?.address || ""}
                onChange={handleChange}
                placeholder="Enter address"
                className="h-11 rounded-xl"
              />
            </div>

            {/* City + Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>City</Label>

                <Input
                  type="text"
                  name="city"
                  value={updateUser?.city || ""}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Zip Code</Label>

                <Input
                  type="text"
                  name="zipCode"
                  value={updateUser?.zipCode || ""}
                  onChange={handleChange}
                  placeholder="Enter zip code"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-3">
              <Label>Role</Label>

              <RadioGroup
                value={updateUser?.role}
                onValueChange={(value) =>
                  setUpdateUser({
                    ...updateUser,
                    role: value,
                  })
                }
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />

                  <Label htmlFor="user">User</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />

                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-base font-semibold mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Please wait...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
