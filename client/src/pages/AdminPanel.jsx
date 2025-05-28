import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        category: 'electronics'
    });
    const [editingId, setEditingId] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'products') fetchProducts();
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'orders') fetchOrders();
        if (activeTab === 'contacts') fetchContacts();
    }, [activeTab]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data.success ? data.data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            showError('Failed to load products');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data.success ? data.data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            showError('Failed to load users');
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();
            setOrders(data.success ? data.data : []);
        } catch (error) {
            console.error('Error fetching orders:', error);
            showError('Failed to load orders');
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/contacts');
            const data = await response.json();
            setContacts(Array.isArray(data) ? data : data.success ? data.data : []);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            showError('Failed to load contacts');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId
                ? `http://localhost:5000/api/products/${editingId}`
                : 'http://localhost:5000/api/products';

            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                showSuccess(editingId ? 'Product updated successfully' : 'Product added successfully');
                fetchProducts();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving product:', error);
            showError('Failed to save product');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            image: '',
            category: 'electronics'
        });
        setEditingId(null);
    };

    const handleEdit = (product) => {
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category
        });
        setEditingId(product._id);
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();

                if (data.success) {
                    showSuccess('Product deleted successfully');
                    fetchProducts();
                }
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            showError('Failed to delete product');
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
    
            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                    method: 'DELETE'
                });
    
                const data = await response.json();
    
                if (data.success) {
                    showSuccess('Order deleted successfully');
                    fetchOrders();
                } else {
                    throw new Error(data.error || 'Failed to delete order');
                }
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            showError(error.message || 'Failed to delete order');
        }
    };

    // Helper functions for notifications
    const showSuccess = (message) => {
        Swal.fire({
            title: 'Success',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    const showError = (message) => {
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    };

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
        }
    }, [user, navigate]);
    
    if (!user || !user.isAdmin) {
        return null; 
    }

    return (
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">
            {/* Mobile Header */}
            <div className="sm:hidden flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 hover:text-gray-800"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800">Admin</h1>
                <button
                    onClick={() => {
                        logout();
                        navigate('/admin/login');
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Desktop Header */}
            <div className="hidden sm:flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <button
                    onClick={() => {
                        logout();
                        navigate('/admin/login');
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm sm:text-base transition duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="sm:hidden mb-4 bg-white rounded-lg shadow overflow-hidden">
                    <button
                        className={`block w-full text-left py-3 px-4 text-sm ${activeTab === 'products' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => {
                            setActiveTab('products');
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Products
                    </button>
                    <button
                        className={`block w-full text-left py-3 px-4 text-sm ${activeTab === 'users' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => {
                            setActiveTab('users');
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Users
                    </button>
                    <button
                        className={`block w-full text-left py-3 px-4 text-sm ${activeTab === 'orders' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => {
                            setActiveTab('orders');
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Orders
                    </button>
                    <button
                        className={`block w-full text-left py-3 px-4 text-sm ${activeTab === 'contacts' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => {
                            setActiveTab('contacts');
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Contacts
                    </button>
                </div>
            )}

            {/* Desktop Navigation Tabs */}
            <div className="hidden sm:flex mb-4 sm:mb-6 bg-white rounded-lg shadow overflow-hidden">
                <button
                    className={`py-2 sm:py-3 px-3 sm:px-6 font-medium text-sm sm:text-base ${activeTab === 'products' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                <button
                    className={`py-2 sm:py-3 px-3 sm:px-6 font-medium text-sm sm:text-base ${activeTab === 'users' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button
                    className={`py-2 sm:py-3 px-3 sm:px-6 font-medium text-sm sm:text-base ${activeTab === 'orders' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button
                    className={`py-2 sm:py-3 px-3 sm:px-6 font-medium text-sm sm:text-base ${activeTab === 'contacts' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('contacts')}
                >
                    Contacts
                </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Product Form */}
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                            {editingId ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
                                    required
                                />
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
                                    required
                                />
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
                                    required
                                />
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm sm:text-base"
                                    required
                                >
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="home">Home & Kitchen</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="sports">Sports</option>
                                </select>
                            </div>
                            <div className="flex space-x-2 sm:space-x-4">
                                <button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-md text-sm sm:text-base transition duration-300"
                                >
                                    {editingId ? 'Update' : 'Add'} Product
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="bg-gray-500 hover:bg-gray-600 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-md text-sm sm:text-base transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Product List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4">Product List</h2>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Title</th>
                                            <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Price</th>
                                            <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden sm:table-cell">Category</th>
                                            <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id} className="border-t hover:bg-gray-50">
                                                <td className="px-2 sm:px-4 py-2 text-sm sm:text-base">{product.title}</td>
                                                <td className="px-2 sm:px-4 py-2 text-sm sm:text-base">${product.price}</td>
                                                <td className="px-2 sm:px-4 py-2 text-sm sm:text-base hidden sm:table-cell capitalize">{product.category}</td>
                                                <td className="px-2 sm:px-4 py-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-blue-500 hover:text-blue-700 mr-2 sm:mr-3 text-sm sm:text-base"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-lg sm:text-xl font-bold p-3 sm:p-4">User List</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Username</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden sm:table-cell">Full Name</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden sm:table-cell">Password</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Email</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden md:table-cell">Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base">{user.username}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base hidden sm:table-cell">{user.fullName}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base hidden sm:table-cell">{user.password}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base">{user.email}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base hidden md:table-cell">{user.mobileNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-lg sm:text-xl font-bold p-3 sm:p-4">Order List</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Order ID</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden sm:table-cell">Customer</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Total</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden md:table-cell">Date</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="border-t hover:bg-gray-50">
                                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{order._id.substring(0, 8)}...</td>
                                        <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">{order.customerInfo?.fullName}</p>
                                                <p className="text-xs sm:text-sm text-gray-500 hidden md:block">{order.customerInfo?.address}</p>
                                                <p className="text-xs sm:text-sm text-gray-500">{order.customerInfo?.phoneNumber}</p>
                                            </div>
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 font-bold text-sm sm:text-base">${order.totalAmount}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="px-2 sm:px-4 py-2">
                                            <button
                                                onClick={() => handleDeleteOrder(order._id)}
                                                className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-lg sm:text-xl font-bold p-3 sm:p-4">Contact Messages</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Name</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base">Email</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden sm:table-cell">Subject</th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-sm sm:text-base hidden md:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(contact => (
                                    <tr key={contact._id} className="border-t hover:bg-gray-50">
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base">{contact.name}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base">{contact.email}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base hidden sm:table-cell">{contact.subject}</td>
                                        <td className="px-2 sm:px-4 py-2 text-sm sm:text-base hidden md:table-cell">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;