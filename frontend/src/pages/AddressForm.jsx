import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  addAddress,
  deleteAddresses,
  setCart,
  setSelectedAddress,
} from "@/redux/productSlice.js";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product,
  );

  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const values = Object.values(formData);

    if (values.some((value) => value.trim() === "")) {
      return toast.error("Please fill all fields");
    }

    dispatch(addAddress(formData));

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });

    setShowForm(false);

    toast.success("Address Saved Successfully");
  };

  // Order Calculations
  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    if (selectedAddress === null) {
      return toast.error("Please select an address");
    }

    const accessToken = localStorage.getItem("accessToken");

    try {
      // Create Order
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/order/create-order`,
        {
          products: cart?.items?.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!data.success) {
        return toast.error("Something went wrong");
      }

      // Razorpay SDK Check
      if (!window.Razorpay) {
        return toast.error("Razorpay SDK failed to load");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,

        name: "Ekart",
        description: "Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );

            if (verifyRes.data.success) {
              toast.success("✅ Payment Successful");

              dispatch(
                setCart({
                  items: [],
                  totalPrice: 0,
                }),
              );

              navigate("/order-success");
            } else {
              toast.error("❌ Payment verification failed");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error verifying payment");
          }
        },

        modal: {
          ondismiss: async function () {
            try {
              await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
                {
                  razorpay_order_id: data.order.id,
                  paymentFailed: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                },
              );

              toast.error("Payment Cancelled");
            } catch (error) {
              console.log(error);
            }
          },
        },

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#F472B6",
        },
      };

      const rzp = new window.Razorpay(options);

      // Payment Failed Event
      rzp.on("payment.failed", async function () {
        try {
          await axios.post(
            `${import.meta.env.VITE_URL}/api/v1/order/verify-payment`,
            {
              razorpay_order_id: data.order.id,
              paymentFailed: true,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          toast.error("Payment Failed. Please try again");
        } catch (error) {
          console.log(error);
        }
      });

      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while processing payment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-20 mt-10">
        {/* Left Side */}
        <div className="space-y-4 p-6 bg-white rounded-xl shadow-sm border">
          {showForm ? (
            <>
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>

                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>

                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>

                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address</Label>

                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Street, Area"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>

                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Navsari"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State</Label>

                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Gujarat"
                  />
                </div>
              </div>

              {/* Zip & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">Zip Code</Label>

                  <Input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="396445"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>

                  <Input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="India"
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save & Continue
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Saved Addresses</h2>

              {addresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setSelectedAddress(index))}
                  className={`border p-4 rounded-md cursor-pointer relative transition-all
                  ${
                    selectedAddress === index
                      ? "border-pink-600 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <p className="font-medium">{address.fullName}</p>

                  <p>{address.phone}</p>

                  <p>{address.email}</p>

                  <p>
                    {address.address}, {address.city}, {address.state},{" "}
                    {address.zip}, {address.country}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      dispatch(deleteAddresses(index));

                      if (selectedAddress === index) {
                        dispatch(setSelectedAddress(null));
                      }
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowForm(true)}
              >
                + Add New Address
              </Button>

              <Button
                onClick={handlePayment}
                disabled={selectedAddress === null}
                className="w-full bg-pink-600 hover:bg-pink-700"
              >
                Proceed To Checkout
              </Button>
            </div>
          )}
        </div>

        {/* Right Side - Order Summary */}
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart?.items?.length || 0}) items</span>

                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>

                <span>₹{tax}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>

                <span>₹{total}</span>
              </div>

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
  );
};

export default AddressForm;
