import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();

            if (data.success) {
                login({ ...data.user, isAdmin: true });
                navigate('/admin');
                Swal.fire({
                    title: 'Success',
                    text: 'Admin login successful',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                setError(data.error || 'Invalid admin credentials');
                Swal.fire({
                    title: 'Error!',
                    text: data.error || 'Invalid admin credentials',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch  {
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-orange-500">Admin Login</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1 text-sm md:text-base">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                            required
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1 text-sm md:text-base">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 text-sm md:text-base"
                    >
                        Login as Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;