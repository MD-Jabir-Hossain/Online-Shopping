import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError('No products found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <Link
          to="/"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold text-center mb-12 bg-gradient-to-r from-orange-500 to-red-600 py-12 rounded-md">
        Our Products
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No products available</h2>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
      <Link to={`/products/${product._id}`}>
        <div className="h-48 sm:h-56 md:h-64 p-2 sm:p-4 flex items-center justify-center bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-full w-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
            }}
          />
        </div>
      </Link>

      <div className="p-3 sm:p-4 md:p-6">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-base sm:text-lg md:text-2xl font-bold text-gray-800">
            ${product.price}
          </span>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2 text-xs sm:text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating?.rate || 0) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.rating?.count || 0})</span>
          </div>
        </div>

        <button
          onClick={() => addToCart({
            ...product,
            id: product._id, // Ensure consistent ID field
            quantity: 1
          })}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 sm:py-3 px-4 rounded-lg text-xs sm:text-sm md:text-base transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Shop;
