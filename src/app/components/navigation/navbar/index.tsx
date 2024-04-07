import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
<div className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
            <div className="text-white">
                <Link href="/">
                <h1 className="text-2xl font-bold cursor-pointer">Destiny 2 Power</h1>
                </Link>
          <ul className="hidden md:flex gap-x-6 text-white left-justified">
            <li>
              <Link href="/">
                <p>About</p>
              </Link>
            </li>
            <li>
              <Link href="/">
                <p>Settings</p>
              </Link>
            </li>
            <li>
              <Link href="/">
                <p>Contacts</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
