import React, { useState } from 'react';
import Navbar from './Navbar';
// import { Link } from 'react-router-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    cansTaken: '',
    paymentStatus: '',
    orderDate: '',
    duration: '',  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://balaji-aqua-log.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Order submitted successfully!');

        // alert('Order submitted successfully!');
        // Clear form or redirect if necessary
        setFormData({
          name: '',
          phoneNumber: '',
          address: '',
          cansTaken: '',
          paymentStatus: '',
          orderDate: '',
          duration: '',
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('An error occurred while submitting the order.');
    }
  };
  
  
  return (
    <>
    <Navbar />
    <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover transition={Slide} /> {/* Toastify notifications */}

    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-4 text-green-600">New Order</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-left text-lg text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-left text-lg text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-left text-lg text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Number of Cans */}
          <div>
            <label className="block text-left text-lg text-gray-700">Number of Cans</label>
            <input
              type="number"
              name="cansTaken"
              value={formData.cansTaken}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-left text-lg text-gray-700">Payment Status</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Order Date and Return Date in a single row */}
          <div className="flex space-x-4">
            {/* Order Date */}
            <div className="w-full">
              <label className="block text-left text-lg text-gray-700">Order Date</label>
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="w-full">
              <label className="block text-left text-lg text-gray-700">Duration (in day)</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., 1 day, 1 week"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-300"
            >
              Submit Order
            </button>
          </div>
        </form>

        {/* <Link
          to="/"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to Home
        </Link> */}
      </div>
    </div>
    </>
  );
};

export default NewOrder;
