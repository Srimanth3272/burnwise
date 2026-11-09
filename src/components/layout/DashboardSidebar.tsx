'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calculator,
  ScanLine,
  Dumbbell,
  ChefHat,
  Wallet,
  Mic,
  Droplets,
  Moon,
  BarChart3,
  BookOpen,
  ShoppingCart,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Flame,
} from 'lucide-react';

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, signOut, isAdmin } = useAuth();

  const navigationGroups = [
    {
      group: 'Core Tracking',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Diet Planner', href: '/diet-planner', icon: UtensilsCrossed, badge: 'Indian' },
        { name: 'Nutrition Calculator', href: '/calculator', icon: Calculator },
        { name: 'Scan My Food', href: '/food-scanner', icon: ScanLine, badge: 'AI' },
      ],
    },
    {
      group: 'Fitness & Kitchen',
      items: [
        { name: 'Exercise Planner', href: '/exercise', icon: Dumbbell },
        { name: "What's in My Kitchen?", href: '/kitchen-ai', icon: ChefHat, badge: 'Smart' },
        { name: 'Budget Meal Planner', href: '/budget-planner', icon: Wallet },
        { name: 'Voice Assistant', href: '/voice-assistant', icon: Mic, badge: 'EN / TE' },
      ],
    },
    {
      group: 'Habits & Wellness',
      items: [
        { name: 'Hydration Tracker', href: '/hydration', icon: Droplets },
        { name: 'Sleep Tracker', href: '/sleep', icon: Moon },
        { name: 'Progress & Analytics', href: '/analytics', icon: BarChart3 },
        { name: 'Recipe Library', href: '/recipes', icon: BookOpen },
        { name: 'Grocery List', href: '/grocery', icon: ShoppingCart },
      ],
    },
    {
      group: 'Account & Control',
      items: [
        { name: 'My Profile', href: '/profile', icon: User },
        { name: 'Settings & Alerts', href: '/settings', icon: Settings },
        { name: 'Admin Console', href: '/admin', icon: ShieldCheck, badge: 'Admin' },
      ],
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-navy-950 border-r border-slate-200 dark:border-slate-800/80 h-screen sticky top-0 overflow-y-auto select-none scrollbar-thin">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
        <Logo size="md" href="/dashboard" />
      </div>

      {/* Nav Groups */}
      <div className="flex-1 px-4 py-4 space-y-6">
        {navigationGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {group.group}
            </h4>
            <div className="space-y-0.5 mt-1.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-700 dark:text-brand-400 font-semibold shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-500'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-navy-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'V'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {user?.displayName || 'Active Member'}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="truncate">Streak: 3 Days</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
