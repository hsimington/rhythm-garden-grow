
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LevelCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const LevelCard = ({ 
  title, 
  description, 
  icon,
  className,
  onClick
}: LevelCardProps) => {
  return (
    <div 
      className={cn("lesson-card flex items-center justify-between cursor-pointer", className)}
      onClick={onClick}
    >
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-beatsage-light-purple text-sm">{description}</p>
      </div>
      {icon && (
        <div className="ml-4">
          {icon}
        </div>
      )}
    </div>
  );
};

export default LevelCard;
