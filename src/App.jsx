import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import axios from "axios";
import Footer from "./Components/Footer";
import SingleProduct from "./Pages/SingleProduct";
import CategoryProduct from "./Pages/CategoryProduct";

const App = () => {
  const [location, setLocation] = useState();
  const [openDropdown, setopenDropdown] = useState(false);

  const getLocation =  () => {

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
  
      const { latitude, longitude } = pos.coords;

      // console.log(latitude,longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const location = await axios.get(url);
        // console.log(location);
        const exactLocation = location.data.address;

        setLocation(exactLocation);
        setopenDropdown(false);

        // console.log(exactLocation);

      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar
          location={location}
          getLocation={getLocation}
          openDropdown={openDropdown}
          setopenDropdown={setopenDropdown}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<SingleProduct />}></Route>
          <Route
            path="/category/:category"
            element={<CategoryProduct />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/cart"
            element={<Cart location={location} getLocation={getLocation} />}
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
