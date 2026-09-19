import { useUser, UserButton, SignInButton } from "@clerk/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 flex h-screen z-20 w-[75%] flex-col
      justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden
      rounded-r-xl shadow-md transition-all`}
    >
      <div>
        {/* User Section */}
        <div className="flex items-center justify-start gap-3">
          {user ? <UserButton /> : <FaUserCircle size={50} />}

          <div>
            <h1>Hello, {user?.firstName || "Guest"}</h1>
            <h1 className="text-sm text-slate-500">Premium user</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link
              to="/"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Home</li>
            </Link>

            <Link
              to="/products"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Products</li>
            </Link>

            <Link
              to="/about"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>About</li>
            </Link>

            <Link
              to="/contact"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Contact</li>
            </Link>
          </ul>
        </nav>

        {/* Sign In Button - only when user is NOT logged in */}
        {!user && (
          <div className="mt-10">
            <SignInButton>
              <button
                onClick={() => setOpenNav(false)}
                className="w-full bg-red-500 hover:bg-red-600 text-white
                py-2 rounded-md font-semibold text-lg transition"
              >
                Sign In
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveMenu;