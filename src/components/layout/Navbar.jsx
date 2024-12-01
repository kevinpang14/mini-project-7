import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white mb-8 mt-4">
      <div className=" max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        <h1 className="text-xl font-semibold">
          {" "}
          <Link to="/" className="text-black hover:text-gray-500">
            LumosBlog
          </Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-700">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700">
              About
            </Link>
          </li>
          <li>
            <Link to="/newsletter" className="text-gray-700">
              Newsletter
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
