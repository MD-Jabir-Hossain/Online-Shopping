import React, { useEffect, useState } from 'react';
import products from '/public/product.json';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Deals = () => {
  const { addToCart } = useCart();

  const discountedProducts = products.map(product => ({
    ...product,
    originalPrice: product.price * (1 + Math.random() * 0.5 + 0.1),
    discount: Math.floor(Math.random() * 41) + 10,
    timeLeft: Math.floor(Math.random() * 24) + 1
  })).filter(product => product.id % 2 === 0);
  const featuredDeal = discountedProducts[0];

  const [timeLeft, setTimeLeft] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 3600000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 py-12 md:py-16 px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">HOT DEALS</h1>
        <p className="text-lg md:text-xl mb-6">Limited-time offers on our best-selling products</p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-white text-orange-600 px-4 py-1 rounded-full font-bold text-sm md:text-base">Today Only</span>
          <span className="bg-white text-orange-600 px-4 py-1 rounded-full font-bold text-sm md:text-base">Up to 50% Off</span>
        </div>
      </div>

      {/* Featured Deal */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-100 flex items-center justify-center">
              <img
                src={featuredDeal.image}
                alt={featuredDeal.title}
                className="object-contain h-48 md:h-64 w-full"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white text-xs md:text-sm font-bold px-2 py-1 rounded mr-2">
                  FEATURED
                </span>
                <span className="text-red-500 font-bold text-sm md:text-base">Limited Stock!</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-2">{featuredDeal.title}</h2>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2 text-sm md:text-base">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(featuredDeal.rating.rate) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-500">({featuredDeal.rating.count} reviews)</span>
              </div>

              <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3">{featuredDeal.description}</p>

              <div className="flex items-center mb-6">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 mr-4">${featuredDeal.price}</span>
                <span className="text-sm md:text-lg text-gray-500 line-through mr-4">${featuredDeal.originalPrice.toFixed(2)}</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs md:text-sm font-bold">
                  Save {featuredDeal.discount}%
                </span>
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-2 text-xs md:text-sm">
                  <span className="font-medium">Offer ends in:</span>
                  <span className="font-bold">
                    {timeLeft > 0 ? `${timeLeft} hours` : "Expired!"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(timeLeft / 24) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => addToCart(featuredDeal)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                Claim This Deal
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* All Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Today's Best Deals</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {discountedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all border border-orange-100">
              <div className="relative">
                <div className="h-36 md:h-48 p-2 flex items-center justify-center bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full w-full"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-semibold mb-2 text-sm md:text-base line-clamp-2">{product.title}</h3>

                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-1 text-xs md:text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating.rate) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500">({product.rating.count})</span>
                </div>

                <div className="flex items-center mb-3">
                  <span className="text-base md:text-lg font-bold text-orange-600 mr-2">${product.price}</span>
                  <span className="text-xs md:text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-[10px] sm:text-xs text-gray-500 mb-3">
                  <span>Ends in {product.timeLeft}h</span>
                  <span>{Math.floor(Math.random() * 20) + 5} sold</span>
                </div>

                <Link to={`/products/${product.id}`}>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 md:py-3 px-3 rounded-lg transition-colors duration-300 text-xs md:text-sm">
                    View Details
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gray-800 text-white py-10 md:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Want More Deals?</h2>
          <p className="mb-6 text-sm md:text-base">Subscribe to get exclusive offers before anyone else</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 md:py-3 rounded text-gray-900 text-sm md:text-base"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 md:py-3 px-6 rounded transition-colors text-sm md:text-base whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Deals;
