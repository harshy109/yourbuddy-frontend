// src/components/Features.jsx
import React from 'react';
import { MessageCircleHeart, Smile, BrainCircuit, BookText, Sparkles } from 'lucide-react';

const features = [
  { title: "Anonymous Chat", description: "Talk freely without revealing identity.", icon: <MessageCircleHeart className="h-8 w-8 text-blue-600 mb-2" /> },
  { title: "Mood Tracker", description: "Track how you feel and reflect.", icon: <Smile className="h-8 w-8 text-blue-600 mb-2" /> },
  { title: "Guided Meditation", description: "Relax with calm, focused sessions.", icon: <BrainCircuit className="h-8 w-8 text-blue-600 mb-2" /> },
  { title: "Daily Journaling", description: "Express yourself through writing.", icon: <BookText className="h-8 w-8 text-blue-600 mb-2" /> },
  { title: "Personal Tips", description: "AI-based tips for your mental health.", icon: <Sparkles className="h-8 w-8 text-blue-600 mb-2" /> },
];

const Features = () => {
  return (
    <div className="bg-white py-10 px-4 text-blue-800">
      <h2 className="text-3xl font-bold text-center mb-6">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {features.slice(0, 3).map((f, i) => (
          <div key={i} className="bg-blue-100 p-4 rounded-lg shadow hover:scale-105 transition text-center">
            {f.icon}
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.slice(3).map((f, i) => (
          <div key={i} className="bg-blue-100 p-4 rounded-lg shadow hover:scale-105 transition text-center">
            {f.icon}
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
