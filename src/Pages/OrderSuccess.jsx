import React from "react";
import { useNavigate } from "react-router-dom";


const OrderSuccess = () => {
  const navigate = useNavigate();
   const orderId = localStorage.getItem("orderId");
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-500 text-5xl">✓</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mt-5">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for your order. Your order has been placed successfully.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-md p-4 mt-6 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID</span>
            <span className="font-semibold">#{orderId}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-gray-600">Payment</span>
            <span className="font-semibold text-green-600">
              Successful
            </span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-gray-600">Status</span>
            <span className="font-semibold">
              Confirmed
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
