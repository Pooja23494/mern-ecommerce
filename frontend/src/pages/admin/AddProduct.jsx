import ImageUpload from "@/components/ImageUpload";
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
import { Textarea } from "@/components/ui/textarea";

import { setProducts } from "@/redux/productSlice";

import axios from "axios";

import { Loader2, Package, BadgeIndianRupee, Layers3, Tag } from "lucide-react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const { products } = useSelector((store) => store.product);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productData.productImg.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();

    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDesc", productData.productDesc);
    formData.append("category", productData.category);
    formData.append("brand", productData.brand);

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        dispatch(setProducts([...products, res.data.product]));

        // Reset Form
        setProductData({
          productName: "",
          productPrice: "",
          productDesc: "",
          productImg: [],
          brand: "",
          category: "",
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add New Product
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Fill in the product details below
        </p>
      </div>

      {/* Card */}
      <Card className="w-full max-w-4xl mx-auto rounded-3xl shadow-xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-pink-700">
            Product Details
          </CardTitle>

          <CardDescription>Enter product information carefully</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label>Product Name</Label>

              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="text"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  placeholder="Ex - iPhone 15 Pro"
                  className="pl-10 h-11 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label>Price</Label>

              <div className="relative">
                <BadgeIndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="number"
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  className="pl-10 h-11 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Brand + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Brand */}
              <div className="space-y-2">
                <Label>Brand</Label>

                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <Input
                    type="text"
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    placeholder="Ex - Apple"
                    className="pl-10 h-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>

                <div className="relative">
                  <Layers3 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <Input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    placeholder="Ex - Mobile"
                    className="pl-10 h-11 rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>

              <Textarea
                name="productDesc"
                value={productData.productDesc}
                onChange={handleChange}
                placeholder="Enter brief description of the product..."
                className="min-h-30 rounded-xl resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Upload Product Images</Label>

              <ImageUpload
                productData={productData}
                setProductData={setProductData}
              />
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="pt-2">
            <Button
              disabled={loading}
              type="submit"
              className="w-full h-11 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-all duration-300 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Please wait...
                </span>
              ) : (
                "Add Product"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
