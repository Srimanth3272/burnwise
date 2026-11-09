'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { MobileNav } from '@/components/layout/MobileNav';
import { VitaCoachWidget } from '@/components/common/VitaCoachWidget';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { X, ArrowRight, ShieldCheck, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex flex-col lg:flex-row text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-navy-950 h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <Logo size="md" href="/dashboard" />
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 text-sm font-medium">
                {[
                  { name: 'Dashboard', href: '/dashboard' },
                  { name: 'Diet Planner', href: '/diet-planner' },
                  { name: 'Nutrition Calculator', href: '/calculator' },
                  { name: 'Scan My Food AI', href: '/food-scanner' },
                  { name: 'Exercise Planner', href: '/exercise' },
                  { name: "What's in My Kitchen?", href: '/kitchen-ai' },
                  { name: 'Budget Meal Planner', href: '/budget-planner' },
                  { name: 'Voice Assistant', href: '/voice-assistant' },
                  { name: 'Hydration Tracker', href: '/hydration' },
                  { name: 'Sleep Tracker', href: '/sleep' },
                  { name: 'Progress & Analytics', href: '/analytics' },
                  { name: 'Recipe Library', href: '/recipes' },
                  { name: 'Grocery List', href: '/grocery' },
                  { name: 'My Profile', href: '/profile' },
                  { name: 'Settings & Alerts', href: '/settings' },
                  { name: 'Admin Console', href: '/admin' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  signOut();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <DashboardHeader onMobileMenuClick={() => setMobileDrawerOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav onMoreClick={() => setMobileDrawerOpen(true)} />

      {/* Global VitaCoach AI Floating Widget */}
      <VitaCoachWidget />
    </div>
  );
}
