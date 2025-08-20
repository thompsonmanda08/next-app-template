import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface DocsMobileNavProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

// Dummy docs mobile navigation for template
export default function DocsMobileNav({ isOpen = false, onToggle }: DocsMobileNavProps) {
  return (
    <div className="md:hidden">
      <Button
        variant="bordered"
        size="sm"
        onClick={onToggle}
        className="p-2"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-t p-4 shadow-lg">
          <nav className="space-y-2">
            <a href="/docs/getting-started" className="block py-2 text-foreground hover:text-primary">
              Getting Started
            </a>
            <a href="/docs/components" className="block py-2 text-foreground hover:text-primary">
              Components
            </a>
            <a href="/docs/api" className="block py-2 text-foreground hover:text-primary">
              API Reference
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}