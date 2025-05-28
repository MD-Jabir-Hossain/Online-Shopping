import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        address: '',
        mobileNumber: '',
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                login(data.user);
                navigate('/');
                Swal.fire({
                    title: 'Success',
                    text: 'Signed up successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 mb-20">
            <div className="bg-white rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md mx-2">
                <div className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">Create Account</h2>
                    
                    {error && (
                        <div className="mb-3 p-2 bg-red-100 border border-red-200 text-red-700 text-xs sm:text-sm rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div>
                            <label className="block text-xs sm:text-sm text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <div className="flex-1">
                                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-orange-500"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Mobile</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-orange-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm text-gray-600 mb-1">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="2"
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <div className="flex-1">
                                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-orange-500"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-orange-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm text-gray-600 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-xs sm:text-sm font-medium transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm">
                        <p className="text-gray-600">Already have an account?{' '}
                            <Link to="/login" className="text-orange-500 font-medium hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;