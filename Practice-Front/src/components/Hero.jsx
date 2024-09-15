import React from "react";
import { Input } from "./ui/input"; // Adjust this path to your component setup
import { Button } from "./ui/button"; // Adjust this path to your component setup
import { Link } from "react-router-dom";
import Category from "./Category";
import Jobs from "./Jobs";

const Hero = () => {
  return (
    <div className="relative bg-gray-100 py-24 mt-1 text-gray-900">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
          Find Your Dream Job
        </h1>
        <p className="text-lg mb-10 text-gray-600">
          Explore thousands of opportunities and take the next step in your career.
        </p>

        {/* Job Search Form */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Input
            type="text"
            className="px-4 py-3 w-full md:w-2/3 lg:w-1/2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Job title, keywords, or company"
          />
          <Button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition-transform duration-300 transform hover:scale-105">
            Search
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <p className="text-md font-medium text-gray-800">
            New here? <Link to='/signup'> <span className="font-bold text-red-500">Join now</span>  </Link>to access exclusive job offers and career advice.
          </p>
          <Link to='/signup'>
          <Button className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-transform duration-300 transform hover:scale-105">
            Sign Up Today
          </Button>
          </Link>
        </div>
      </div>
      <Category/>
      <Jobs/>
    </div>
  );
};

export default Hero;
