'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ScanLine,
  Dumbbell,
  Menu,
} from 'lucide-react';

export const MobileNav: React.FC<{ onMoreClick: () => void }> = ({ onMoreClick }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Diet', href: '/diet-planner', icon: UtensilsCrossed },
    { name: 'Scan AI', href: '/food-scanner', icon: ScanLine, highlight: true },
    { name: 'Workout', href: '/exercise', icon: Dumbbell },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        if (item.highlight) {
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center -mt-5 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-lg shadow-brand-500/30 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-full bg-brand-600 flex items-center justify-center text-white">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 mt-1">
                {item.name}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.name}</span>
          </Link>
        );
      })}

      <button
        onClick={onMoreClick}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px]">More</span>
      </button>
    </nav>
  );
};
