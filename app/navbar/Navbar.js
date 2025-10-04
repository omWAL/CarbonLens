"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="text-2xl font-bold">
          Carbon <span className="text-green-400">Lens</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex space-x-8">
          <a href="#banner" className="hover:text-green-400">Home</a>
          <a href="#map" className="hover:text-green-400">MAP</a>
          <a href="#carbon-footprint" className="hover:text-green-400">Carbon-footprint</a>
          <a href="#activity" className="hover:text-green-400">Activity</a>
        </div>

        {/* Right: Login */}
        <div>
          <Link
            href="/login"
            className="px-4 py-2 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
