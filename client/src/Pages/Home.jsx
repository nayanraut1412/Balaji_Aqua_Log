import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold mb-4 text-blue-600">Welcome to Balaji Aqua Log</h1>
        <p className="text-xl mb-6 text-gray-700">Manage customer details and generate receipts easily!</p>

          <div className="flex items-center justify-center flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/login"
              className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              Login
            </Link>
            {/* <Link
              to="/register"
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              Register
            </Link> */}
          </div>


      </div>
    </div>
  );
};

export default Home;
