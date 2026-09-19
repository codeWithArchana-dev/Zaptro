import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/react";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { useCart } from "../Context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({location, getLocation,openDropdown,setopenDropdown}) => {

  const{cartItem} = useCart()

  const [openNav , setOpneNav] = useState(false);

  const toggleDropdown = () =>{
    setopenDropdown(!openDropdown)
  }
 
  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl  flex justify-between items-center ">
        {/* logo section */}
        <div className="max-w-6xl mx-auto justify-center flex items-center gap-3">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">Z</span>aptro
            </h1>
          </Link>
          <div className=" md:flex gap-1 cursor-pointer text-gray-700 text-center hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {" "}
              {location ? <div className="-space-y-2">
                <p>{location.city}</p>
                <p>{location.state}</p>
              </div> : "Add Address"}
            </span>
            <FaCaretDown className="mt-1" onClick={toggleDropdown} />
          </div>
          {
            openDropdown?<div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">Change Location 
                <span onClick={toggleDropdown}><CgClose/></span></h1>
                <button onClick={getLocation} className="bg-red-500 text-white px-3 py-1 rounded-md
                cursor-pointer hover:bg-red-400">Detect My Location</button>
            </div>:null
          }
        </div>
        <nav className="flex gap-7 items-center">
          <ul className=" md:flex gap-7 items-center text-xl font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute bottom-3 left-3 text-white">
              {cartItem?.length}
            </span>
          </Link>

          <div className="hidden md:block">
          <Show when="signed-out">
            <SignUpButton>
              <button className="bg-red-500 text-white rounded-md font-medium px-3 py-1 cursor-pointer">
                Sign In
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          </div>

          {
            openNav ? <HiMenuAlt3 onClick={()=>setOpneNav(false)} className="h-7 w-7 md:hidden" />
            :<HiMenuAlt1 onClick={()=>setOpneNav(true)} className="h-7 w-7 md:hidden"/>
          }
        </nav>
      </div>

      <ResponsiveMenu setOpneNav={setOpneNav} openNav={openNav}/>
    </div>
  );
};

export default Navbar;
