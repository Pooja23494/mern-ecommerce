import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "/user.png";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { setCart } from "@/redux/productSlice.js";
import { toast } from "sonner";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subTotal = cart?.totalPrice || 0;
  const shipping = subTotal > 299 ? 0 : 10;
  const tax = subTotal * 0.05;
  const total = subTotal + shipping + tax;

  const API = `${import.meta.env.VITE_URL}/api/v1/cart`;

  const accessToken = localStorage.getItem("accessToken");

  const loadCart = async () => {
    try {
      const res = await axios.get(`${API}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (
    <div className="pt-24 pb-10 px-4 bg-gray-50 min-h-screen">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          {/* heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-7">
            Shopping Cart
          </h1>

          <div className="flex flex-col lg:flex-row gap-7">
            {/* cart items */}
            <div className="flex flex-col gap-5 flex-1">
              {cart?.items?.map((product, index) => {
                return (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between p-4">
                      {/* image & info */}
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={
                            product?.productId?.productImg?.[0]?.url || userLogo
                          }
                          alt="product"
                          className="w-24 h-24 object-cover rounded-lg border"
                        />

                        <div className="flex flex-col gap-2">
                          <h1 className="font-semibold text-sm sm:text-base line-clamp-2">
                            {product?.productId?.productName}
                          </h1>

                          <p className="text-pink-600 font-bold">
                            ₹{product?.productId?.productPrice}
                          </p>

                          {/* mobile remove */}
                          <button
                            onClick={() =>
                              handleRemove(product?.productId?._id)
                            }
                            className="flex sm:hidden text-red-500 items-center gap-1 text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* quantity */}
                      <div className="flex items-center gap-3 justify-between sm:justify-center">
                        <div className="flex gap-3 items-center">
                          <Button
                            onClick={() =>
                              handleUpdateQuantity(
                                product.productId._id,
                                "decrease",
                              )
                            }
                            variant="outline"
                            size="sm"
                          >
                            -
                          </Button>

                          <span className="font-medium">
                            {product.quantity}
                          </span>

                          <Button
                            onClick={() =>
                              handleUpdateQuantity(
                                product.productId._id,
                                "increase",
                              )
                            }
                            variant="outline"
                            size="sm"
                          >
                            +
                          </Button>
                        </div>

                        {/* subtotal */}
                        <p className="font-semibold text-sm sm:text-base">
                          ₹
                          {product?.productId?.productPrice * product?.quantity}
                        </p>
                      </div>

                      {/* desktop remove */}
                      <button
                        onClick={() => handleRemove(product?.productId?._id)}
                        className="hidden sm:flex text-red-500 items-center gap-1 cursor-pointer text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* summary */}
            <div className="w-full lg:w-100">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal ({cart?.items?.length} items)</span>

                    <span>₹{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  {/* promo */}
                  <div className="space-y-3 pt-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input placeholder="Promo Code" />

                      <Button variant="outline">Apply</Button>
                    </div>

                    {/* place order */}
                    <Button
                      onClick={() => navigate("/address")}
                      className="w-full bg-pink-600 cursor-pointer hover:bg-pink-700"
                    >
                      PLACE ORDER
                    </Button>

                    {/* continue shopping */}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent cursor-pointer"
                    >
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>

                  {/* notes */}
                  <div className="text-sm text-muted-foreground pt-4 space-y-1">
                    <p>* Free shipping on orders over ₹299</p>
                    <p>* 30-days return policy</p>
                    <p>* Secure checkout with SSL encryption</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
          {/* icon */}
          <div className="bg-pink-100 p-6 rounded-full">
            <ShoppingCart className="w-16 h-16 text-pink-600" />
          </div>

          {/* title */}
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Your Cart is Empty
          </h2>

          <p className="mt-2 text-gray-600 max-w-md">
            Looks like you haven't added anything to your cart yet
          </p>

          <Button
            onClick={() => navigate("/products")}
            className="mt-6 bg-pink-600 text-white py-3 px-6 hover:bg-pink-700 cursor-pointer"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
