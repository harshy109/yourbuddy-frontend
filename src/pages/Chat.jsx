import MoodButtons from '../components/MoodButtons';

function Chat() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">YourBuddy Chat 💬</h1>
      <MoodButtons />
      {/* Chat window will be added next */}
    </div>
  );
}

export default Chat;
