// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-300 text-white p-4">
      <h1 className="text-4xl text-blue-800 font-bold mb-4">Welcome to YourBuddy</h1>
      <p className="text-lg mb-6">A friend who listens to you, always.</p>
      <div className="flex gap-4">
        <Link to="/chat" className="bg-blue-300 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition">
          Continue as Guest
        </Link>
        <Link to="/login" className="bg-white text-blue-900 font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Hero;
