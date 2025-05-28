import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-10 text-center">
            <h1 className="text-4xl text-white font-bold mb-6">Welcome, {user?.fullName}</h1>
            <div className="bg-white rounded-lg shadow-lg p-10 text-center ">
                <h2 className="text-2xl font-semibold mb-4 ">Your Account</h2>
                <div className="space-y-2">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Username:</strong> {user?.username}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;