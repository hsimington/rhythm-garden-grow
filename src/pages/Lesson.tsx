
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Headphones, SlidersHorizontal, Equal, Volume } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TooltipMessage from '@/components/TooltipMessage';
import TrackControl from '@/components/TrackControl';
import DAWControl from '@/components/DAWControl';

// Define our lesson content
const LESSONS = {
  compressor: {
    title: 'Using Compressors',
    steps: [
      {
        text: "Welcome to the Compressor lesson! A compressor reduces the dynamic range of audio signals.",
        position: 'center',
      },
      {
        text: "The compressor helps control volume peaks and makes your audio sound more consistent.",
        position: 'center',
      },
      {
        text: "Try adjusting the threshold to determine at which volume level compression begins.",
        position: 'right',
        targetId: 'threshold'
      },
      {
        text: "Now try the ratio control, which determines how much compression is applied.",
        position: 'right',
        targetId: 'ratio'
      },
      {
        text: "Great job! You've learned the basics of compression. Let's complete the lesson.",
        position: 'center',
      }
    ]
  },
  eq: {
    title: 'Understanding EQ',
    steps: [
      {
        text: "Welcome to the Equalizer lesson! EQ lets you boost or cut specific frequencies.",
        position: 'center',
      },
      {
        text: "EQ is like a volume control for different frequency ranges in your audio.",
        position: 'center',
      },
      {
        text: "Try adjusting the low frequency band to control bass sounds.",
        position: 'bottom',
        targetId: 'eq-low'
      },
      {
        text: "Now try the mid frequency band to shape the body of your sound.",
        position: 'bottom',
        targetId: 'eq-mid'
      },
      {
        text: "Finally, adjust the high frequency band to control brightness and clarity.",
        position: 'bottom',
        targetId: 'eq-high'
      },
      {
        text: "Great job! You've learned how to shape your sound with EQ.",
        position: 'center',
      }
    ]
  },
  volume: {
    title: 'Volume Control',
    steps: [
      {
        text: "Welcome to the Volume Control lesson! Volume is fundamental to mixing.",
        position: 'center',
      },
      {
        text: "Let's learn how to balance different tracks using volume controls.",
        position: 'center',
      },
      {
        text: "Try adjusting the volume of the vocal track.",
        position: 'right',
        targetId: 'vocal-volume'
      },
      {
        text: "Now try the volume of the guitar track.",
        position: 'right',
        targetId: 'guitar-volume'
      },
      {
        text: "Balance is key in mixing. Good volume management creates a clear soundscape.",
        position: 'center',
      }
    ]
  }
};

