import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  // console.log(cartItem);

  const navigate = useNavigate();

  const totalPrice = cartItem?.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );


  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

   const discount = couponApplied ? totalPrice * 0.1 : 0;

  const grandTotal = totalPrice - discount + 5;

 const handleApplyCoupon = () => {
  if (coupon.trim().toUpperCase() === "SAVE10") {
    setCouponApplied(true);
    setCouponMessage("Coupon Applied Successfully");

    localStorage.setItem("couponApplied", "true");
  } else {
    setCouponApplied(false);
    setCouponMessage("Invalid Coupon code");

    localStorage.removeItem("couponApplied");
  }
};

  const handleCheckout = () => {
    if (!couponApplied) {
      alert("Please apply valid coupon code first");
      return;
    }

    navigate("/DelivaryInfo");
  };
  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5">
      {cartItem?.length > 0 ? (
        <div>
          {/* Cart Heading */}
          <h1 className="pl-5 text-2xl font-bold">
            My Cart ({cartItem?.length})
          </h1>

          <div className="mt-10">
            {cartItem?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-5 w-full"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-md"
                  />

                  <div>
                    <h1 className="md:w-[300px] line-clamp-2">{item.title}</h1>

                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                <div className="bg-red-500 rounded-md font-bold text-white flex gap-4 p-2 text-xl">
                  <button
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "decrease")
                    }
                    className="cursor-pointer"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "increase")
                    }
                    className="cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Delete */}
                <span
                  onClick={() => deleteItem(item.id)}
                  className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                >
                  <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                </span>
              </div>
            ))}
          </div>

          {/* BILL DETAILS */}


          <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
            <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>

            {/* Total Items */}
            <div className="flex items-center justify-between">
              <h1 className="flex gap-1 items-center text-gray-700">
                <LuNotebookText />
                Total Items
              </h1>

              <p>${totalPrice.toFixed(2)}</p>
            </div>

            {/* Delivery */}
            <div className="flex items-center justify-between">
              <h1 className="flex gap-1 items-center text-gray-700">
                <MdDeliveryDining />
                Delivery Charge
              </h1>

              <p className="text-red-500 font-semibold">FREE</p>
            </div>

            {/* Handling */}
            <div className="flex items-center justify-between">
              <h1 className="flex gap-1 items-center text-gray-700">
                <GiShoppingBag />
                Handling Charge
              </h1>

              <p className="text-red-500 font-semibold">$5</p>
            </div>

            {/* Discount */}
            {couponApplied && (
              <div className="flex items-center justify-between">
                <h1 className="text-gray-700 font-semibold">
                  Discount (SAVE10)
                </h1>

                <p className="text-green-600 font-semibold">
                  -${discount.toFixed(2)}
                </p>
              </div>
            )}

            <hr className="text-gray-200 mt-2" />

            {/* Grand Total */}
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">Grand Total</h1>

              <p className="font-semibold text-lg">${grandTotal.toFixed(2)}</p>
            </div>

            {/* Promo */}
            <div>
              <h1 className="text-gray-700 mb-3 mt-7 font-semibold">
                Apply Promo Code
              </h1>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="rounded-md w-full p-2"
                  
                />

                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <p
                  className={`text-sm mt-2 ${
                    couponApplied ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Checkout */}
            <button
              type="button"
              onClick={handleCheckout}
              className="bg-red-500 text-white px-3 py-2 mt-3 rounded-md cursor-pointer w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        /* EMPTY CART */
        <div className="flex flex-col gap-3 justify-center items-center">
          <h1 className="text-red-500/80 md:text-5xl text-3xl font-bold pt-0">
            Oh no! Your Cart is empty
          </h1>

          <img src={emptyCart} alt="" className="md:w-[400px] w-[350px]" />

          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white cursor-pointer rounded-md px-3 py-2 mt-0"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
