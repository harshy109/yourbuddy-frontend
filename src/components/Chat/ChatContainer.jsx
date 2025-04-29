import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <Messages />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
