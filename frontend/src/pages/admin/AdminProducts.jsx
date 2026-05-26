import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2, Package, IndianRupee } from "lucide-react";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ImageUpload from "@/components/ImageUpload";

import axios from "axios";
import { toast } from "sonner";

import { setProducts } from "@/redux/productSlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProducts = () => {
  const { products } = useSelector((store) => store.product);

  const [editProduct, setEditProduct] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  // Filter Products
  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort Products
  if (sortOrder === "lowtohigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  }

  if (sortOrder === "hightolow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  // Handle Edit Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save
  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("brand", editProduct.brand);
    formData.append("category", editProduct.category);

    // Existing Images
    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    // New Images
    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => formData.append("files", file));

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product updated successfully");

        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );

        dispatch(setProducts(updateProducts));

        setOpen(false);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  // Handle Delete
  const handleDelete = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (product) => product._id !== productId,
      );

      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/v1/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Manage Products
        </h1>

        <p className="text-gray-500 mt-1 text-sm">
          Search, edit, and manage all products
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="bg-white pr-10 h-11 rounded-xl shadow-sm"
          />

          <Search className="absolute right-3 top-3 text-gray-500 w-5 h-5" />
        </div>

        {/* Sort */}
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-full md:w-60 bg-white h-11 rounded-xl">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowtohigh">Price: Low to High</SelectItem>

              <SelectItem value="hightolow">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Products */}
      <div className="grid gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="p-4 rounded-2xl shadow-md border-0"
            >
              <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
                {/* Product Info */}
                <div className="flex gap-4 items-center">
                  <img
                    src={product.productImg[0]?.url}
                    alt={product.productName}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border"
                  />

                  <div className="space-y-1">
                    <h1 className="font-bold text-lg text-gray-800">
                      {product.productName}
                    </h1>

                    <p className="text-sm text-gray-500">
                      {product.brand} • {product.category}
                    </p>

                    <div className="flex items-center gap-1 text-pink-600 font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      {product.productPrice}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  {/* Edit */}
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() => {
                          setEditProduct(product);
                          setOpen(true);
                        }}
                      >
                        <Edit className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          Edit Product
                        </DialogTitle>

                        <DialogDescription>
                          Update product details below
                        </DialogDescription>
                      </DialogHeader>

                      {/* Form */}
                      <div className="space-y-5">
                        {/* Product Name */}
                        <div className="space-y-2">
                          <Label>Product Name</Label>

                          <Input
                            type="text"
                            name="productName"
                            value={editProduct?.productName || ""}
                            onChange={handleChange}
                            placeholder="Ex - iPhone"
                          />
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                          <Label>Price</Label>

                          <Input
                            type="number"
                            name="productPrice"
                            value={editProduct?.productPrice || ""}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Brand + Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Brand</Label>

                            <Input
                              type="text"
                              name="brand"
                              value={editProduct?.brand || ""}
                              onChange={handleChange}
                              placeholder="Ex - Apple"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Category</Label>

                            <Input
                              type="text"
                              name="category"
                              value={editProduct?.category || ""}
                              onChange={handleChange}
                              placeholder="Ex - Mobile"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <Label>Description</Label>

                          <Textarea
                            name="productDesc"
                            value={editProduct?.productDesc || ""}
                            onChange={handleChange}
                            placeholder="Enter product description..."
                            className="min-h-[120px]"
                          />
                        </div>

                        {/* Images */}
                        <div className="space-y-2">
                          <Label>Product Images</Label>

                          <ImageUpload
                            productData={editProduct}
                            setProductData={setEditProduct}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button
                          onClick={handleSave}
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full border-red-500 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product?</AlertDialogTitle>

                        <AlertDialogDescription>
                          This action cannot be undone. This product will be
                          permanently deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="w-16 h-16 text-gray-400" />

            <h2 className="text-xl font-semibold text-gray-700 mt-4">
              No Products Found
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Try searching with a different keyword
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
