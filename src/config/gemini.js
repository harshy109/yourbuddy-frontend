import {
  GoogleGenerativeAI
} from "@google/generative-ai";
import dotenv from 'dotenv';

const apiKey = process.env.VITE_API_KEY;
if (!apiKey) {
  throw new Error("Missing VITE_GOOGLE_API_KEY environment variable");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.3,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseModalities: [],
  responseMimeType: "text/plain",
};

async function run(prompt) {
  // Check if the prompt contains a language preference
  const isHindi = prompt.includes('Please respond in Hindi');
  
  // Adjusting the chat history based on language
  const initialHistory = isHindi ? [
    {
      role: "user",
      parts: [{ text: "मुझे एक सहायक भावनात्मक मित्र की आवश्यकता है" }],
    },
    {
      role: "model",
      parts: [{ text: "मैं आपके लिए यहां हूं। आप आज कैसा महसूस कर रहे हैं?" }],
    }
  ] : [
    {
      role: "user",
      parts: [{ text: "I need an empathetic, emotionally intelligent friend" }],
    },
    {
      role: "model",
      parts: [{ text: "I'm here to listen. How are you feeling today?" }],
    }
  ];

  // Start chat with appropriate history
  const chatSession = model.startChat({
    generationConfig,
    history: initialHistory,
  });

  // Enhance prompt with guidelines appropriate to the language
  const enhancedPrompt = isHindi
    ? `YourBuddy के रूप में, एक मानसिक स्वास्थ्य सहायता चैटबॉट:
      1. प्रतिक्रिया संक्षिप्त और बातचीत जैसी रखें (2-3 छोटे वाक्य)
      2. सहानुभूतिपूर्ण लेकिन सीधे होएं
      3. केवल विस्तृत मार्गदर्शन प्रदान करें जब उपयोगकर्ता विशेष रूप से विशिष्ट सहायता के लिए पूछे
      4. सरल भाषा का उपयोग करें और क्लिनिकल शब्दों से बचें
      5. अत्यधिक भावनात्मक न हों या अत्यधिक आश्वासन का उपयोग न करें

      उपयोगकर्ता ने यह कहा: ${prompt}`
    : `As YourBuddy, a mental health support chatbot:
      1. Keep responses brief and conversational (1-3 short sentences)
      2. Be empathetic but direct
      3. Only provide detailed guidance when user explicitly asks for specific help
      4. Use simple language and avoid clinical terms
      5. Don't be overly emotional or use excessive reassurance
      6. Keep the language and tone human-like and not a machine-like.

      Here's what the user said: ${prompt}`;

  try {
    const result = await chatSession.sendMessage(enhancedPrompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return isHindi 
      ? "माफ़ करें, मैं अभी आपकी सहायता नहीं कर सकता। कृपया बाद में फिर से प्रयास करें।"
      : "Sorry, I can't help you right now. Please try again later.";
  }
}

export default run;