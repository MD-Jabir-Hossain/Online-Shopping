import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const slides = [
        {
            id: 1,
            image: '/images/slideimage/slider-electronic-1.png',
            title: 'Mobile Sale',
            subtitle: 'Upgrade Your Tech',
            buttonText: 'Shop Electronics',
            link: '/shop?category=electronics',
        },
        {
            id: 2,
            image: '/images/slideimage/laptop.png',
            title: 'SUMMER FASION',
            subtitle: 'Save up to 50%',
            buttonText: 'Explore Summer Deals',
            link: '/shop?category=summer',
        },
        {
            id: 3,
            image: '/images/slideimage/item-2.jpg',
            title: 'SPECIAL OFFER',
            subtitle: 'UPTO 70% OFF',
            buttonText: 'Grab Deals Now',
            link: '/deals',
        },
        {
            id: 4,
            image: '/images/slideimage/item-3.jpg',
            title: 'Spa Collection',
            subtitle: 'Dead Sea Salt Soak',
            buttonText: 'Shop Beauty',
            link: '/shop?category=beauty',
        },
        {
            id: 5,
            image: '/images/slideimage/pexels-christian-heitz-285904-842711.jpg',
            title: 'SUMMER SALE',
            subtitle: 'Save up to 50%',
            buttonText: 'Explore Summer Deals',
            link: '/shop?category=summer',
        },
        {
            id: 6,
            image: '/images/slideimage/slider-fashion-2-1.png',
            title: 'SUMMER FASION',
            subtitle: 'Save up to 50%',
            buttonText: 'Explore Summer Deals',
            link: '/shop?category=summer',
        },

    ];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(slideInterval);
    }, [slides.length]);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            setScrollPosition((prev) => {
                return prev > window.innerWidth ? -500 : prev + 1;
            });
        }, 20);

        return () => clearInterval(scrollInterval);
    }, []);

    const isMobile = window.innerWidth < 768;

    return (
        <div className="relative w-full h-[50vh] md:h-screen max-h-[650px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="w-full h-full">
                        <img
                            src={isMobile ? slide.mobileImage || slide.image : slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                                console.error(`Failed to load image: ${slide.image}`);
                            }}
                        />
                    </div>

                    <div className="absolute bottom-10 md:bottom-32 left-4 md:left-10 text-white max-w-[90%] md:max-w-[40%]">
                        <h2 className="text-xl md:text-4xl font-bold mb-1 md:mb-2 drop-shadow-lg">
                            {slide.title}
                        </h2>
                        <p className="text-base md:text-2xl mb-3 md:mb-6 drop-shadow-lg">
                            {slide.subtitle}
                        </p>
                        <Link
                            to={slide.link}
                            className="inline-block px-4 py-2 md:px-6 md:py-3 bg-orange-500 text-white text-sm md:text-base font-bold rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            {isMobile ? (slide.buttonText.length > 15 
                                ? slide.buttonText.split(' ')[0] + '...' 
                                : slide.buttonText) 
                            : slide.buttonText}
                        </Link>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-0 left-0 w-full bg-orange-500 py-2 md:py-3 overflow-hidden z-10">
                <div
                    className="whitespace-nowrap text-white font-bold text-sm md:text-xl"
                    style={{ transform: `translateX(${scrollPosition}px)` }}
                >
                    {Array(isMobile ? 3 : 5).fill("50% Off On Selected Items - Summer Sales").join(" • ")}
                </div>
            </div>

            {isMobile && (
                <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeSlider;