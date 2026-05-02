import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left - Brand */}
        <div className="text-xl font-bold">
          MyApp
        </div>

        {/* Middle - Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/animals" className="hover:text-blue-400">
            All Animals
          </Link>
          <Link to="/login_user" className="hover:text-blue-400">
            Login
          </Link>
        </div>

        {/* Right - Copyright */}
        <div className="text-sm text-gray-400 mt-4 md:mt-0">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>

      </div>
    </footer>
  );
}