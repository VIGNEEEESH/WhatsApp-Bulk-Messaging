import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Helmet} from "react-helmet";
const Pricing = () => {
  return (
  <><Navbar />
    <Helmet>
      <title>Bulk Messager | Pricing </title>
      <meta name="description" content="Pricing" />
    </Helmet>
  <section className="bg-white mt-10">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Designed for business teams like yours
        </h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
        {/* Pricing Card 1 */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-black bg-white rounded-lg border border-gray-100 shadow">
          <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
          <p className="font-light text-gray-500 sm:text-lg">
            Best option for personal use &amp; for your next project.
          </p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$29</span>
            <span className="text-gray-500">/month</span>
          </div>
          {/* List */}
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd" />
              </svg>
              <span>Individual configuration</span>
            </li>
            {/* ... (other list items unchanged) */}
          </ul>
          <a
            href="#"
            className="text-black bg-customGreen hover:bg-opacity-80 focus:ring-4 focus:ring-customGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Get started
          </a>
        </div>
        {/* Pricing Card 2 */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-black bg-white rounded-lg border border-gray-100 shadow">
          {/* ... (similar structure as Pricing Card 1) */}
          <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
          <p className="font-light text-gray-500 sm:text-lg">
            Best option for personal use &amp; for your next project.
          </p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$50</span>
            <span className="text-gray-500">/month</span>
          </div>
          {/* List */}
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd" />
              </svg>
              <span>Individual configuration</span>
            </li>
            {/* ... (other list items unchanged) */}
          </ul>
          <a
            href="#"
            className="text-black bg-customGreen hover:bg-opacity-80 focus:ring-4 focus:ring-customGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Get started
          </a>
        </div>
        {/* Pricing Card 3 */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-black bg-white rounded-lg border border-gray-100 shadow">
          {/* ... (similar structure as Pricing Card 1) */}
          <h3 className="mb-4 text-2xl font-semibold">Premium Plus</h3>
          <p className="font-light text-gray-500 sm:text-lg">
            Best option for personal use &amp; for your next project.
          </p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">$79</span>
            <span className="text-gray-500">/month</span>
          </div>
          {/* List */}
          <ul role="list" className="mb-8 space-y-4 text-left">
            <li className="flex items-center space-x-3">
              {/* Icon */}
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd" />
              </svg>
              <span>Individual configuration</span>
            </li>
            {/* ... (other list items unchanged) */}
          </ul>
          <a
            href="#"
            className="text-black bg-customGreen hover:bg-opacity-80 focus:ring-4 focus:ring-customGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  </section>
  <Footer/></>
  );
};

export default Pricing;
