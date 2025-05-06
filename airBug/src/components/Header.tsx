import React from 'react';
import { Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-[#FF5A5F]" />
            <span className="ml-2 text-xl font-bold text-[#FF5A5F]">airBug</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#FF5A5F] px-3 py-2 rounded-md text-sm font-medium">Places to stay</a>
            <a href="#" className="text-gray-700 hover:text-[#FF5A5F] px-3 py-2 rounded-md text-sm font-medium">Experiences</a>
            <a href="#" className="text-gray-700 hover:text-[#FF5A5F] px-3 py-2 rounded-md text-sm font-medium">Online Experiences</a>
          </nav>
          <div className="flex items-center">
            <button className="bg-[#FF5A5F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FF4349] transition-colors duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;