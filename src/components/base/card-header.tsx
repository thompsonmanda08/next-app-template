import React from 'react';

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function CardHeader({ 
  children, 
  className = "",
  title,
  subtitle
}: CardHeaderProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-foreground">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-sm text-foreground/60">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}