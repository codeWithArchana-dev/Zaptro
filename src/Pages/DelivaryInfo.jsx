import React, { useState, useEffect } from "react";
import { getData } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

const DelivaryInfo = ({location , getLocation}) => {

  const navigate = useNavigate();

  const { user } = getData();
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
  }, [location]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
      }));
    } else {
      setFormData({
        fullName: "",
        address: "",
        state: "",
        postcode: "",
        country: "",
        phone: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      address: "",
      state: "",
      postcode: "",
      country: "",
      phone: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Delivery Details:", formData);
    navigate("/Payment");

  };

  return (
    <div className="bg-gray-100 py-10 px-4 min-h-screen">
      {/* DELIVERY FORM */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-md p-7 space-y-2 mx-auto max-w-2xl shadow-lg">
          <h1 className="text-gray-800 font-bold text-2xl text-center">Delivery Information</h1>

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
                maxLength={10}
                title="Please enter a valid 10-digit mobile number"
                pattern="[6-9][0-9]{9}"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">

             <button
              type="submit"
              className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer"
            >
              Continue to Payment
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer"
            >
              Reset
            </button>

          </div>

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
    </div>
  );
};

export default DelivaryInfo;
