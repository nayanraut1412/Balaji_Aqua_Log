import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const PreviousOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]); // For displaying filtered results
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [filterOption, setFilterOption] = useState('all'); // Filter option: "all" or "last7days"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                const data = await response.json();
                if (response.ok) {
                    const sortedOrders = data.orders.sort((a, b) => {
                        const dateA = new Date(a.orderDate);
                        const dateB = new Date(b.orderDate);
                        // Sort primarily by date in descending order, then by latest addition
                        return dateB - dateA;
                    });
                    setOrders(sortedOrders);
                    setFilteredOrders(sortedOrders);
                } else {
                    setError(data.message || 'Failed to fetch orders');
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Function to handle search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        filterOrders(filterOption, query);
    };

    // Function to handle filter options (All or Last 7 Days)
    const handleFilterChange = (e) => {
        const option = e.target.value;
        setFilterOption(option);

        filterOrders(option, searchQuery);
    };

    // Filter logic
    const filterOrders = (filter, query) => {
        let filtered = [...orders];

        if (filter === 'last7days') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            filtered = filtered.filter(
                (order) => new Date(order.orderDate) >= sevenDaysAgo
            );
        }

        if (query) {
            filtered = filtered.filter((order) =>
                Object.values(order).some((value) =>
                    String(value).toLowerCase().includes(query)
                )
            );
        }

        setFilteredOrders(filtered);
    };

    if (loading) {
        return <div className="text-center mt-8 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-lg text-red-500">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">
                    Previous Orders
                </h1>

                {/* Search Bar and Filter Options */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by Name, Phone, Payment, Address, etc."
                        className="w-full sm:w-1/2 px-4 py-2 mb-4 sm:mb-0 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <select
                        value={filterOption}
                        onChange={handleFilterChange}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="all">All Dates</option>
                        <option value="last7days">Last 7 Days</option>
                    </select>
                </div>

                {filteredOrders.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        No matching orders found.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    {/* Order Header */}
                                    <h2 className="text-2xl font-semibold text-green-600 mb-2">
                                        {order.name}
                                    </h2>

                                    {/* Order Details in 2-column layout */}
                                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                                        {/* First Column */}
                                        <div className="space-y-2">
                                            <p className="text-gray-700">
                                                <strong className="font-medium text-gray-900">Phone:</strong> {order.phoneNumber}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong className="font-medium text-gray-900">Address:</strong> {order.address}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong className="font-medium text-gray-900">Cans Taken:</strong> {order.cansTaken}
                                            </p>
                                        </div>

                                        {/* Second Column */}
                                        <div className="space-y-2">
                                            <p
                                                className={`font-medium ${
                                                    order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'
                                                }`}
                                            >
                                                <strong>Payment Status:</strong> {order.paymentStatus}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong className="font-medium text-gray-900">Order Date:</strong>{' '}
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-700">
                                                <strong className="font-medium text-gray-900">Duration:</strong> {order.duration}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PreviousOrders;
