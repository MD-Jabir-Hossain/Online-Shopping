import React from 'react';
import products from '/public/product.json';
import Footer from '../components/Footer';

const Feature = () => {
  const featuredProducts = [
    products.find(p => p.id === 1),
    products.find(p => p.id === 5),
    products.find(p => p.id === 11),
    products.find(p => p.id === 17)
  ].filter(Boolean);

  const features = [
    {
      title: "Premium Quality",
      description: "All our products are crafted with the finest materials for lasting durability.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Free Shipping",
      description: "Enjoy free delivery on all orders over $50 within the continental US.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
        </svg>
      )
    },
    {
      title: "30-Day Returns",
      description: "Not satisfied? Return any item within 30 days for a full refund.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "24/7 Support",
      description: "Our customer service team is always ready to assist you.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const testimonial = [
    {
      quote: "The backpack is incredibly durable and fits all my work essentials perfectly!",
      author: "Ronaldo",
      rating: 5
    },
    {
      quote: "Fast shipping and excellent customer service when I had questions about my order.",
      author: "Miller",
      rating: 4
    },
    {
      quote: "The SSD has dramatically improved my computer's performance. Worth every penny!",
      author: "Arju",
      rating: 5
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Our Store?</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Discover the features that make our products and service stand out from the crowd.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-orange-100 rounded-full mb-4 md:mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Products Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                <div className="h-40 sm:h-48 p-4 flex items-center justify-center bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full w-full"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg md:text-xl font-bold text-orange-600">${product.price}</span>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(product.rating.rate) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm md:text-base transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonial.map((testimonial, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic text-sm md:text-base mb-4">"{testimonial.quote}"</p>
                <p className="font-medium text-sm md:text-base">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Quality?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust our products every day.
          </p>
          <button className="bg-white text-orange-600 font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feature;
