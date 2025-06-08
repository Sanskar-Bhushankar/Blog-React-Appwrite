import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Welcome to <span className="text-blue-600">ReactScribe BlogApp</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Share your thoughts, explore new ideas, and connect with readers — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="bg-white border border-gray-300 px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
        <div className="mt-12">
          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="Blog illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
