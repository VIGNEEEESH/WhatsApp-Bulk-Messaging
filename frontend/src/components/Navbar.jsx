// Navbar.js
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src="./csc.png"
              className="h-12 rounded-2xl"
              alt="Flowbite Logo"
            /> */}
            <span className="self-center text-m font-semibold whitespace-nowrap">
              Bulk Messager
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="/signin">
              <button
                type="button"
                className="text-white bg-customGreen hover:bg-customGreen focus:ring-4 focus:outline-none focus:ring-customGreen font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Get started
              </button>
            </a>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="#00A884"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-white bg-customGreen rounded md:bg-transparent md:text-customGreen md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              {/* <li>
                <a
                  href="/instructions"
                  className="block py-2 px-3 text-white bg-customGreen rounded md:bg-transparent md:text-customGreen md:p-0"
                  aria-current="page"
                >
                  Instructions
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="block py-2 px-3 text-white bg-customGreen rounded md:bg-transparent md:text-customGreen md:p-0"
                  aria-current="page"
                >
                  Pricing
                </a>
              </li> */}
              <li>
                <a
                  href="/contact"
                  className="block py-2 px-3 text-white bg-customGreen rounded md:bg-transparent md:text-customGreen md:p-0"
                  aria-current="page"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
