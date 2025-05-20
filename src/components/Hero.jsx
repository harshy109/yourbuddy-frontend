// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Hero.css'; // Assuming you have a CSS file for styles
import heroBg from '../assets/hero_bg.png'; // Import the image directly

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <div 
      className="hero-container flex flex-col items-center justify-center min-h-screen text-white p-4"
      style={{ backgroundImage: `url(${heroBg})` }} // Use the imported image
    >
      <h1 className="text-6xl text-blue-800 font-bold mb-4">{t('hero.title')}</h1>
      <p className="text-2xl font-bold mb-6">{t('hero.subtitle')}</p>
      <div className="flex gap-4">
        <Link to="/chat" className="bg-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition">
          {t('hero.guest')}
        </Link>
        <Link to="/login" className="bg-white text-blue-900 font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition">
          {t('hero.login')}
        </Link>
      </div>
    </div>
  );
};

export default Hero;
