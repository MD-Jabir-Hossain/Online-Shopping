import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await response.json();
                if (data.success) {
                    setProduct(data.data);
                } else {
                    setError('Product not found');
                    navigate('/shop');
                }
            } catch (error) {
                setError('Failed to fetch product');
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [id, navigate]);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > 10) return; 
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        addToCart({ 
            ...product, 
            id: product._id,
            quantity,
            totalPrice: product.price * quantity
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
                <button 
                    onClick={() => navigate('/shop')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-orange-500 hover:text-orange-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Products
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="h-96 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-full max-w-full object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
                                }}
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product.title}</h1>
                        <p className="text-gray-500 mb-4 capitalize text-sm md:text-base">{product.category}</p>

                        <div className="flex items-center mb-6">
                            <span className="text-3xl md:text-4xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="ml-3 text-lg md:text-xl text-gray-400 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                            {product.discount && (
                                <span className="ml-3 bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-bold">
                                    Save {product.discount}%
                                </span>
                            )}
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                                        {i < Math.floor(product.rating?.rate || 0) ? '★' : '☆'}
                                    </span>
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm md:text-base">
                                ({product.rating?.count || 0} reviews)
                            </span>
                        </div>

                        <p className="text-gray-700 mb-8 text-sm md:text-base">{product.description}</p>

                        <div className="flex items-center space-x-4 mb-8">
                            <div className="flex items-center border rounded-md">
                                <button 
                                    className="px-4 py-2 text-xl hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2">{quantity}</span>
                                <button 
                                    className="px-4 py-2 text-xl hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-sm md:text-base"
                            >
                                Add to Cart (${(product.price * quantity).toFixed(2)})
                            </button>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                            <ul className="space-y-2">
                                <li className="flex">
                                    <span className="text-gray-600 w-32 text-sm md:text-base">Category:</span>
                                    <span className="text-gray-800 capitalize text-sm md:text-base">{product.category}</span>
                                </li>
                                <li className="flex">
                                    <span className="text-gray-600 w-32 text-sm md:text-base">Rating:</span>
                                    <span className="text-gray-800 text-sm md:text-base">
                                        {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
                                    </span>
                                </li>
                                <li className="flex">
                                    <span className="text-gray-600 w-32 text-sm md:text-base">Availability:</span>
                                    <span className="text-gray-800 text-sm md:text-base">In Stock</span>
                                </li>
                                {product.timeLeft && (
                                    <li className="flex">
                                        <span className="text-gray-600 w-32 text-sm md:text-base">Deal Ends In:</span>
                                        <span className="text-gray-800 text-sm md:text-base">{product.timeLeft} hours</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Products Section  */}
                {/* <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div> */}
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
