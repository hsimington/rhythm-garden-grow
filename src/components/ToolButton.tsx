
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ToolButtonProps {
  children: ReactNode;
  bgColor: string;
  className?: string;
  size?: 'sm' | 'md';
  onClick?: () => void;
  disabled?: boolean;
}

const ToolButton = ({ 
  children, 
  bgColor, 
  className, 
  size = 'md',
  onClick,
  disabled = false 
}: ToolButtonProps) => {
  return (
    <button 
      className={cn(
        size === 'md' ? 'tool-button' : 'tool-button-sm',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105',
        className
      )}
      style={{ backgroundColor: bgColor }} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ToolButton;
