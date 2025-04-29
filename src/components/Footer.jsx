// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-blue-900 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-lg font-semibold">© 2025 YourBuddy. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
