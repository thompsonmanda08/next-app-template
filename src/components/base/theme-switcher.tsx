'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import NavIconButton from '../ui/nav-icon-button';

function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NavIconButton
      className={className}
      onClick={() => {
        if (theme === 'light') {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      }}
    >
      {theme === 'light' ? (
        <Moon className="p-0.5 w-6 aspect-square" />
      ) : (
        <Sun className="p-0.5 w-6 aspect-square" />
      )}
    </NavIconButton>
  );
}

export default ThemeSwitcher;
