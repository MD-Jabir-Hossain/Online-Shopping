import React, { useState, useEffect } from 'react';
import { FaTimes, FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Swal from 'sweetalert2';

const NewsletterPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        const hasOptedOut = localStorage.getItem('newsletterPopupDisabled');
        if (hasOptedOut) return;

        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 9000);

        return () => clearTimeout(timer);
    }, []);

    if (!showPopup) return null;

    const handleSubmitSubscribe = (event) => {
        event.preventDefault();
        const Email = event.target.email.value;

        fetch('http://localhost:5000/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({ Email }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success && json.data) {
                    Swal.fire({ title: 'Success', text: 'Successfully submitted', icon: 'success', confirmButtonText: 'OK' });
                    event.target.reset();
                } else {
                    Swal.fire({ title: 'Error!', text: json.error || 'Failed to submit', icon: 'error', confirmButtonText: 'Cool' });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({ title: 'Error!', text: 'An error occurred', icon: 'error', confirmButtonText: 'OK' });
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4 sm:p-7">

            <div
                className="relative bg-white rounded-lg w-full max-w-md sm:max-w-2xl overflow-hidden p-6 sm:p-10"
                style={{
                    backgroundImage: "url('/images/popupimage/bg-newsletter.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '10px solid white',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                <div className="relative z-10">
                    <button
                        onClick={() => setShowPopup(false)}
                        className="absolute top-2 right-2 text-white hover:text-orange-300 z-20"
                    >
                        <FaTimes size={20} />
                    </button>

                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-green-950">
                        SIGN UP NEWSLETTER
                    </h2>
                    <p className="text-sm sm:text-base text-center text-black mb-4">
                        Subscribe to the Shopping mailing list to receive updates on new arrivals, special offers, and discounts.
                    </p>

                    <form onSubmit={handleSubmitSubscribe} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            required
                            className="w-full px-3 py-2 sm:py-3 sm:px-4 border border-gray-300 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-32 bg-orange-500 text-white py-2 sm:py-2.5 rounded hover:bg-orange-600 transition-colors text-sm sm:text-base mx-auto block"
                        >
                            SUBSCRIBE
                        </button>
                    </form>

                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="dontShowAgain"
                            checked={dontShowAgain}
                            onChange={(e) => setDontShowAgain(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="dontShowAgain" className="text-xs sm:text-sm text-white">
                            Don't show this popup again
                        </label>
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                        {[
                            { icon: FaFacebookF, color: 'text-blue-500' },
                            { icon: FaTwitter, color: 'text-blue-400' },
                            { icon: FaGooglePlusG, color: 'text-red-500' },
                            { icon: FaInstagram, color: 'text-pink-500' },
                            { icon: FaLinkedinIn, color: 'text-blue-600' },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href="#"
                                className={`bg-white p-1.5 sm:p-2 rounded-full ${social.color} hover:bg-orange-400 transition-colors`}
                            >
                                <social.icon size={14} className="sm:size-16" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterPopup;
