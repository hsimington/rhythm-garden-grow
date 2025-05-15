
import React from 'react';

const MascotImage: React.FC = () => {
  return (
    <div className="w-16 h-16 relative">
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="35" ry="30" fill="#A67C52" />
        {/* Head */}
        <circle cx="45" cy="40" r="25" fill="#BF8C60" />
        {/* Eyes */}
        <circle cx="35" cy="35" r="4" fill="#111" />
        <circle cx="55" cy="35" r="4" fill="#111" />
        {/* Beak */}
        <path d="M45 45 L60 50 L45 55 Z" fill="#FFCC33" />
        {/* Feet */}
        <path d="M40 90 L30 95 L40 95 Z" fill="#FFCC33" />
        <path d="M60 90 L50 95 L60 95 Z" fill="#FFCC33" />
        {/* Musical note */}
        <path d="M75 30 L75 10 L85 5 L85 25 Z" fill="#9b87f5" />
        <circle cx="71" cy="30" r="6" fill="#9b87f5" />
      </svg>
    </div>
  );
};

export default MascotImage;
