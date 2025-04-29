import MoodButtons from '../components/MoodButtons';
import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState(null);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user's message
    setMessages([...messages, { text: input, sender: 'user' }]);

    // Clear input
    setInput("");

    // Add chatbot's response (mock response for now)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "I'm here for you! 😊 How are you feeling today?", sender: 'bot' }
      ]);
    }, 1000);
  };

  const handleMoodChange = (newMood) => {
    setMood(newMood);
    // Add mood message to conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `You're feeling ${newMood}! Let's make today great! 😊`, sender: 'bot' }
    ]);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto my-8 bg-white shadow-lg rounded-xl">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Mood Button Section */}
      <div className="flex justify-center p-4 space-x-4">
        <button
          onClick={() => handleMoodChange('happy')}
          className="p-2 bg-yellow-300 rounded-full hover:bg-yellow-400"
        >
          😊
        </button>
        <button
          onClick={() => handleMoodChange('sad')}
          className="p-2 bg-blue-300 rounded-full hover:bg-blue-400"
        >
          😔
        </button>
        <button
          onClick={() => handleMoodChange('neutral')}
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
        >
          😐
        </button>
      </div>

      <div className="flex items-center p-4 space-x-4 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
