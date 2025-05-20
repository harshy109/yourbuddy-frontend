// src/components/FeatureSection.jsx
import React from 'react';

const features = [
  {
    title: "Mood Tracking",
    desc: "Understand your emotional patterns.",
    icon: "💖",
  },
  {
    title: "Multi-lingual Support",
    desc: "Chat in your preferred language - English or Hindi.",
    icon: "🗣️",
  },
  {
    title: "Self-Care Tips",
    desc: "Personalized mental wellness advice.",
    icon: "🧘",
  },
  {
    title: "Anonymous Chat",
    desc: "Talk freely without judgment.",
    icon: "🕵️",
  },
  {
    title: "Login Mode",
    desc: "Save your chats to better understanding by YourBuddy.",
    icon: "📝",
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-blue-100 text-blue-900 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">What YourBuddy Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.slice(0, 3).map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:scale-105 transition">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
        {features.slice(3).map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:scale-105 transition">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
