import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export default function Logo({ 
  className = "", 
  width = 40, 
  height = 40, 
  showText = true 
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl"
        style={{ width, height }}
      >
        W
      </div>
      {showText && (
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          WebbX
        </span>
      )}
    </div>
  );
}