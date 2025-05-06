// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-300 text-white p-4">
      <h1 className="text-4xl text-blue-800 font-bold mb-4">{t('hero.title')}</h1>
      <p className="text-lg mb-6">{t('hero.subtitle')}</p>
      <div className="flex gap-4">
        <Link to="/chat" className="bg-blue-300 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition">
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
