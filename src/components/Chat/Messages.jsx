import React from 'react';

const Messages = () => {
  const demoMessages = [
    { text: "Hey! How are you feeling today?", sender: "bot" },
    { text: "Not great, honestly.", sender: "user" },
    { text: "I’m here for you. Want to talk more about it?", sender: "bot" },
  ];

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {demoMessages.map((msg, i) => (
        <div
          key={i}
          className={`mb-2 max-w-[80%] px-4 py-2 rounded-lg ${
            msg.sender === 'user'
              ? 'bg-blue-200 self-end ml-auto'
              : 'bg-gray-200 self-start'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Messages;
