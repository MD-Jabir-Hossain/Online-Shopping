import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartPage = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        try {
            const orderData = {
                customerInfo: formData,
                products: cartItems.map(item => ({
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    quantity: item.quantity
                })),
                totalAmount: cartTotal,
                orderDate: new Date().toISOString()
            };

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                clearCart();
                Swal.fire({
                    title: 'Success',
                    text: 'Your Order is Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Your Order is went to Wrong',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                title: 'Success',
                    text: 'Your Order is Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl text-white font-bold mb-8">Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-3xl text-white font-semibold mb-4">Your cart is empty</h2>
                    <Link
                        to="/shop"
                        className="bg-orange-500 hover:bg-orange-600 text-xl text-white font-medium py-4 px-10 rounded inline-block"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-4 flex">
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="ml-4 flex-grow">
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-gray-700 mr-2">Quantity:</span>
                                                <span className="font-medium">{item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-lg font-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total:</span>
                                    <span className="text-xl font-bold text-orange-600">
                                        ${cartTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="bg-white rounded-lg shadow-md p-6 h-[500px]">
                        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                        <form onSubmit={handleSubmitOrder}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2" htmlFor="address">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;