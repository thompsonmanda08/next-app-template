import { Spinner as HeroUISpinner, SpinnerProps } from '@heroui/react';
import { cn } from '@/lib/utils';

type CustomSpinnerProps = Partial<SpinnerProps> & {
  size?: number | 'sm' | 'md' | 'lg';
  color?: 'current' | 'white' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
};

export default function Spinner({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  ...props 
}: CustomSpinnerProps) {
  // Convert number size to HeroUI size format
  const heroUISize = typeof size === 'number' 
    ? size <= 18 ? 'sm' : size <= 32 ? 'md' : 'lg'
    : size;

  return (
    <div className="flex flex-1 items-center justify-center">
      <HeroUISpinner
        className={cn(className)}
        color={color}
        size={heroUISize}
        {...props}
      />
    </div>
  );
}
