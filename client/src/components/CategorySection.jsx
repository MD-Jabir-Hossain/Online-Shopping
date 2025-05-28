import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
    
    const categories = [
        {
            name: 'Electronics',
            image: '/images/categoryimage/elctronics.png',
        },
        {
            name: 'Cloth',
            image: '/images/categoryimage/slider-fashion-2-1.png',
        },
        {
            name: 'Home & Kitchen',
            image: '/images/categoryimage/10-Must-Have-Appliances-for-Easy-Kitchen-Chores.jpg',
        },
        {
            name: 'Beauty',
            image: '/images/categoryimage/cute.jpg',
        },
        {
            name: 'Books',
            image: '/images/categoryimage/books-for-product-managers.jpeg',
        },
        {
            name: 'Sports',
            image: '/images/categoryimage/istockphoto-1188462138-612x612.jpg',
        },
    ];

    return (
        <div className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Categories</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            to={`/shop?category=${category.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                            key={index}
                            className="group flex flex-col items-center"
                        >
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg mb-3">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.jpg';
                                    }}
                                />
                            </div>

                            {/* Category Name */}
                            <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-orange-500 transition-colors">
                                {category.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;