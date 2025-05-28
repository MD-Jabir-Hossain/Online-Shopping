import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, cartTotal } = useCart();
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const toggleUserDropdown = (e) => {
        e.stopPropagation();
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsAdminDropdownOpen(false);
    };

    const toggleAdminDropdown = (e) => {
        e.stopPropagation();
        setIsAdminDropdownOpen(!isAdminDropdownOpen);
        setIsUserDropdownOpen(false);
    };

    const toggleMobileMenu = (e) => {
        e.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsUserDropdownOpen(false);
        setIsAdminDropdownOpen(false);
    };

    const closeAllDropdowns = () => {
        setIsUserDropdownOpen(false);
        setIsAdminDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = () => closeAllDropdowns();
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-4 shadow-md bg-white">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center space-x-1 text-orange-500 text-2xl md:text-3xl font-bold">
                        <lord-icon
                            src="https://cdn.lordicon.com/ggirntso.json"
                            trigger="loop"
                            delay="1000"
                            stroke="bold"
                            colors="secondary:#f97316,primary:#999999"
                            style={{ width: "40px", height: "40px" }}
                        />
                        <Link to="/" onClick={closeAllDropdowns}>j@SHOP</Link>
                    </div>

                    <button 
                        onClick={toggleMobileMenu}
                        className="md:hidden text-gray-700 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                <div className={`${isMobileMenuOpen ? 'hidden' : 'w-full'} md:w-1/2 mt-4 md:mt-0 px-4 md:px-0`}>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="w-full px-4 py-2 md:py-3 bg-gray-100 focus:outline-none rounded-l-md"
                        />
                        <button className="bg-orange-500 px-3 md:px-4 rounded-r-md">
                            <lord-icon
                                src="https://cdn.lordicon.com/wjyqkiew.json"
                                trigger="loop"
                                delay="1000"
                                stroke="bold"
                                colors="primary:white"
                                style={{ width: "24px", height: "24px" }}
                            />
                        </button>
                    </div>
                </div>

                <div className={`${isMobileMenuOpen ? 'hidden' : 'flex'} md:flex items-center justify-center space-x-4 md:space-x-6 mt-4 md:mt-0`}>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {!user && !isAdmin && (
                            <div className="relative">
                                <button
                                    onClick={toggleUserDropdown}
                                    className="focus:outline-none flex items-center"
                                >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/bhfjfgqz.json"
                                        trigger="loop"
                                        delay="1000"
                                        stroke="bold"
                                        style={{ width: "30px", height: "30px" }}
                                        colors={isUserDropdownOpen ? "secondary:#f97316,primary:#999999" : "secondary:#999999,primary:#f97316"}
                                    />
                                    <span className="ml-1 md:ml-2 hidden sm:inline">User</span>
                                </button>

                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                        <Link
                                            to="/login"
                                            className="block px-4 py-3 text-sm md:text-base text-gray-700 rounded-md hover:bg-gray-100"
                                            onClick={closeAllDropdowns}
                                        >
                                            User Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="block px-4 py-3 text-sm md:text-base text-gray-700 rounded-md hover:bg-gray-100"
                                            onClick={closeAllDropdowns}
                                        >
                                            User Signup
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {!user && !isAdmin && (
                            <div className="relative">
                                <button
                                    onClick={toggleAdminDropdown}
                                    className="focus:outline-none flex items-center"
                                >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/knzzcfyy.json"
                                        trigger="loop"
                                        delay="1000"
                                        stroke="bold"
                                        style={{ width: "30px", height: "30px" }}
                                        colors={isAdminDropdownOpen ? "secondary:#f97316,primary:#999999" : "secondary:#999999,primary:#f97316"}
                                    />
                                    <span className="ml-1 md:ml-2 hidden sm:inline">Admin</span>
                                </button>

                                {isAdminDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                                        <Link
                                            to="/admin/login"
                                            className="block px-4 py-3 text-sm md:text-base text-gray-700 rounded-md hover:bg-gray-100"
                                            onClick={closeAllDropdowns}
                                        >
                                            Admin Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {user && !isAdmin && (
                            <div className="relative">
                                <button
                                    onClick={toggleUserDropdown}
                                    className="focus:outline-none"
                                >
                                    <div className="flex items-center">
                                        <lord-icon
                                            src="https://cdn.lordicon.com/bhfjfgqz.json"
                                            trigger="loop"
                                            delay="1000"
                                            stroke="bold"
                                            style={{ width: "30px", height: "30px" }}
                                            colors={isUserDropdownOpen ? "secondary:#f97316,primary:#999999" : "secondary:#999999,primary:#f97316"}
                                        />
                                        <span className="ml-1 md:ml-2 text-sm md:text-base">{user.username || user.fullName}</span>
                                    </div>
                                </button>

                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium">{user.username || user.fullName}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-3 text-sm md:text-base text-gray-700 rounded-md hover:bg-gray-100"
                                            onClick={closeAllDropdowns}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                closeAllDropdowns();
                                                navigate('/');
                                            }}
                                            className="block w-full text-left px-4 py-3 text-sm md:text-base text-gray-700 rounded-md hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {isAdmin && (
                            <div className="flex items-center">
                                <lord-icon
                                    src="https://cdn.lordicon.com/knzzcfyy.json"
                                    trigger="loop"
                                    delay="1000"
                                    stroke="bold"
                                    style={{ width: "30px", height: "30px" }}
                                    colors="secondary:#f97316,primary:#999999"
                                />
                                <span className="ml-1 md:ml-2 hidden sm:inline">Admin</span>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}
                                    className="ml-2 md:ml-4 text-sm md:text-base text-gray-700 hover:text-orange-500"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <Link to="/cart" className="flex items-center" onClick={closeAllDropdowns}>
                            <lord-icon
                                src="https://cdn.lordicon.com/ggirntso.json"
                                trigger="loop"
                                delay="1000"
                                stroke="bold"
                                style={{ width: "30px", height: "30px" }}
                                colors="secondary:#999999,primary:#f97316"
                            />
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">
                                {cartCount}
                            </span>
                        </Link>
                    </div>

                    <div className="hidden sm:flex flex-col text-xs md:text-sm font-bold text-gray-800">
                        <span>YOUR CART</span>
                        <span className="text-sm md:text-lg text-[#f97316]">${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className={`bg-orange-500 shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 md:max-h-screen'} overflow-hidden`}>
                <div className="container mx-auto px-4 py-2">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <Link
                            to="/allProduct"
                            className="hover:text-white hover:bg-orange-600 text-lg md:text-xl font-bold rounded-md border px-4 py-2 my-1 md:my-0 shadow-lg"
                            onClick={closeAllDropdowns}
                        >
                            All Product
                        </Link>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 lg:space-x-12 text-white text-sm md:text-[16px] py-2 md:py-0">
                            <Link to="/" className="hover:text-black font-medium" onClick={closeAllDropdowns}>HOME</Link>
                            <Link to="/features" className="hover:text-black font-medium" onClick={closeAllDropdowns}>FEATURES</Link>
                            <Link to="/deals" className="hover:text-black font-medium" onClick={closeAllDropdowns}>DEALS</Link>
                            <Link to="/shop" className="hover:text-black font-medium" onClick={closeAllDropdowns}>SHOP</Link>
                            <Link to="/about" className="hover:text-black font-medium" onClick={closeAllDropdowns}>ABOUT US</Link>
                            <Link to="/contact" className="hover:text-black font-medium" onClick={closeAllDropdowns}>CONTACT US</Link>
                        </div>
                        <div className="text-sm md:text-[15px] font-medium flex items-center justify-center py-2 md:py-0">
                            <lord-icon
                                src="https://cdn.lordicon.com/axewyqun.json"
                                trigger="loop"
                                delay="1000"
                                stroke="bold"
                                colors="primary:#F97316"
                                style={{ width: "40px", height: "40px" }}
                            />
                            <span className="font-bold">+880 1784-672862</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;