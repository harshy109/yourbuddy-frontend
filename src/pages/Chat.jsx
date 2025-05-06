import MoodButtons from '../components/MoodButtons';

function Chat() {
  return (
    <>
    <div className="flex-1 overflow-y-auto bg-blue-50 p-4 space-y-2">
  {/* Example Messages */}
  <div className="self-start bg-white text-black p-2 rounded-lg max-w-xs shadow">
    Hello! How can I help you today?
  </div>
  <div className="self-end bg-blue-300 text-white p-2 rounded-lg max-w-xs shadow ml-auto">
    I'm feeling a little down today.
  </div>
</div>

{/* Mood Buttons */}
<div className="bg-white px-4 py-2 border-t">
  <MoodButtons />
</div>
    </>
  );
}

export default Chat;
