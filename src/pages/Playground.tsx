
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Headphones, Home, SlidersHorizontal, Equal, Volume } from 'lucide-react';
import DAWControl from '@/components/DAWControl';
import TrackControl from '@/components/TrackControl';

const Playground = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [unlockedTools, setUnlockedTools] = useState<string[]>(['track', 'volume']);
  const [activeTab, setActiveTab] = useState('mixer');

  useEffect(() => {
    // Check for URL params
    const searchParams = new URLSearchParams(location.search);
    const tool = searchParams.get('tool');
    
    // Update unlocked tools based on localStorage or defaults
    const storedProgress = localStorage.getItem('beatSageProgress');
    if (storedProgress) {
      try {
        const progress = JSON.parse(storedProgress);
        setUnlockedTools(Object.keys(progress).filter(tool => progress[tool]));
      } catch (e) {
        console.error('Error parsing progress data');
      }
    }
    
    // Set active tab based on tool param
    if (tool) {
      if (tool === 'compressor' || tool === 'eq') {
        setActiveTab('effects');
      } else if (tool === 'track' || tool === 'volume') {
        setActiveTab('mixer');
      }
    }
  }, [location]);

  const isToolUnlocked = (toolId: string) => {
    return unlockedTools.includes(toolId);
  };

  // Volume settings
  const [masterVolume, setMasterVolume] = useState([80]);
  
  // Compressor settings
  const [threshold, setThreshold] = useState([-24]);
  const [ratio, setRatio] = useState([4]);
  
  // EQ settings
  const [eqLow, setEqLow] = useState([0]);
  const [eqMid, setEqMid] = useState([0]);
  const [eqHigh, setEqHigh] = useState([0]);

  return (
    <div className="min-h-screen bg-beatsage-dark-bg text-white flex flex-col">
      {/* DAW Header */}
      <header className="bg-beatsage-dark-purple p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Headphones size={24} />
            <h1 className="text-xl font-bold">BeatSage Playground</h1>
          </div>
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Home size={16} />
            Back to Lessons
          </Button>
        </div>
      </header>

      {/* DAW Interface */}
      <main className="container mx-auto flex-1 p-4">
        {/* Transport controls */}
        <DAWControl className="mb-4" />
        
        {/* Main content with tabs */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="mixer">Mixer</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mixer" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Tracks</h2>
                <div className="space-y-3">
                  <TrackControl name="Vocals" type="vocal" color="#f43f5e" isUnlocked={true} />
                  <TrackControl name="Guitar" type="guitar" color="#3b82f6" isUnlocked={true} />
                  <TrackControl name="Piano" type="piano" color="#8b5cf6" isUnlocked={true} />
                  <TrackControl name="Drums" type="drum" color="#f59e0b" isUnlocked={true} />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Master Volume</h2>
                <div className="bg-beatsage-dark-gray bg-opacity-20 p-4 rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm">Master</label>
                    <div className="flex items-center gap-3">
                      <Volume size={20} />
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="1"
                        value={masterVolume[0]}
                        onChange={(e) => setMasterVolume([parseFloat(e.target.value)])}
                        className="flex-1"
                      />
                      <span className="text-sm w-8">{masterVolume[0]}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="effects" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Compressor */}
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  <span>Compressor</span>
                  {!isToolUnlocked('compressor') && (
                    <span className="text-xs bg-beatsage-dark-purple px-2 py-1 rounded ml-2">
                      🔒 Locked
                    </span>
                  )}
                </h2>
                
                <div className={`bg-beatsage-dark-gray bg-opacity-20 p-4 rounded-lg ${!isToolUnlocked('compressor') ? 'opacity-50 pointer-events-none' : ''}`}>
                  {isToolUnlocked('compressor') ? (
                    <div className="space-y-6">
                      <div className="space-y-2">
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
                      
                      <div className="space-y-2">
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
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm mb-4">Complete the Compressor lesson to unlock this tool</p>
                      <Button
                        onClick={() => navigate('/lesson/compressor')}
                        className="bg-beatsage-purple hover:bg-beatsage-dark-purple"
                      >
                        Start Lesson
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Equalizer */}
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Equal size={20} />
                  <span>Equalizer</span>
                  {!isToolUnlocked('eq') && (
                    <span className="text-xs bg-beatsage-dark-purple px-2 py-1 rounded ml-2">
                      🔒 Locked
                    </span>
                  )}
                </h2>
                
                <div className={`bg-beatsage-dark-gray bg-opacity-20 p-4 rounded-lg ${!isToolUnlocked('eq') ? 'opacity-50 pointer-events-none' : ''}`}>
                  {isToolUnlocked('eq') ? (
                    <div>
                      <div className="flex gap-4 justify-between items-end h-40 mb-4">
                        <div className="flex flex-col items-center flex-1">
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
                        
                        <div className="flex flex-col items-center flex-1">
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
                        
                        <div className="flex flex-col items-center flex-1">
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
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm mb-4">Complete the Equalizer lesson to unlock this tool</p>
                      <Button
                        onClick={() => navigate('/lesson/eq')}
                        className="bg-beatsage-purple hover:bg-beatsage-dark-purple"
                      >
                        Start Lesson
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Playground;
