import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FetchOrderDetails, FetchuserOrder } from '../redux/slices/OrderSlice';

const MyOrderPage = () => {
    const navigate = useNavigate();
    const { orders, loading, error } = useSelector((state) => state.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchuserOrder());
    }, [dispatch]);

    const HandlerowClick = (Orderid) => {
        navigate(`/orders/${Orderid}`); // Corrected the URL format
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl uppercase text-gray-800 font-bold mb-6">
                My Orders
            </h2>
            <div className="relative shadow-md overflow-hidden">
                <table className="min-w-full text-left text-gray-600">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-2 px-4 sm:py-3">Image</th>
                            <th className="py-2 px-4 sm:py-3">Order ID</th>
                            <th className="py-2 px-4 sm:py-3">Created At</th>
                            <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                            <th className="py-2 px-4 sm:py-3">Items</th>
                            <th className="py-2 px-4 sm:py-3">Price</th>
                            <th className="py-2 px-4 sm:py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((item) => (
                                <tr
                                    key={item._id}
                                    onClick={() => HandlerowClick(item._id)}
                                    className="border-b border-gray-400 hover:border-gray-50 cursor-pointer"
                                >
                                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                                        <img
                                            src={item.Orderitems[0]?.image} // Fixed to access the first order item image
                                            alt={item.Orderitems[0]?.name} // Added name for alt text
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4 sm:py-4">{item._id}</td>
                                    <td className="py-2 px-4 sm:py-4">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 sm:py-4">
                                        {item.ShippingAddress.city}, {item.ShippingAddress.country}
                                    </td>
                                    <td className="py-2 px-4 sm:py-4">{item.Orderitems.length}</td>
                                    <td className="py-2 px-4 sm:py-4">₹{item.totalPrice.toLocaleString()}</td>
                                    <td className="py-2 px-4 sm:py-4">
                                        {item.isPaid ? (
                                            <span className="text-green-600 font-bold bg-green-200 px-4 py-1 rounded-lg">Paid</span>
                                        ) : (
                                            <span className="text-red-600 font-bold bg-red-200 px-4 py-1 rounded-lg">Pending</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                                    You have no orders
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrderPage;
