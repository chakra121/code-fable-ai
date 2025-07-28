//create a rounded cener navbar component with a logo and links with glass background use daisyUI components
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="mt-3 relative shadow-lg rounded-full glass mx-44 px-4 bg-gray-800/45 backdrop-filter backdrop-glass">
      <div className="p-4 items-center justify-between flex">
        <a className="btn btn-ghost normal-case text-xl">Code Fable AI</a>
        <div className="flex space-x-6 text-lg">
          <Link href="/" className="btn btn-ghost">
            Home
          </Link>
          <Link href="/about" className="btn btn-ghost">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}