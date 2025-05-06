import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from '../context/Context';
import Navbar from '../components/Navbar';

const ChatPage = () => {
  const { t } = useTranslation();
  const { onSent, input, setInput, resultData, loading, showResult, recentPrompt } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [mood, setMood] = useState(null);

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
      <div className="flex flex-col w-full max-w-lg mx-auto my-8 bg-white shadow-lg rounded-xl h-[80vh]">
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                }`}
              >
                {message.html ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-300">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mood Button Section */}
        <div className="flex justify-center p-4 space-x-4">
          <button
            onClick={() => handleMoodChange('happy')}
            className="p-2 bg-yellow-300 rounded-full hover:bg-yellow-400"
            aria-label={t('moods.happy')}
          >
            😊
          </button>
          <button
            onClick={() => handleMoodChange('sad')}
            className="p-2 bg-blue-300 rounded-full hover:bg-blue-400"
            aria-label={t('moods.sad')}
          >
            😢
          </button>
          <button
            onClick={() => handleMoodChange('angry')}
            className="p-2 bg-red-300 rounded-full hover:bg-red-400"
            aria-label={t('moods.angry')}
          >
            😡
          </button>
          <button
            onClick={() => handleMoodChange('anxious')}
            className="p-2 bg-purple-300 rounded-full hover:bg-purple-400"
            aria-label={t('moods.anxious')}
          >
            😨
          </button>
          <button
            onClick={() => handleMoodChange('tired')}
            className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
            aria-label={t('moods.tired')}
          >
            😴
          </button>
        </div>

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
