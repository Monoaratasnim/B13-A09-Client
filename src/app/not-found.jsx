"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-green-600">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block mt-8 rounded-xl bg-green-700 px-6 py-3 text-white font-semibold shadow-lg transition hover:bg-green-800 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}