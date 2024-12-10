import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const PreviousOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders');
                const data = await response.json();
                if (response.ok) {
                    setOrders(data.orders); // Set orders from the backend
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
                <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">Previous Orders</h1>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No previous orders found.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    {/* Order Header */}
                                    <h2 className="text-2xl font-semibold text-green-600 mb-2">
                                        {order.name}
                                    </h2>
                                    {/* <p className="text-sm text-gray-500 mb-4">#{order._id.slice(-6)}</p> */}

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
                                            <p className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
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
