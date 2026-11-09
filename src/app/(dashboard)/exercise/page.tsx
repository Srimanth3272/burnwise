'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { EXERCISE_DATABASE } from '@/data/exercises';
import { ExerciseItem } from '@/types';
import { formatNumber } from '@/lib/utils';
import {
  Dumbbell,
  Play,
  CheckCircle2,
  Clock,
  Flame,
  ShieldAlert,
  Calendar,
  Filter,
  Activity,
  Plus,
  Sparkles,
} from 'lucide-react';

export default function ExercisePlannerPage() {
  const { user } = useAuth();
  const { addWorkoutLog, todayWorkouts, todayActiveMinutes, todayCaloriesBurned } = useFitnessData();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [customDurationMins, setCustomDurationMins] = useState<number>(20);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredExercises = EXERCISE_DATABASE.filter((ex) => {
    const catMatches = categoryFilter === 'all' || ex.category === categoryFilter;
    const diffMatches = difficultyFilter === 'all' || ex.difficulty === difficultyFilter;
    return catMatches && diffMatches;
  });

  const handleLogWorkout = (ex: ExerciseItem) => {
    const duration = customDurationMins || ex.recommendedDurationMins;
    const burned = Math.round(duration * ex.caloriesBurnedPerMin);

    addWorkoutLog({
      date: new Date().toISOString().split('T')[0],
      exerciseId: ex.id,
      exerciseName: ex.name,
      category: ex.category,
      durationMinutes: duration,
      estimatedCaloriesBurned: burned,
      notes: `${ex.difficulty.toUpperCase()} • ${ex.equipmentRequired.join(', ')}`,
    });

    showNotification(`Recorded ${duration} mins of ${ex.name} (~${burned} kcal burned)!`);
    setSelectedExercise(null);
  };

  const isTelugu = user?.preferredLanguage === 'te';

  // 7-day calendar schedule
  const weeklySchedule = [
    { day: 'Mon', focus: 'Brisk Walking & Mobility', status: 'completed' },
    { day: 'Tue', focus: 'Bodyweight Squats & Core', status: 'completed' },
    { day: 'Wed', focus: 'Yoga (Surya Namaskar)', status: 'today' },
    { day: 'Thu', focus: 'Interval Jogging / Cycling', status: 'planned' },
    { day: 'Fri', focus: 'Strength Training (Dumbbells)', status: 'planned' },
    { day: 'Sat', focus: 'Badminton / Outdoor Agility', status: 'planned' },
    { day: 'Sun', focus: 'Active Rest & Recovery Stretch', status: 'rest' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-brand-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isTelugu ? 'వ్యాయామ ప్రణాళిక' : 'Personalized Exercise Planner'}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
              9 Disciplines
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Science-backed exercise library with step-by-step form cues, target muscles, and safety considerations.
          </p>
        </div>

        {/* Today's Exercise Stat Pill */}
        <div className="flex items-center gap-3 bg-white dark:bg-navy-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Today</span>
            <span className="font-extrabold text-slate-900 dark:text-white">{todayActiveMinutes} mins</span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Burned (Est)</span>
            <span className="font-extrabold text-amber-500">~{todayCaloriesBurned} kcal</span>
          </div>
        </div>
      </div>

      {/* Weekly Exercise Calendar Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Weekly Activity &amp; Recovery Plan
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Rest days build muscle tissue</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
          {weeklySchedule.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center text-xs transition-all ${
                item.status === 'today'
                  ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300 font-bold ring-2 ring-brand-500/20'
                  : item.status === 'completed'
                  ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                  : item.status === 'rest'
                  ? 'border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-950 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="text-[10px] uppercase font-bold block mb-1">{item.day}</span>
              <p className="font-semibold line-clamp-1">{item.focus}</p>
              <span className="text-[9px] mt-1 inline-block uppercase tracking-wider opacity-75">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Disciplines' },
          { id: 'yoga', label: 'Yoga & Asanas' },
          { id: 'walking', label: 'Brisk Walking' },
          { id: 'jogging', label: 'Jogging' },
          { id: 'bodyweight', label: 'Bodyweight' },
          { id: 'strength', label: 'Strength Training' },
          { id: 'mobility', label: 'Mobility & Posture' },
          { id: 'sports', label: 'Sports & Agility' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setCategoryFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              categoryFilter === f.id
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-brand-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ex.mediaUrl}
                  alt={ex.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {ex.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      ex.difficulty === 'beginner'
                        ? 'bg-emerald-500 text-white'
                        : ex.difficulty === 'intermediate'
                        ? 'bg-amber-500 text-white'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {ex.difficulty}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                    {ex.name}
                  </h3>
                  {ex.nameTelugu && (
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                      {ex.nameTelugu}
                    </p>
                  )}
                </div>

                {/* Duration & Burn Pill */}
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-500" />
                    <span>{ex.recommendedDurationMins} mins</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Flame className="w-3.5 h-3.5" />
                    <span>~{Math.round(ex.recommendedDurationMins * ex.caloriesBurnedPerMin)} kcal</span>
                  </span>
                </div>

                {/* Target muscles */}
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Muscles:</strong> {ex.targetMuscles.join(', ')}
                </div>

                {/* Instructions preview */}
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p className="line-clamp-2">{ex.instructions[0]}</p>
                </div>
              </div>
            </div>

            {/* Card Action */}
            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedExercise(ex);
                  setCustomDurationMins(ex.recommendedDurationMins);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Drill &amp; Record</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Drill Detail / Workout Log Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedExercise.name}
                </h3>
                {selectedExercise.nameTelugu && (
                  <p className="text-xs text-brand-500">{selectedExercise.nameTelugu}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Instruction Steps */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">
                Execution Steps:
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedExercise.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ol>
            </div>

            {/* Safety notes */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                Safety Considerations:
              </span>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                {selectedExercise.safetyNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Duration Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Duration Completed (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={180}
                value={customDurationMins}
                onChange={(e) => setCustomDurationMins(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Estimated Burn: ~{Math.round(customDurationMins * selectedExercise.caloriesBurnedPerMin)} kcal
              </span>
            </div>

            {/* Confirm button */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleLogWorkout(selectedExercise)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-md"
              >
                Log Workout Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
