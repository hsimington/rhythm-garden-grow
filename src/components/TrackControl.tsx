
import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume, CirclePause, CirclePlay } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackControlProps {
  name: string;
  type: string;
  color: string;
  isUnlocked: boolean;
}

const TrackControl = ({ name, type, color, isUnlocked }: TrackControlProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
  };

  const getIcon = () => {
    switch(type) {
      case 'vocal':
        return <span className="text-xl">🎤</span>;
      case 'guitar':
        return <span className="text-xl">🎸</span>;
      case 'piano':
        return <span className="text-xl">🎹</span>;
      case 'drum':
        return <span className="text-xl">🥁</span>;
      default:
        return <span className="text-xl">🎵</span>;
    }
  };

  return (
    <div 
      className={cn(
        "daw-track",
        !isUnlocked && "opacity-50 cursor-not-allowed"
      )}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 flex items-center justify-center rounded-md"
          style={{ backgroundColor: `${color}30` }}
        >
          {getIcon()}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      
      <div className="flex-1 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handlePlayToggle}
          disabled={!isUnlocked}
        >
          {isPlaying ? <CirclePause size={18} /> : <CirclePlay size={18} />}
        </Button>
        
        <div className="flex items-center gap-2 flex-1">
          <Volume size={16} />
          <Slider
            value={volume}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={handleVolumeChange}
            disabled={!isUnlocked}
          />
          <span className="text-xs w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default TrackControl;
