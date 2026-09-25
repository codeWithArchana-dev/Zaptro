import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Payment = () => {
  const { cartItem } = useCart();
  const navigate = useNavigate();
  const couponApplied = localStorage.getItem("couponApplied") === "true";

  const totalPrice = cartItem?.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const discount = couponApplied ? totalPrice * 0.1 : 0;

  const handlingCharge = 5;

  const grandTotal = totalPrice - discount + handlingCharge;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === "upi") {
      const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;

      if (!upiRegex.test(upiId)) {
        alert("Please enter a valid UPI ID");
        return;
      }
    }

    if (paymentMethod === "card") {
      if (cardNumber.length !== 16) {
        alert("Card number must be 16 digits");
        return;
      }

      if (cardHolder.trim().length < 3) {
        alert("Enter valid card holder name");
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        alert("Enter expiry in MM/YY format");
        return;
      }

      if (cvv.length !== 3) {
        alert("CVV must be 3 digits");
        return;
      }
    }

    // Generate Order ID
    const orderId = `ORD${Math.floor(100000 + Math.random() * 900000)}`;

  // console.log("Generated Order ID:", orderId);

  // Save Order ID
  localStorage.setItem("orderId", orderId);

  // Check saved value
  // console.log(
  //   "Saved Order ID:",
  //   localStorage.getItem("orderId")
  // );

  // Go to success page
  navigate("/OrderSuccess");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Payment</h1>

        {/* Payment Methods */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 border p-4 rounded-md cursor-pointer">
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>UPI</span>
          </label>

          <label className="flex items-center gap-3 border p-4 rounded-md cursor-pointer">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Credit / Debit Card</span>
          </label>

          <label className="flex items-center gap-3 border p-4 rounded-md cursor-pointer">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="mt-6">
          {paymentMethod === "upi" && (
            <input
              type="text"
              value={upiId}
              placeholder="Enter UPI ID"
              onChange={(e) => setUpiId(e.target.value)}
              className="border p-3 rounded-md w-full"
              required
            />
          )}

          {paymentMethod === "card" && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={16}
                className="border p-3 rounded-md w-full"
                required
              />

              <input
                type="text"
                placeholder="Card Holder Name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="border p-3 rounded-md w-full"
                required
              />

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  className="border p-3 rounded-md w-full"
                  required
                />

                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  className="border p-3 rounded-md w-full"
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md mt-5"
          >
            {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
