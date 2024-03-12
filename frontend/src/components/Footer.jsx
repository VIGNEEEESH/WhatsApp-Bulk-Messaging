import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src="./csc.png"
              className="h-8 rounded-3xl"
              alt="Flowbite Logo"
            /> */}
            <span className="self-center font-semibold whitespace-nowrap text-gray-900">
              Bulk Whatsapp Messager
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-black sm:text-center">
          © 2023{" "}
          <a href="https://www.thecorrectsteps.com/" className="hover:underline">
            Correct Steps Consultancy
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
export default Footer;