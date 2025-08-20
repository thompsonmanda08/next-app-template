import React from 'react';
import Link from 'next/link';
import { Home, Settings, Users, BarChart } from 'lucide-react';

// Dummy navigation items for template
export const sideNavItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: BarChart,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface SideNavItemsProps {
  className?: string;
}

export default function SideNavItems({ className = "" }: SideNavItemsProps) {
  return (
    <nav className={`space-y-2 ${className}`}>
      {sideNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-background/5"
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}