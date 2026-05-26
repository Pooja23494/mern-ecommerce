import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        navigate("/verify");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-100 via-pink-50 to-white px-4 py-8">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl">
        <CardHeader className="space-y-2 text-center pb-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-pink-700">
            Create Account
          </CardTitle>

          <CardDescription className="text-sm sm:text-base text-gray-600">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>

                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="John"
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>

                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Doe"
                  className="h-11 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="m@example.com"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="h-11 rounded-xl pr-12"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-all duration-300 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Signup"
              )}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-pink-700 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
