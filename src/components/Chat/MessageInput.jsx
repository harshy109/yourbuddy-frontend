import React, { useState } from 'react';

const MessageInput = () => {
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (!text.trim()) return;
    console.log('Send:', text);
    setText('');
  };

  return (
    <div className="flex border-t p-3 bg-gray-50">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-full outline-none"
      />
      <button
        onClick={sendMessage}
        className="ml-2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
