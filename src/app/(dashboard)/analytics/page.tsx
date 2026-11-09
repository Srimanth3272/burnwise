'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import confetti from 'canvas-confetti';
import {
  BarChart3,
  Download,
  Printer,
  Sparkles,
  Award,
  TrendingUp,
  Droplets,
  Moon,
  Utensils,
  Activity,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const { badges, exportAllDataAsJSON, todayCaloriesConsumed, todayActiveMinutes, todayWaterMl } = useFitnessData();

  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#059669', '#3b82f6'],
    });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Nutrition & Energy Trend Data
  const weeklyAnalyticsData = [
    { day: 'Mon', calories: 2150, target: 2400, protein: 125, water: 2500, activeMins: 35 },
    { day: 'Tue', calories: 2300, target: 2400, protein: 130, water: 2800, activeMins: 45 },
    { day: 'Wed', calories: 2050, target: 2400, protein: 118, water: 2400, activeMins: 30 },
    { day: 'Thu', calories: 2400, target: 2400, protein: 135, water: 2750, activeMins: 50 },
    { day: 'Fri', calories: 2200, target: 2400, protein: 122, water: 2600, activeMins: 40 },
    { day: 'Sat', calories: 2350, target: 2400, protein: 128, water: 2900, activeMins: 60 },
    { day: 'Sun', calories: todayCaloriesConsumed || 2250, target: 2400, protein: 130, water: todayWaterMl || 2500, activeMins: todayActiveMinutes || 45 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Progress &amp; Health Analytics
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
              Evidence-Based
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track habit consistency, nutrition equilibrium, and personal vitality without weight obsession or body ranking.
          </p>
        </div>

        {/* Export & Print Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print Report</span>
          </button>
          <button
            onClick={exportAllDataAsJSON}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-md shadow-brand-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Record</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Habit Consistency</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">92%</div>
          <span className="text-[11px] text-emerald-500 font-semibold">6 of 7 days on target</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Weekly Active Time</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">310 mins</div>
          <span className="text-[11px] text-brand-500 font-semibold">Exceeds WHO 150m target</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Avg. Daily Hydration</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">2,680 ml</div>
          <span className="text-[11px] text-cyan-500 font-semibold">Optimal fluid balance</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Sleep Quality Avg</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">7.6 hrs</div>
          <span className="text-[11px] text-indigo-400 font-semibold">Consistent REM schedule</span>
        </div>
      </div>

      {/* Nutrition & Calorie Consistency Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              7-Day Caloric Intake Equilibrium
            </h3>
            <p className="text-xs text-slate-400">
              Daily calories consumed compared against personal Mifflin-St Jeor target
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-brand-500 font-semibold">
              <span className="w-3 h-3 rounded-full bg-brand-500 inline-block" />
              Consumed kcal
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 font-semibold">
              <span className="w-3 h-0.5 bg-slate-400 inline-block" />
              Baseline Target (~2,400)
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyAnalyticsData}>
              <defs>
                <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[1500, 3000]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="calories"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCal)"
                name="Consumed kcal"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section: Exercise Consistency & Hydration Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workouts minutes */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Daily Workout Minutes
          </h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAnalyticsData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="activeMins" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Active Mins" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Protein Intake Pattern */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Daily Protein Intake (Grams)
          </h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyAnalyticsData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="protein"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#3b82f6' }}
                  name="Protein (g)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Personal Achievement Milestones</span>
            </h3>
            <p className="text-xs text-slate-400">
              Celebrates wholesome habits, movement consistency, and restorative sleep
            </p>
          </div>

          <button
            onClick={triggerCelebration}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrate Progress</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition-all ${
                b.isUnlocked
                  ? 'bg-gradient-to-br from-brand-50/70 to-emerald-50/30 dark:from-navy-950 dark:to-brand-950/20 border-brand-500/40'
                  : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🏅</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.isUnlocked
                      ? 'bg-brand-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {b.isUnlocked ? 'Unlocked' : `${b.progressPercent}%`}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {b.description}
              </p>

              {!b.isUnlocked && (
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-brand-500 h-full rounded-full"
                    style={{ width: `${b.progressPercent}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
