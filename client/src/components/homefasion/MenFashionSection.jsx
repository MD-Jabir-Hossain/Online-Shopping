import React from 'react';
import products from '/public/product.json';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const MenFashionSection = () => {
    const men = products.filter(product => product.category === "men's clothing");
    const { addToCart } = useCart();
    return (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 border rounded-md mt-8 sm:mt-10">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-xl sm:text-3xl font-bold bg-orange-600 text-white inline-block px-4 sm:px-8 py-2 sm:py-3 rounded-md sm:rounded-lg">
                    MEN FASHION
                </h1>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {men.slice(0, 3).map((product) => (
                    <div key={product.id} className="bg-white rounded-md sm:rounded-lg shadow-sm sm:shadow-md overflow-hidden hover:shadow-md sm:hover:shadow-xl transition-all duration-300 border border-gray-200">
                        <Link to={`/products/${product.id}`}>
                            <div className="h-32 sm:h-64 p-2 sm:p-4 flex items-center justify-center bg-gray-50">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="object-contain h-full w-full"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>
                        </Link>
                        <div className="p-3 sm:p-6">
                            <h2 className="text-sm sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-2">
                                {product.title}
                            </h2>
                            <p className="text-xs sm:text-gray-600 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <span className="text-base sm:text-2xl font-bold text-gray-800">${product.price}</span>
                                <div className="flex items-center">
                                    <div className="flex text-yellow-400 text-xs sm:text-base mr-1 sm:mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i}>
                                                {i < Math.floor(product.rating.rate) ? '★' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-500">({product.rating.count})</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 sm:py-3 px-2 sm:px-4 rounded-md sm:rounded-lg transition-colors duration-300 text-xs sm:text-base"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Product */}
            {men.slice(3, 4).map((product) => (
                <div key={product.id} className="mt-8 sm:mt-16 bg-gray-800 rounded-md sm:rounded-lg p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-center">
                        <div className="lg:w-1/3 w-full">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-32 sm:h-64 object-contain rounded-md sm:rounded-lg bg-white p-2 sm:p-4"
                            />
                        </div>
                        <div className="lg:w-2/3 w-full">
                            <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">{product.title}</h2>
                            <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-6">{product.description}</p>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                                <div>
                                    <span className="text-xl sm:text-3xl font-bold text-white">${product.price}</span>
                                    <div className="flex items-center mt-1 sm:mt-2">
                                        <div className="flex text-yellow-400 text-xs sm:text-base mr-1 sm:mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>
                                                    {i < Math.floor(product.rating.rate) ? '★' : '☆'}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-300">({product.rating.count} reviews)</span>
                                    </div>
                                </div>
                                <Link to={`/products/${product.id}`}>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 sm:py-3 px-3 sm:px-6 rounded-md sm:rounded-lg transition-colors duration-300 whitespace-nowrap text-xs sm:text-base">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenFashionSection;