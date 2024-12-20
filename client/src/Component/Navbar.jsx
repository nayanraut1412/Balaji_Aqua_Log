// import React from 'react';
import { React, useState } from 'react';

// import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// import { Link } from 'react-router-dom';
// 
const Navbar = () => {
  const [, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
    const location = useLocation();
  
  const handleLogout = () => {
    
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    // localStorage.removeItem('role'); 
    setIsLoggedIn(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'text-white px-4 py-2  bg-blue-700 hover:bg-blue-800 rounded-lg transition duration-300' : 'text-white px-4 py-2 text-black';

  return (
    <nav className="bg-green-600 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/neworder">Balaji Aqua</Link>
        </div>

        {/* Buttons */}
        <div className="hidden sm:flex gap-4 ">
          <Link
            to="/neworder"
            className={isActive('/neworder')}
            // className="text-white px-4 py-2 rounded-lg transition duration-300"
          >
            New Order
          </Link>
          <Link
            to="/previous-orders"
            className={isActive('/previous-orders')}
            // className="text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Previous Orders
          </Link>
          <button onClick={handleLogout} className={isActive('')}>Log Out</button>

        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center">
          <button
            type="button"
            className="text-white focus:outline-none"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu.classList.toggle('hidden');
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div id="mobile-menu" className="hidden sm:hidden mt-4">
       
        <div className="flex items-center justify-center flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/neworder"
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue -700 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              New Order
            </Link>
            <Link
              to="/previous-orders"
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              Previous Orders
            </Link>
          <button onClick={handleLogout} 
          className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-300 w-full sm:w-auto text-center"

          >Log Out</button>

          </div>
      </div>
    </nav>
  );
};

export default Navbar;
