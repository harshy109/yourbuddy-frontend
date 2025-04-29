function MoodButtons() {
    const moods = ['😊 Happy', '😢 Sad', '😡 Angry', '😨 Anxious', '😴 Tired'];
  
    return (
      <div className="flex flex-wrap gap-3 mb-4">
        {moods.map((mood) => (
          <button
            key={mood}
            className="px-4 py-2 rounded-full bg-white shadow hover:bg-purple-100"
          >
            {mood}
          </button>
        ))}
      </div>
    );
  }
  
  export default MoodButtons;
  