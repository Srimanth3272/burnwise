'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { calculateNutritionProfile } from '@/lib/nutritionCalculations';
import {
  User,
  Scale,
  Utensils,
  Dumbbell,
  Target,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Globe,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.displayName || '');
  const [age, setAge] = useState<number>(user?.age || 28);
  const [heightCm, setHeightCm] = useState<number>(user?.heightCm || 175);
  const [weightKg, setWeightKg] = useState<number>(user?.weightKg || 72);
  const [activityLevel, setActivityLevel] = useState(user?.activityLevel || 'moderately-active');
  const [dietPreference, setDietPreference] = useState(user?.dietPreference || 'vegetarian');
  const [primaryGoal, setPrimaryGoal] = useState(user?.primaryGoal || 'build-muscle');
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || 'en');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const calcs = calculateNutritionProfile({
      age,
      gender: user?.gender || 'male',
      heightCm,
      weightKg,
      activityLevel,
      primaryGoal,
    });

    updateProfile({
      displayName: name,
      age,
      heightCm,
      weightKg,
      activityLevel,
      dietPreference,
      primaryGoal,
      preferredLanguage,
      bmi: calcs.bmi,
      bmiCategory: calcs.bmiCategory,
      bmr: calcs.bmr,
      tdee: calcs.tdee,
      targetCalories: calcs.targetCalories,
      targetProteinGrams: calcs.proteinGrams,
      targetCarbsGrams: calcs.carbsGrams,
      targetFatGrams: calcs.fatGrams,
      targetWaterMl: calcs.waterTargetMl,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Health Profile &amp; Baselines
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Keep your physiological metrics current to receive precision caloric and macro targets.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Updated!</span>
          </span>
        )}
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* User Card Header */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white text-2xl font-black shadow-md">
            {name ? name.charAt(0).toUpperCase() : 'V'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {name || 'VitaFit Member'}
            </h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-500 uppercase">
                {user?.role || 'Member'}
              </span>
              <span className="text-[10px] text-slate-400">
                Units: {user?.preferredUnits?.toUpperCase() || 'METRIC'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Inputs */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Personal Information &amp; Metrics
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Age
              </label>
              <input
                type="number"
                min={13}
                max={100}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                min={120}
                max={230}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                min={30}
                max={220}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Dietary Preference
              </label>
              <select
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Primary Goal
              </label>
              <select
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="general-health">General Longevity &amp; Health</option>
                <option value="build-muscle">Build Lean Muscle</option>
                <option value="weight-management">Sustainable Weight Management</option>
                <option value="improve-stamina">Athletic Stamina</option>
                <option value="maintain">Maintain Current Weight</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-md shadow-brand-500/25 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Update Profile &amp; Recalculate Baselines</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
