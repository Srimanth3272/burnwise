'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import {
  Settings,
  Bell,
  Globe,
  ShieldCheck,
  Moon,
  Droplets,
  Utensils,
  Dumbbell,
  LogOut,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateProfile, signOut } = useAuth();
  const { reminders, updateReminders } = useFitnessData();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleReminderToggle = (key: keyof typeof reminders) => {
    const updated = !reminders[key];
    updateReminders({ [key]: updated });
    showToast(`Updated reminder preference: ${updated ? 'Enabled' : 'Disabled'}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-brand-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Settings &amp; Notifications
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize alerts, health reminders, preferred language, and privacy preferences.
        </p>
      </div>

      {/* Health Reminders Configuration */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Bell className="w-5 h-5 text-brand-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Health &amp; Habit Reminders
            </h3>
            <p className="text-xs text-slate-400">
              Configure gentle alerts to maintain healthy everyday habits
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              key: 'waterReminders' as const,
              label: 'Hourly Hydration Alerts',
              desc: 'Subtle prompts every 90 minutes during daytime hours to sip fresh water.',
              icon: Droplets,
            },
            {
              key: 'exerciseReminders' as const,
              label: 'Daily Movement & Exercise Prompts',
              desc: 'Reminds you of your scheduled morning mobility or evening bodyweight workout.',
              icon: Dumbbell,
            },
            {
              key: 'mealLoggingReminders' as const,
              label: 'Meal Logging & Digest Timing',
              desc: 'Alerts at breakfast, lunch, and dinner to record your meal portions.',
              icon: Utensils,
            },
            {
              key: 'sleepReminders' as const,
              label: 'Digital Sunset & Sleep Routine Alert',
              desc: 'Notifies you 45 minutes prior to target bedtime to dim screens and wind down.',
              icon: Moon,
            },
            {
              key: 'weeklySummaryEmail' as const,
              label: 'Weekly Health Analytics Report',
              desc: 'Generates a private digest of your 7-day nutrition and exercise milestones.',
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isEnabled = reminders[item.key];
            return (
              <div
                key={item.key}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleReminderToggle(item.key)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    isEnabled ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      isEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Language & Regional Settings */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Globe className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Language &amp; Region
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              updateProfile({ preferredLanguage: 'en' });
              showToast('Switched interface language to English');
            }}
            className={`p-4 rounded-2xl border text-left font-bold text-xs transition-all ${
              user?.preferredLanguage === 'en'
                ? 'bg-brand-500/10 border-brand-500 text-brand-700 dark:text-brand-300'
                : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="block text-sm">English</span>
            <span className="text-[10px] font-normal text-slate-400 mt-0.5 block">
              Default system language
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              updateProfile({ preferredLanguage: 'te' });
              showToast('భాష తెలుగులోకి మార్చబడింది (Telugu)');
            }}
            className={`p-4 rounded-2xl border text-left font-bold text-xs transition-all ${
              user?.preferredLanguage === 'te'
                ? 'bg-brand-500/10 border-brand-500 text-brand-700 dark:text-brand-300'
                : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="block text-sm">తెలుగు (Telugu)</span>
            <span className="text-[10px] font-normal text-slate-400 mt-0.5 block">
              ఆంధ్రప్రదేశ్ &amp; తెలంగాణ స్థానిక భాష
            </span>
          </button>
        </div>
      </div>

      {/* Account Security & Sign Out */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" />
          <span>Account &amp; Session</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Currently authenticated as <strong>{user?.email || 'Active User'}</strong>. Your records are encrypted and isolated.
        </p>
        <button
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of VitaFit AI</span>
        </button>
      </div>
    </div>
  );
}
