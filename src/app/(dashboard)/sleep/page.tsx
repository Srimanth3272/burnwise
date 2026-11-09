'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import {
  Moon,
  Sun,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Flame,
  Award,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function SleepTrackerPage() {
  const { user } = useAuth();
  const { sleepLogs, addSleepLog, latestSleep } = useFitnessData();

  const [bedTime, setBedTime] = useState('23:00');
  const [wakeTime, setWakeTime] = useState('06:45');
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');
  const [notes, setNotes] = useState('Deep restorative sleep');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const calculateHours = (bed: string, wake: string): number => {
    const [bH, bM] = bed.split(':').map(Number);
    const [wH, wM] = wake.split(':').map(Number);

    let bedMinutes = bH * 60 + bM;
    let wakeMinutes = wH * 60 + wM;

    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60; // Next day
    }

    const diff = wakeMinutes - bedMinutes;
    return Math.round((diff / 60) * 10) / 10;
  };

  const currentDuration = calculateHours(bedTime, wakeTime);

  const handleSaveSleep = (e: React.FormEvent) => {
    e.preventDefault();
    addSleepLog({
      date: new Date().toISOString().split('T')[0],
      bedTime,
      wakeTime,
      durationHours: currentDuration,
      sleepQuality: quality,
      notes,
    });
    setToastMsg(`Saved sleep log: ${currentDuration} hours (${quality})!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const sleepTrendData = [
    { day: 'Mon', hours: 7.2 },
    { day: 'Tue', hours: 6.8 },
    { day: 'Wed', hours: 7.5 },
    { day: 'Thu', hours: 8.0 },
    { day: 'Fri', hours: 7.0 },
    { day: 'Sat', hours: 8.5 },
    { day: 'Sun', hours: currentDuration },
  ];

  const sleepTips = [
    {
      title: 'Circadian Regularity',
      desc: 'Wake up at the same hour every morning (including weekends) to anchor your master biological clock.',
    },
    {
      title: 'Digital Sunset (60 min before bed)',
      desc: 'Blue light from phones suppresses pineal melatonin secretion. Switch to warm yellow lamps.',
    },
    {
      title: 'Cool Ambient Temperature (18-20°C)',
      desc: 'Core body temperature must drop by ~1°C to initiate deep slow-wave REM recovery.',
    },
    {
      title: 'Afternoon Caffeine Cutoff',
      desc: 'Adenosine receptor blockade has a 6-hour half-life. Avoid coffee or black chai after 3:00 PM.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-indigo-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Sleep &amp; Recovery Tracker
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
            Neuro-Muscular Restoration
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deep restorative sleep optimizes muscle protein synthesis, metabolic insulin sensitivity, and cognitive clarity.
        </p>
      </div>

      {/* Input Form & Latest Sleep Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Record Last Night&apos;s Sleep</span>
          </h3>

          <form onSubmit={handleSaveSleep} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Bedtime
                </label>
                <input
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Wake-up Time
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>
            </div>

            {/* Calculated duration display */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">
                Calculated Sleep Time:
              </span>
              <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                {currentDuration} hours
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                Sleep Quality
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['poor', 'fair', 'good', 'excellent'] as const).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuality(q)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      quality === q
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Sleep Notes / Dream Recall
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Woke up refreshed, no midnight wakeups"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Moon className="w-4 h-4" />
              <span>Save Sleep Record</span>
            </button>
          </form>
        </div>

        {/* Right (7 Cols): Weekly Trend Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Weekly Sleep Duration Pattern
            </h3>
            <span className="text-xs text-indigo-400 font-semibold">Recommended: 7 - 9 Hours</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepTrendData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} name="Sleep Duration (h)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-indigo-500">Sleep Hygiene Score: </span>
            Your 7-day average is <strong>7.4 hours</strong>, providing ideal cellular tissue repair and maintaining optimal insulin sensitivity.
          </div>
        </div>
      </div>

      {/* Sleep Hygiene Recommendations Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Evidence-Based Sleep Hygiene Rules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sleepTips.map((tip, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                {tip.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
