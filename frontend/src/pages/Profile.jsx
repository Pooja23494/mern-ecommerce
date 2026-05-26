import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import userLogo from "/user.png";

import { toast } from "sonner";
import axios from "axios";

import { setUser } from "@/redux/userSlice";
import { Loader2 } from "lucide-react";

import MyOrder from "./MyOrder";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const params = useParams();
  const userId = params.userId;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);

    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
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

  return (
    <div className="pt-24 min-h-screen bg-gray-100 px-4 pb-10">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto">
        {/* tabs */}
        <TabsList className="grid w-full max-w-xs grid-cols-2 mb-6 mx-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>

          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* profile tab */}
        <TabsContent value="profile">
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-8 text-2xl md:text-3xl text-gray-800 text-center">
              Update Profile
            </h1>

            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 justify-center items-start max-w-5xl">
              {/* profile image */}
              <div className="w-full lg:w-auto flex flex-col items-center">
                <img
                  src={updateUser.profilePic || userLogo}
                  alt="profile"
                  className="w-30 h-30 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-800"
                />

                <Label className="mt-4 cursor-pointer text-nowrap bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 text-sm sm:text-base">
                  Change Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>
              </div>

              {/* form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 shadow-lg p-5 sm:p-6 rounded-lg bg-white w-full"
              >
                {/* first & last name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium">
                      First Name
                    </Label>

                    <Input
                      type="text"
                      name="firstName"
                      value={updateUser.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Last Name
                    </Label>

                    <Input
                      type="text"
                      name="lastName"
                      value={updateUser.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                {/* email */}
                <div>
                  <Label className="block text-sm font-medium">Email</Label>

                  <Input
                    type="email"
                    name="email"
                    value={updateUser.email}
                    onChange={handleChange}
                    disabled
                    className="w-full mt-1 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* phone */}
                <div>
                  <Label className="block text-sm font-medium">
                    Phone Number
                  </Label>

                  <Input
                    type="text"
                    name="phoneNo"
                    value={updateUser.phoneNo}
                    onChange={handleChange}
                    placeholder="Enter your Contact No"
                    className="w-full mt-1"
                  />
                </div>

                {/* address */}
                <div>
                  <Label className="block text-sm font-medium">Address</Label>

                  <Input
                    type="text"
                    name="address"
                    value={updateUser.address}
                    onChange={handleChange}
                    placeholder="Enter your Address"
                    className="w-full mt-1"
                  />
                </div>

                {/* city & zip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium">City</Label>

                    <Input
                      type="text"
                      name="city"
                      value={updateUser.city}
                      onChange={handleChange}
                      placeholder="Enter your City"
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium">
                      Zip Code
                    </Label>

                    <Input
                      type="text"
                      name="zipCode"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                      placeholder="Enter your Zip Code"
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                {/* submit button */}
                <Button
                  type="submit"
                  className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Please wait
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        {/* orders tab */}
        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
