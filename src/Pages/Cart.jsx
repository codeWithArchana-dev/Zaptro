import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/react";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  // console.log(cartItem);
  const { user } = useUser();
  // console.log(user);

  const navigate = useNavigate();

  const totalPrice = cartItem?.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    address: "",
    state: "",
    postcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (location) {
      setFormData((prev) => ({
        ...prev,
        address:
          location.road ||
          location.neighbourhood ||
          location.suburb ||
          location.county ||
          location.city ||
          "",
        state: location.state || "",
        postcode: location.postcode || "",
        country: location.country || "",
      }));
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
      }));
    }
  }, [location, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Delivery Details:", formData);

    alert("Form Submitted Successfully!");
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

          {/* DELIVERY + BILL DETAILS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* DELIVERY FORM */}
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>

                {/* Full Name */}
                <div className="flex flex-col space-y-1">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Name"
                    className="rounded-md p-2"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col space-y-1">
                  <label>Address</label>

                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                    className="rounded-md p-2"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State + PostCode */}
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      placeholder="Enter Your State"
                      className="p-2 rounded-md w-full"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label>PostCode</label>

                    <input
                      type="text"
                      name="postcode"
                      placeholder="Enter Your PostCode"
                      className="p-2 rounded-md w-full"
                      value={formData.postcode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Country + Phone */}
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label>Country</label>

                    <input
                      type="text"
                      name="country"
                      placeholder="Enter Your Country"
                      className="p-2 rounded-md w-full"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label>Phone No</label>

                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter Your Phone No"
                      className="p-2 rounded-md w-full"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer"
                >
                  Submit
                </button>

                <div className="flex items-center justify-center w-full text-gray-700">
                  -----------OR----------
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={getLocation}
                    className="bg-red-500 text-white px-3 py-2 rounded-md"
                  >
                    Detect Location
                  </button>
                </div>
              </div>
            </form>

            {/* BILL DETAILS */}

            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>

              {/* Total Items */}
              <div className="flex items-center justify-between">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <LuNotebookText />
                  Total Items
                </h1>

                <p>${totalPrice}</p>
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining />
                  Delivery Charge
                </h1>

                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">$25</span> FREE
                </p>
              </div>

              {/* Handling */}
              <div className="flex items-center justify-between">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag />
                  Handling Charge
                </h1>

                <p className="text-red-500 font-semibold">$5</p>
              </div>

              <hr className="text-gray-200 mt-2" />

              {/* Grand Total */}
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg">Grand Total</h1>

                <p className="font-semibold text-lg">${totalPrice + 5}</p>
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
                    className="rounded-md w-full p-2"
                  />

                  <button
                    type="button"
                    className="bg-white text-black border border-gray-200 px-4 py-1 rounded-md"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout */}
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-2 mt-3 rounded-md cursor-pointer w-full"
              >
                Proceed to Checkout
              </button>
            </div>
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
