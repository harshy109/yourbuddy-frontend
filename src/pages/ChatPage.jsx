import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from '../context/Context';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets.js'; // Correct import path
import { FaUser, FaRobot } from 'react-icons/fa'; // Keep as fallback
import './ChatPage.css';

const ChatPage = () => {
  const { t } = useTranslation();
  const { onSent, input, setInput, resultData, loading, showResult } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [mood, setMood] = useState(null);
  const [showMoodButtons, setShowMoodButtons] = useState(true);

  // Initialize with a greeting when component mounts
  useEffect(() => {
    setMessages([
      { text: t('chat.botGreeting'), sender: 'bot' }
    ]);
  }, [t]);

  // Update messages when resultData changes
  useEffect(() => {
    if (resultData && showResult) {
      setMessages(prev => [...prev, { text: resultData, sender: 'bot', html: true }]);
    }
  }, [resultData, showResult]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user's message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    
    // Send to Gemini via context
    onSent();
    
    // Hide mood buttons after first message is sent
    setShowMoodButtons(false);
  };

  const handleMoodChange = (moodKey) => {
    setMood(moodKey);
    
    // Get translated mood text
    const translatedMood = t(`moods.${moodKey}`);
    
    // Add mood message to conversation using translation key
    setMessages(prev => [
      ...prev,
      { text: t('chat.moodResponse', { mood: translatedMood }), sender: 'bot' }
    ]);
      };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full max-w-[80%] mx-auto my-8 bg-white h-[80vh]">
        {/* Mood Buttons at the top initially */}
        {showMoodButtons && (
          <div className="flex flex-wrap justify-center gap-3 p-4 border-b border-gray-200">
            <button
              onClick={() => handleMoodChange('happy')}
              className="px-4 py-2 rounded-full bg-white shadow hover:bg-purple-100"
              aria-label={t('moods.happy')}
            >
              😊 {t('moods.happy').replace('😊 ', '')}
            </button>
            <button
              onClick={() => handleMoodChange('sad')}
              className="px-4 py-2 rounded-full bg-white shadow hover:bg-purple-100"
              aria-label={t('moods.sad')}
            >
              😢 {t('moods.sad').replace('😢 ', '')}
            </button>
            <button
              onClick={() => handleMoodChange('angry')}
              className="px-4 py-2 rounded-full bg-white shadow hover:bg-purple-100"
              aria-label={t('moods.angry')}
            >
              😡 {t('moods.angry').replace('😡 ', '')}
            </button>
            <button
              onClick={() => handleMoodChange('anxious')}
              className="px-4 py-2 rounded-full bg-white shadow hover:bg-purple-100"
              aria-label={t('moods.anxious')}
            >
              😨 {t('moods.anxious').replace('😨 ', '')}
            </button>
            <button
              onClick={() => handleMoodChange('tired')}
              className="px-4 py-2 rounded-full bg-white shadow hover:bg-purple-100"
              aria-label={t('moods.tired')}
            >
              😴 {t('moods.tired').replace('😴 ', '')}
            </button>
          </div>
        )}
        
        {/* Chat messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {/* Bot icon (only shown for bot messages and on the left) */}
              {message.sender === 'bot' && (
                <div className="message-avatar bot-avatar flex-shrink-0 mr-2">
                  {assets.app_icon ? (
                    <img src={assets.app_icon} alt="YourBuddy" className="w-full h-full rounded-full" />
                  ) : (
                    <FaRobot size={18} />
                  )}
                </div>
              )}
              
              <div 
                className={`max-w-lg px-4 py-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                }`}
              >
                {message.html ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                ) : (
                  message.text
                )}
              </div>
              
              {/* User icon (only shown for user messages and on the right) */}
              {message.sender === 'user' && (
                <div className="message-avatar user-avatar flex-shrink-0 ml-2">
                  {assets.user_icon ? (
                    <img src={assets.user_icon} alt="User" className="w-full h-full rounded-full" />
                  ) : (
                    <FaUser size={18} />
                  )}
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start items-start">
              <div className="message-avatar bot-avatar flex-shrink-0 mr-2">
                {assets.app_icon ? (
                  <img src={assets.app_icon} alt="YourBuddy" className="w-full h-full rounded-full" />
                ) : (
                  <FaRobot size={18} />
                )}
              </div>
              <div className="max-w-lg px-4 py-2 rounded-lg bg-gray-300">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input section */}
        <div className="flex items-center p-4 space-x-4 border-t border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('chat.placeholder')}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {t('chat.send')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
