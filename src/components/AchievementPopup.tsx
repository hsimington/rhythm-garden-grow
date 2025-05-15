
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MascotImage from './MascotImage';

interface AchievementPopupProps {
  title: string;
  description: string;
  onClose: () => void;
}

const AchievementPopup = ({ title, description, onClose }: AchievementPopupProps) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setIsShowing(true);
    
    // Optional auto-close after a few seconds
    // const timer = setTimeout(() => {
    //   handleClose();
    // }, 5000);
    
    // return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(onClose, 300); // Allow animation to complete
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div 
        className={`relative bg-beatsage-light-purple rounded-xl border-4 border-beatsage-purple p-6 w-80 transform transition-all duration-300 ${
          isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="absolute -bottom-8 -left-8">
          <div className="animate-bounce-small">
            <MascotImage />
          </div>
        </div>
        
        <div className="absolute -bottom-4 -right-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L28.5 14.5L40 14.5L30.5 22L34 33L24 26.5L14 33L17.5 22L8 14.5L19.5 14.5L24 4Z" fill="#673AB7" />
          </svg>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-xl font-pixel text-beatsage-dark-purple">
            {title}
          </h2>
          <p className="my-4 font-pixel text-xs text-beatsage-dark-purple">
            {description}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleClose}
            className="bg-beatsage-purple hover:bg-beatsage-dark-purple text-white px-6"
          >
            Cool!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;