const Lesson = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [lessonComplete, setLessonComplete] = useState(false);

  // Get lesson content
  const lesson = toolId && LESSONS[toolId as keyof typeof LESSONS];

  // Values for compressor controls
  const [threshold, setThreshold] = useState([-24]);
  const [ratio, setRatio] = useState([4]);
  
  // Values for EQ controls
  const [eqLow, setEqLow] = useState([0]);
  const [eqMid, setEqMid] = useState([0]);
  const [eqHigh, setEqHigh] = useState([0]);

  // Handle next step in lesson
  const handleContinue = () => {
    if (!lesson) return;
    
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLessonComplete(true);
      setShowTooltip(false);
    }
  };

  // Handle lesson completion
  const handleComplete = () => {
    // Navigate back to home with achievement
    navigate(`/?achievement=${toolId}`);
  };

  // Skip lesson
  const handleSkip = () => {
    navigate('/');
  };

  // Get current tooltip position
  const getCurrentPosition = () => {
    if (!lesson) return 'center';
    return lesson.steps[currentStep].position;
  };

  // Render tool-specific controls
  const renderToolControls = () => {
    if (!toolId) return null;

    switch(toolId) {
      case 'compressor':
        return (
          <div className="bg-beatsage-dark-gray bg-opacity-20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <SlidersHorizontal size={20} />
              <span>Compressor</span>
            </h3>
            
            <div className="space-y-6">
              <div id="threshold" className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm">Threshold</label>
                  <span className="text-sm">{threshold[0]} dB</span>
                </div>
                <input 
                  type="range" 
                  min="-60" 
                  max="0" 
                  step="1"
                  value={threshold[0]}
                  onChange={(e) => setThreshold([parseFloat(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              <div id="ratio" className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm">Ratio</label>
                  <span className="text-sm">{ratio[0]}:1</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="0.5"
                  value={ratio[0]}
                  onChange={(e) => setRatio([parseFloat(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              <div className="p-3 bg-beatsage-dark-purple bg-opacity-10 rounded-lg">
                <p className="text-xs">
                  Signal reduction: {Math.min(0, (threshold[0] + 10) * ratio[0] / 10).toFixed(1)} dB
                </p>
                <div className="h-4 mt-2 bg-gray-200 rounded overflow-hidden">
                  <div 
                    className="h-full bg-beatsage-purple" 
                    style={{ width: `${100 - Math.abs(Math.min(0, (threshold[0] + 10) * ratio[0] / 10) * 2)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'eq':
        return (
          <div className="bg-beatsage-dark-gray bg-opacity-20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Equal size={20} />
              <span>Equalizer</span>
            </h3>
            
            <div className="flex gap-4 justify-between items-end h-40 mb-4">
              <div id="eq-low" className="flex flex-col items-center flex-1">
                <span className="text-xs mb-2">{eqLow[0] > 0 ? '+' : ''}{eqLow[0]} dB</span>
                <div className="w-full flex justify-center">
                  <div className="h-32 w-8 bg-gray-200 rounded-t-lg relative">
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="1"
                      value={eqLow[0]}
                      onChange={(e) => setEqLow([parseFloat(e.target.value)])}
                      className="absolute -rotate-90 w-32 top-16 -left-12"
                    />
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-lg ${eqLow[0] > 0 ? 'bg-beatsage-purple' : 'bg-beatsage-red'}`}
                      style={{ 
                        height: `${Math.abs(eqLow[0]) / 12 * 100}%`, 
                        transform: eqLow[0] < 0 ? 'translateY(100%)' : 'none',
                        bottom: eqLow[0] < 0 ? '50%' : '0'
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs mt-1">Low</span>
              </div>
              
              <div id="eq-mid" className="flex flex-col items-center flex-1">
                <span className="text-xs mb-2">{eqMid[0] > 0 ? '+' : ''}{eqMid[0]} dB</span>
                <div className="w-full flex justify-center">
                  <div className="h-32 w-8 bg-gray-200 rounded-t-lg relative">
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="1"
                      value={eqMid[0]}
                      onChange={(e) => setEqMid([parseFloat(e.target.value)])}
                      className="absolute -rotate-90 w-32 top-16 -left-12"
                    />
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-lg ${eqMid[0] > 0 ? 'bg-beatsage-purple' : 'bg-beatsage-red'}`}
                      style={{ 
                        height: `${Math.abs(eqMid[0]) / 12 * 100}%`, 
                        transform: eqMid[0] < 0 ? 'translateY(100%)' : 'none',
                        bottom: eqMid[0] < 0 ? '50%' : '0'
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs mt-1">Mid</span>
              </div>
              
              <div id="eq-high" className="flex flex-col items-center flex-1">
                <span className="text-xs mb-2">{eqHigh[0] > 0 ? '+' : ''}{eqHigh[0]} dB</span>
                <div className="w-full flex justify-center">
                  <div className="h-32 w-8 bg-gray-200 rounded-t-lg relative">
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="1"
                      value={eqHigh[0]}
                      onChange={(e) => setEqHigh([parseFloat(e.target.value)])}
                      className="absolute -rotate-90 w-32 top-16 -left-12"
                    />
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-lg ${eqHigh[0] > 0 ? 'bg-beatsage-purple' : 'bg-beatsage-red'}`}
                      style={{ 
                        height: `${Math.abs(eqHigh[0]) / 12 * 100}%`, 
                        transform: eqHigh[0] < 0 ? 'translateY(100%)' : 'none',
                        bottom: eqHigh[0] < 0 ? '50%' : '0'
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs mt-1">High</span>
              </div>
            </div>
            
            <div className="h-6 bg-beatsage-dark-purple bg-opacity-20 rounded mt-3 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs">EQ Response Curve</span>
              </div>
              {/* This would be where the actual EQ curve visualization would go */}
              <svg width="100%" height="100%" preserveAspectRatio="none" className="opacity-70">
                <path 
                  d={`M0,${30 - eqLow[0]} C${33},${30 - eqLow[0] * 0.8} ${66},${30 - eqMid[0] * 0.8} 100%,${30 - eqHigh[0]}`} 
                  stroke="rgb(155, 135, 245)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        );
      
      case 'volume':
        return (
          <div className="bg-beatsage-dark-gray bg-opacity-20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Volume size={20} />
              <span>Volume Controls</span>
            </h3>
            
            <div className="space-y-3">
              <div id="vocal-volume" className="relative">
                <TrackControl 
                  name="Vocals" 
                  type="vocal"
                  color="#f43f5e" 
                  isUnlocked={true}
                />
              </div>
              
              <div id="guitar-volume" className="relative">
                <TrackControl 
                  name="Guitar" 
                  type="guitar"
                  color="#3b82f6" 
                  isUnlocked={true}
                />
              </div>
              
              <TrackControl 
                name="Piano" 
                type="piano"
                color="#8b5cf6" 
                isUnlocked={false}
              />
              
              <TrackControl 
                name="Drums" 
                type="drum"
                color="#f59e0b" 
                isUnlocked={false}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!lesson) {
    // Handle invalid tool ID
    return (
      <div className="min-h-screen bg-beatsage-dark-bg text-white flex flex-col">
        <header className="bg-beatsage-dark-purple p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">Lesson Not Found</h1>
          </div>
        </header>
        <div className="container mx-auto flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="mb-4">Sorry, we couldn't find that lesson.</p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beatsage-dark-bg text-white flex flex-col">
      {/* DAW Header */}
      <header className="bg-beatsage-dark-purple p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Headphones size={24} />
            <h1 className="text-xl font-bold">{lesson.title}</h1>
          </div>
          <div>
            <Button 
              variant="ghost" 
              onClick={handleSkip}
            >
              Exit Lesson
            </Button>
          </div>
        </div>
      </header>

      {/* DAW Interface */}
      <main className="container mx-auto flex-1 p-4">
        {/* Transport controls */}
        <DAWControl className="mb-4" />
        
        {/* Main DAW content area */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Track list */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium mb-2">Tracks</h2>
            <TrackControl name="Vocals" type="vocal" color="#f43f5e" isUnlocked={true} />
            <TrackControl name="Guitar" type="guitar" color="#3b82f6" isUnlocked={true} />
            <TrackControl name="Piano" type="piano" color="#8b5cf6" isUnlocked={false} />
            <TrackControl name="Drums" type="drum" color="#f59e0b" isUnlocked={false} />
          </div>
          
          {/* Tool controls - this changes based on the lesson */}
          <div>
            <h2 className="text-lg font-medium mb-2">Tool Controls</h2>
            {renderToolControls()}
          </div>
        </div>
        
        {/* Lesson completion button */}
        {lessonComplete && (
          <div className="mt-8 text-center">
            <Button 
              onClick={handleComplete}
              className="bg-beatsage-purple hover:bg-beatsage-dark-purple px-8"
            >
              Complete Lesson
            </Button>
          </div>
        )}

        {/* Current tool tip */}
        {showTooltip && lesson.steps[currentStep] && (
          <div className="relative">
            <TooltipMessage 
              message={lesson.steps[currentStep].text}
              position={getCurrentPosition()}
              onContinue={handleContinue}
              onClose={handleSkip}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Lesson;
