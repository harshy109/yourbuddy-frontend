// src/components/HighlightSection.jsx
import React from 'react';
// import anonymousImg from '../assets/anonymous_chat.png'; // Replace with actual image path

const HighlightSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col md:flex-row items-center justify-center gap-10">
      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-300">
        {/* <img src= alt="Anonymous Chat" className="w-full h-full object-cover" /> */}
      </div>
      <div className="max-w-md text-blue-900">
        <h2 className="text-2xl font-bold mb-2">Chat Anonymously</h2>
        <p>Start open, honest conversations without revealing your identity. Your privacy matters.</p>
      </div>
    </div>
  );
};

export default HighlightSection;
