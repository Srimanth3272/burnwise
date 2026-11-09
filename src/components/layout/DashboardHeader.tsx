'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import {
  Bell,
  Sparkles,
  Plus,
  Droplet,
  Utensils,
  Globe,
  CheckCircle2,
  AlertCircle,
  Menu,
} from 'lucide-react';

export const DashboardHeader: React.FC<{ onMobileMenuClick?: () => void }> = ({
  onMobileMenuClick,
}) => {
  const { user, updateProfile } = useAuth();
  const { todayWaterMl, targetWaterMl, todayCaloriesConsumed } = useFitnessData();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleLanguage = () => {
    const nextLang = user?.preferredLanguage === 'te' ? 'en' : 'te';
    updateProfile({ preferredLanguage: nextLang });
  };

  const notifications = [
    {
      id: 1,
      title: 'Water Reminder',
      desc: `Hydration update: ${todayWaterMl}ml logged of ${targetWaterMl}ml target. Drink a glass of water!`,
      time: '15m ago',
      type: 'hydration',
    },
    {
      id: 2,
      title: 'Meal Diary Alert',
      desc: 'Keep metabolism optimal by recording dinner or an evening snack.',
      time: '1h ago',
      type: 'meal',
    },
    {
      id: 3,
      title: 'Badge Milestone Unlocked',
      desc: 'You reached 75% progress on Movement Maestro!',
      time: '3h ago',
      type: 'achievement',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-navy-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
      {/* Left Title & Mobile Menu Button */}
      <div className="flex items-center gap-3">
        {onMobileMenuClick && (
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.displayName?.split(' ')[0] || 'Friend'} 👋
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {user?.preferredLanguage === 'te'
              ? 'మీ ఆరోగ్యం • మీ ఫిట్‌నెస్ • మీ జీవనశైలి'
              : 'Your health, nutrition and daily vitality dashboard'}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher Button (English / Telugu) */}
        <button
          onClick={toggleLanguage}
          title="Switch Language (English / తెలుగు)"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 hover:border-brand-500/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-brand-500" />
          <span>{user?.preferredLanguage === 'te' ? 'తెలుగు' : 'EN'}</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 hover:border-brand-500/40 text-slate-700 dark:text-slate-300 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Notifications & Reminders
                </h4>
                <span className="text-[10px] font-medium text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">
                  3 New
                </span>
              </div>
              <div className="space-y-3 mt-3 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-slate-800/60 text-xs space-y-1 hover:border-brand-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  href="/settings"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Configure Health Reminders
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <Link
          href="/profile"
          className="flex items-center gap-2 pl-2 sm:border-l sm:border-slate-200 dark:sm:border-slate-800"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white text-xs font-bold ring-2 ring-brand-500/20 hover:scale-105 transition-transform">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'V'}
          </div>
        </Link>
      </div>
    </header>
  );
};
