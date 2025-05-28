import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (data.success) {
                login(data.user);
                navigate('/');
                Swal.fire({
                    title: 'Success',
                    text: 'Login Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                setError(data.error || 'Invalid credentials');
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid credentials',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setError('Failed to login');
        }
    }; 

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Login</h2>
                {error && <div className="mb-3 md:mb-4 text-red-500 text-sm md:text-base">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 mb-1 text-sm md:text-base">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-orange-500 text-sm md:text-base"
                            required
                        />
                    </div>
                    <div className="mb-4 md:mb-6">
                        <label className="block text-gray-700 mb-1 text-sm md:text-base">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-orange-500 rounded-md text-sm md:text-base"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full border border-orange-500 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 text-sm md:text-base"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-3 md:mt-4 text-center text-sm md:text-base">
                    <p>Don't have an account? <Link to="/signup" className="text-orange-500 font-bold">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;