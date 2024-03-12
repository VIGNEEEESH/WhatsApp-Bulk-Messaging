// src/components/Navbar.js
import React from 'react';
import { HomeIcon, ChartBarIcon, CogIcon } from '@heroicons/react/solid';

const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-800">Dashboard</span>
          <div className="flex space-x-4">
            <HomeIcon className="h-6 w-6" />
            <ChartBarIcon className="h-6 w-6" />
            <CogIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
