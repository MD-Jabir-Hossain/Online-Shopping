import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Footer = () => {

    const handleSubmitSubscribe = (event) => {
        event.preventDefault();
        const Email = event.target.email.value;

        fetch('http://localhost:5000/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({ Email }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success && json.data) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully submitted',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    event.target.reset();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: json.error || 'Failed to submit contact form',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while submitting',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <>
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Don't Miss Out On Amazing Deals!</h2>
                    <p className="text-base sm:text-xl mb-8">Subscribe to our newsletter and get 15% off your first order</p>
                    <form onSubmit={handleSubmitSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm sm:text-base"
                            required
                        />
                        <button 
                            type="submit" 
                            className="bg-white text-orange-600 font-bold py-3 px-6 rounded hover:bg-gray-100 transition-colors whitespace-nowrap text-sm sm:text-base"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-xs sm:text-sm mt-4 opacity-80">We'll never share your email. Unsubscribe anytime.</p>
                </div>
            </div>

            {/* Main Footer Section  */}
            <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 text-sm sm:text-base">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                        {/* Column 1: About */}
                        <div>
                            <h3 className="text-white text-lg sm:text-xl font-bold mb-6">j@Shop</h3>
                            <p className="mb-4">
                                Your one-stop destination for premium electronics, fashion, and accessories at unbeatable prices.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-green-400 hover:text-white transition-colors">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="#" className="text-green-400 hover:text-white transition-colors">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="#" className="text-green-400 hover:text-white transition-colors">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="#" className="text-green-400 hover:text-white transition-colors">
                                    <FaLinkedin size={20} />
                                </a>
                                <a href="#" className="text-green-400 hover:text-white transition-colors">
                                    <FaYoutube size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className=''>
                            <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Quick Links</h3>
                            <div className="text-white">
                                <Link to="/" className="hover:text-green-400 block font-medium mb-2 text-sm sm:text-base">
                                    HOME
                                </Link>
                                <Link to="/features" className="hover:text-green-400 block font-medium mb-2 text-sm sm:text-base">
                                    FEATURES
                                </Link>
                                <Link to="/deals" className="hover:text-green-400 block font-medium mb-2 text-sm sm:text-base">
                                    DEALS
                                </Link>
                                <Link to="/shop" className="hover:text-green-400 block font-medium mb-2 text-sm sm:text-base">
                                    SHOP
                                </Link>
                                <Link to="/about" className="hover:text-green-400 block font-medium mb-2 text-sm sm:text-base">
                                    ABOUT US
                                </Link>
                                <Link to="/contact" className="hover:text-green-400 block font-medium mb-2 text-sm sm:text-base">
                                    CONTACT US
                                </Link>
                            </div>
                        </div>

                        {/* Column 3: Customer Service */}
                        <div>
                            <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Customer Service</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Return & Refund</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Contact Info */}
                        <div>
                            <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Contact Us</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <MdLocationOn className="mt-1 mr-3 text-orange-500" size={18} />
                                    <span>Sonadanga, Khulna sadar, Khulna, Bangladesh</span>
                                </li>
                                <li className="flex items-center">
                                    <MdPhone className="mr-3 text-orange-500" size={18} />
                                    <span>(+880) 1784-672862</span>
                                </li>
                                <li className="flex items-center">
                                    <MdEmail className="mr-3 text-orange-500" size={18} />
                                    <span>support@j@shop.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-gray-800 pt-8 text-center text-green-400">
                        <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} J@Shop. All Rights Reserved.</p>
                        <p className="mt-2 text-xs sm:text-sm text-green-300">
                            ❤️ Designed By JABIR ❤️
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
