'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { formatNumber } from '@/lib/utils';
import {
  Droplets,
  Plus,
  RotateCcw,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  Bell,
  Coffee,
} from 'lucide-react';

export default function HydrationPage() {
  const { user } = useAuth();
  const {
    todayWaterMl,
    targetWaterMl,
    addWaterIntake,
    hydrationLogs,
    reminders,
    updateReminders,
  } = useFitnessData();

  const [customMl, setCustomMl] = useState<number>(300);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const percent = Math.min(100, Math.round((todayWaterMl / targetWaterMl) * 100));

  const cupPresets = [
    { label: 'Small Glass', ml: 200, icon: '🥛' },
    { label: 'Standard Mug / Tumbler', ml: 250, icon: '☕' },
    { label: 'Large Steel Glass', ml: 350, icon: '🥤' },
    { label: 'Copper Water Bottle', ml: 500, icon: '🍶' },
    { label: 'Sports Hydro Flask', ml: 750, icon: '💧' },
    { label: '1 Litre Jug', ml: 1000, icon: '🧊' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-cyan-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Hydration Tracker
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 font-semibold border border-cyan-500/20">
              Cellular Health
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor daily fluid intake with custom cup sizes, hourly pacing reminders, and electrolyte insights.
          </p>
        </div>

        {/* Reminder Toggle */}
        <button
          onClick={() => {
            updateReminders({ waterReminders: !reminders.waterReminders });
            showToast(reminders.waterReminders ? 'Water reminders paused' : 'Water reminders activated');
          }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            reminders.waterReminders
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
              : 'bg-slate-100 dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-500'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{reminders.waterReminders ? 'Reminders: Active' : 'Reminders: Disabled'}</span>
        </button>
      </div>

      {/* Main Hydration Progress Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-navy-900 to-navy-950 border border-cyan-500/30 shadow-xl text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Daily Target Progress
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white">
              {formatNumber(todayWaterMl)}{' '}
              <span className="text-xl sm:text-2xl font-normal text-slate-400">
                / {formatNumber(targetWaterMl)} ml
              </span>
            </div>

            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{percent}% of educational target reached</span>
              <span>~{Math.max(0, targetWaterMl - todayWaterMl)} ml remaining</span>
            </div>
          </div>

          {/* Quick Custom Logging Box */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Quick Custom Fluid Amount
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={50}
                max={2000}
                step={50}
                value={customMl}
                onChange={(e) => setCustomMl(Number(e.target.value))}
                className="flex-1 px-4 py-2 rounded-xl text-sm bg-navy-950 border border-slate-700 text-white font-bold"
              />
              <button
                type="button"
                onClick={() => {
                  addWaterIntake(customMl);
                  showToast(`Added ${customMl}ml of water!`);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Log Intake</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Also counts infused herbal waters, green tea, and spiced buttermilk.
            </p>
          </div>
        </div>
      </div>

      {/* Serving Vessel Presets */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Quick Log by Vessel Preset
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {cupPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                addWaterIntake(preset.ml);
                showToast(`Logged ${preset.ml}ml (${preset.label})!`);
              }}
              className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/20 text-center transition-all shadow-sm group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                {preset.icon}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                +{preset.ml}ml
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 line-clamp-1">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scientific Notice & Today's Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Educational Note */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Info className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>Educational Water Guidance</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Universal water requirements (such as &quot;8 glasses per day&quot;) are not absolute clinical mandates. Exact fluid needs vary according to body surface area, sweating rate, humidity, dietary sodium, and physical activity. Listen to thirst cues and monitor pale straw-colored urine.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            💡 <strong>Indian Lifestyle Tip:</strong> Coconut water and salted Majjiga (buttermilk) provide potassium and sodium electrolytes optimal during hot summer months.
          </div>
        </div>

        {/* Today's Log Timeline */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Today&apos;s Hydration Timeline
          </h4>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {hydrationLogs.length === 0 ? (
              <p className="text-xs text-slate-400">No hydration entries logged yet today.</p>
            ) : (
              hydrationLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      +{log.amountMl} ml
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{log.loggedAt}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
