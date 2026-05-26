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

import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setFormData({});

        navigate("/");

        dispatch(setUser(res.data.user));

        localStorage.setItem("accessToken", res.data.accessToken);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Enter your details below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                type="email"
                placeholder="m@example.com"
                required
                className="h-11"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="h-11 pr-12"
                />

                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="w-5 h-5 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="w-5 h-5 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 cursor-pointer bg-pink-600 hover:bg-pink-700"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-gray-700 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="hover:underline text-pink-700 font-medium"
            >
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
