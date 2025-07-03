import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '.'; // Assuming Container is in components/index.js

function Slider({ slides }) {
    // --- IMPORTANT FIX: Move this check to the very top ---
    if (!slides || slides.length === 0) {
        return null; // Don't render anything if no slides provided or if it's empty
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide functionalit
    useEffect(() => {
        // Now, 'slides' is guaranteed to be an array with at least one element here
        // The check 'slides.length <= 1' is now saf e
        if (slides.length <= 1) {
            return; // No auto-slide if 0 or 1 slide
        }
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); 
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [slides.length]); // Re-run effect if number of slides changes

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const currentSlide = slides[currentIndex];

    return (
        <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-xl mb-8">
            {/* Current Slide Content */}
            <Link to={currentSlide.slug} className="block w-full h-full">
                {currentSlide.imageUrl && (
                    <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                    />
                )}
                {/* Overlay for Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <h2 className="text-white text-3xl font-bold drop-shadow-lg">{currentSlide.title}</h2>
                </div>
            </Link>

            {/* Navigation Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                                currentIndex === index ? 'bg-white' : 'bg-gray-400'
                            } transition-colors duration-200`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Previous/Next Buttons */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 hover:bg-opacity-75 transition-opacity duration-200"
                        aria-label="Previous slide"
                    >
                        &#9664;
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 hover:bg-opacity-75 transition-opacity duration-200"
                        aria-label="Next slide"
                    >
                        &#9654;
                    </button>
                </>
            )}
        </div>
    );
}

export default Slider;