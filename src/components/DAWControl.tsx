
import { Sliders, Play, Pause, SkipBack, Music, Headphones } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DAWControlProps {
  className?: string;
}

const DAWControl = ({ className }: DAWControlProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [position, setPosition] = useState([0]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
  };

  const handlePositionChange = (value: number[]) => {
    setPosition(value);
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Mock duration for the track (2 minutes)
  const duration = 120;
  const currentTime = (position[0] / 100) * duration;

  return (
    <div className={cn("bg-beatsage-dark-purple bg-opacity-20 p-3 rounded-lg", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium flex items-center gap-2">
          <Music size={16} />
          <span>Demo Track</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Headphones size={16} />
          <Slider 
            value={volume} 
            max={100}
            step={1}
            className="w-24" 
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8"
        >
          <SkipBack size={16} />
        </Button>
        
        <Button
          onClick={togglePlay}
          variant="outline" 
          size="icon"
          className="h-10 w-10 rounded-full bg-beatsage-purple text-white hover:bg-beatsage-dark-purple border-none"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </Button>
        
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <Slider 
            value={position} 
            max={100}
            step={0.1}
            className="flex-1" 
            onValueChange={handlePositionChange} 
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default DAWControl;
