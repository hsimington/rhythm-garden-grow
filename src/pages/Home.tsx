import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Headphones, Guitar, Drum, Piano, Volume, SlidersHorizontal, Equal } from 'lucide-react';
import ToolButton from '@/components/ToolButton';
import LevelCard from '@/components/LevelCard';
import AchievementPopup from '@/components/AchievementPopup';

// Define our course structure
const COURSES = [
  {
    id: 'basics',
    title: 'Level 1: Basics',
    description: 'Learn the fundamentals of music production',
    tools: [
      { id: 'track', name: 'Add Tracks', color: '#3b82f6', icon: <Headphones className="text-white" size={24} />, unlocked: true },
      { id: 'volume', name: 'Volume Control', color: '#0ea5e9', icon: <Volume className="text-white" size={24} />, unlocked: true }
    ]
  },
  {
    id: 'intermediate',
    title: 'Level 2: Audio Processing',
    description: 'Master essential audio effects and tools',
    tools: [
      { id: 'compressor', name: 'Compressor', color: '#8b5cf6', icon: <SlidersHorizontal className="text-white" size={24} />, unlocked: false },
      { id: 'eq', name: 'Equalizer', color: '#6366f1', icon: <Equal className="text-white" size={24} />, unlocked: false }
    ]
  },
  {
    id: 'advanced',
    title: 'Level 3: Instruments',
    description: 'Learn to work with different instruments',
    tools: [
      { id: 'guitar', name: 'Guitar Recording', color: '#ec4899', icon: <Guitar className="text-white" size={24} />, unlocked: false },
      { id: 'piano', name: 'Piano MIDI', color: '#f43f5e', icon: <Piano className="text-white" size={24} />, unlocked: false },
      { id: 'drums', name: 'Drum Programming', color: '#f59e0b', icon: <Drum className="text-white" size={24} />, unlocked: false }
    ]
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({
    track: true,
    volume: true
  });
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  useEffect(() => {
    // Check if we need to show an achievement notification
    const achievementParam = new URLSearchParams(window.location.search).get('achievement');
    if (achievementParam) {
      setShowAchievement(achievementParam);
      // Update user progress
      setUserProgress(prev => ({
        ...prev,
        [achievementParam]: true
      }));
      // Clear the URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleToolClick = (toolId: string) => {
    if (userProgress[toolId]) {
      // If already unlocked, navigate to the playground with this tool selected
      navigate(`/playground?tool=${toolId}`);
    } else {
      // Otherwise, navigate to the lesson
      navigate(`/lesson/${toolId}`);
    }
  };

  const navigateToPlayground = () => {
    navigate('/playground');
  };

  const getAchievementDetails = () => {
    switch (showAchievement) {
      case 'compressor':
        return {
          title: 'Congratulations!',
          description: "You've successfully unlocked COMPRESSOR"
        };
      case 'eq':
        return {
          title: 'Well Done!',
          description: "You've mastered and unlocked EQUALIZER"
        };
      default:
        return {
          title: 'Achievement Unlocked!',
          description: "You've learned a new skill"
        };
    }
  };

  return (
    <div className="min-h-screen bg-beatsage-light-purple">
      {/* Header with logo and playground button */}
      <header className="bg-beatsage-purple py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Headphones size={28} className="text-white" />
          <h1 className="text-2xl font-bold text-white">BeatSage</h1>
        </div>
        <button 
          onClick={navigateToPlayground}
          className="bg-beatsage-blue rounded-full p-2 hover:bg-opacity-80 transition-all"
          aria-label="Go to playground"
        >
          <Book className="text-white" size={20} />
        </button>
      </header>

      {/* Main content */}
      <main className="container max-w-3xl mx-auto py-8 px-4">
        {/* Course levels */}
        <div className="space-y-8">
          {COURSES.map((course) => (
            <div key={course.id} className="space-y-4">
              <LevelCard 
                title={course.title}
                description={course.description}
              />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pl-4">
                {course.tools.map((tool) => {
                  const isUnlocked = userProgress[tool.id] || false;
                  return (
                    <div key={tool.id} className="flex flex-col items-center gap-2">
                      <ToolButton 
                        bgColor={tool.color} 
                        onClick={() => handleToolClick(tool.id)}
                        className={isUnlocked ? "" : "opacity-70"}
                      >
                        {tool.icon}
                      </ToolButton>
                      <span className="text-xs font-medium">
                        {tool.name}
                        {!isUnlocked && ' 🔒'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Achievement popup */}
      {showAchievement && (
        <AchievementPopup
          {...getAchievementDetails()}
          onClose={() => setShowAchievement(null)}
        />
      )}
    </div>
  );
};

export default Home;
