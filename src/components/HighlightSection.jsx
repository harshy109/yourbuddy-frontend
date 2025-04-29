// src/components/ChatHighlightSection.jsx
import React from 'react';

const HighlightSection = () => {
  return (
    <div className="bg-white py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-12 text-blue-900">
      {/* Left Circle */}
      <div className="w-64 h-64 bg-blue-200 rounded-full flex items-center justify-center shadow-xl text-6xl">
        🕊️
      </div>

      {/* Right Description */}
      <div className="max-w-md text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Chat Anonymously</h2>
        <p className="text-lg mb-4">
          Sometimes all we need is someone to listen. YourBuddy allows you to express yourself freely,
          without revealing your identity.
        </p>
        <a href="/chat" className="inline-block bg-blue-300 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition">
          Try Anonymous Chat
        </a>
      </div>
    </div>
  );
};

export default HighlightSection;
