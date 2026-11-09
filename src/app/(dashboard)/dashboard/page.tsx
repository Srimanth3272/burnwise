'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { formatNumber } from '@/lib/utils';
import {
  Utensils,
  Flame,
  Activity,
  Droplets,
  Moon,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Award,
  ChevronRight,
  TrendingUp,
  Clock,
  ScanLine,
  CheckCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    todayMeals,
    todayCaloriesConsumed,
    todayProteinConsumed,
    todayCarbsConsumed,
    todayFatConsumed,
    todayWorkouts,
    todayActiveMinutes,
    todayCaloriesBurned,
    todayWaterMl,
    targetWaterMl,
    addWaterIntake,
    latestSleep,
    removeMealLog,
    addMealLog,
    badges,
  } = useFitnessData();

  // Quick log modal states
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newMealType, setNewMealType] = useState<'breakfast' | 'lunch' | 'snack' | 'dinner'>('breakfast');
  const [newMealCalories, setNewMealCalories] = useState<number>(250);
  const [newMealProtein, setNewMealProtein] = useState<number>(10);
  const [newMealCarbs, setNewMealCarbs] = useState<number>(35);
  const [newMealFat, setNewMealFat] = useState<number>(6);

  // Targets from user profile or defaults
  const targetCalories = user?.targetCalories || 2400;
  const targetProtein = user?.targetProteinGrams || 120;
  const targetCarbs = user?.targetCarbsGrams || 300;
  const targetFat = user?.targetFatGrams || 70;

  const waterProgress = Math.min(100, Math.round((todayWaterMl / targetWaterMl) * 100));
  const caloriePercent = Math.min(100, Math.round((todayCaloriesConsumed / targetCalories) * 100));

  // Weekly Activity Trend Data
  const weeklyData = [
    { day: 'Mon', consumed: 2100, burned: 320, water: 2500 },
    { day: 'Tue', consumed: 2250, burned: 410, water: 2750 },
    { day: 'Wed', consumed: 1980, burned: 280, water: 2250 },
    { day: 'Thu', consumed: 2300, burned: 350, water: 3000 },
    { day: 'Fri', consumed: 2150, burned: 450, water: 2600 },
    { day: 'Sat', consumed: 2400, burned: 500, water: 2800 },
    { day: 'Today', consumed: todayCaloriesConsumed, burned: todayCaloriesBurned, water: todayWaterMl },
  ];

  const handleQuickAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName.trim()) return;

    addMealLog({
      date: new Date().toISOString().split('T')[0],
      mealType: newMealType,
      foodName: newMealName.trim(),
      portionMultiplier: 1.0,
      calories: Number(newMealCalories),
      protein: Number(newMealProtein),
      carbs: Number(newMealCarbs),
      fat: Number(newMealFat),
      notes: 'Quick manual entry',
    });

    setNewMealName('');
    setShowAddMealModal(false);
  };

  const isTelugu = user?.preferredLanguage === 'te';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isTelugu ? 'నేటి ఆరోగ్య డాష్‌బోర్డ్' : 'Daily Health & Vitality Hub'}
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live Tracker
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isTelugu
              ? 'మీ వ్యక్తిగత పోషకాహారం, నీటి శాతం మరియు వ్యాయామాల సమగ్ర స్థితి.'
              : 'Holistic real-time view of your nutrition, energy equilibrium, and daily habits.'}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/food-scanner"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-md shadow-brand-500/20 transition-all"
          >
            <ScanLine className="w-4 h-4" />
            <span>{isTelugu ? 'ఆహారం స్కాన్ చేయండి' : 'Scan Plate AI'}</span>
          </Link>
          <button
            onClick={() => setShowAddMealModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-navy-800 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-brand-500" />
            <span>{isTelugu ? 'భోజనం నమోదు' : 'Log Meal'}</span>
          </button>
        </div>
      </div>

      {/* 4 CORE HEALTH CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Consumed Calories */}
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {isTelugu ? 'తీసుకున్న కేలరీలు' : 'Calories Consumed'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {formatNumber(todayCaloriesConsumed)}
            </span>
            <span className="text-xs text-slate-400">/ ~{formatNumber(targetCalories)} kcal</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-navy-950 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-brand-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${caloriePercent}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>{todayMeals.length} meals recorded</span>
            <span className="text-brand-600 dark:text-brand-400 font-semibold">{caloriePercent}% of target</span>
          </div>
        </div>

        {/* Card 2: Energy Expended (Separated clearly as requested) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {isTelugu ? 'వ్యాయామ కేలరీలు' : 'Estimated Burned'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {formatNumber(todayCaloriesBurned)}
            </span>
            <span className="text-xs text-slate-400">kcal (estimate)</span>
          </div>
          <div className="mt-3 p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Active Minutes:</span>
            <span className="font-bold text-amber-500">{todayActiveMinutes} mins</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 italic">
            * Caloric expenditure varies by metabolism and heart rate.
          </div>
        </div>

        {/* Card 3: Water Intake */}
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {isTelugu ? 'నీటి శాతం' : 'Hydration Intake'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {formatNumber(todayWaterMl)}
            </span>
            <span className="text-xs text-slate-400">/ {formatNumber(targetWaterMl)} ml</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-navy-950 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${waterProgress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <button
              onClick={() => addWaterIntake(250)}
              className="flex-1 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-[11px] font-bold hover:bg-cyan-100 transition-colors border border-cyan-200 dark:border-cyan-800/40"
            >
              +250ml
            </button>
            <button
              onClick={() => addWaterIntake(500)}
              className="flex-1 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-[11px] font-bold hover:bg-cyan-100 transition-colors border border-cyan-200 dark:border-cyan-800/40"
            >
              +500ml
            </button>
          </div>
        </div>

        {/* Card 4: Sleep Rest */}
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {isTelugu ? 'నిద్ర మరియు రికవరీ' : 'Sleep & Recovery'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {latestSleep ? `${latestSleep.durationHours}h` : '7.5h'}
            </span>
            <span className="text-xs text-slate-400">restful sleep</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              Quality: {latestSleep?.sleepQuality || 'Good'}
            </span>
            <Link
              href="/sleep"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Log Sleep
            </Link>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Bedtime: {latestSleep?.bedTime || '11:00 PM'} → Wake: {latestSleep?.wakeTime || '06:45 AM'}
          </p>
        </div>
      </div>

      {/* MACRONUTRIENT DISTRIBUTION BAR */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isTelugu ? 'నేటి పోషకాల సమతుల్యత' : 'Today’s Macronutrient Balance'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Target split based on your Mifflin-St Jeor metabolic profile
            </p>
          </div>
          <Link
            href="/calculator"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Adjust Baselines →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Protein */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300">Protein</span>
              <span className="font-bold text-brand-500">{todayProteinConsumed}g / {targetProtein}g</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (todayProteinConsumed / targetProtein) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Moong dal, paneer, eggs, chicken</span>
          </div>

          {/* Carbs */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300">Carbohydrates</span>
              <span className="font-bold text-amber-500">{todayCarbsConsumed}g / {targetCarbs}g</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (todayCarbsConsumed / targetCarbs) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Whole grains, fruits, vegetables</span>
          </div>

          {/* Fat */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300">Healthy Fats</span>
              <span className="font-bold text-rose-500">{todayFatConsumed}g / {targetFat}g</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (todayFatConsumed / targetFat) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Cold-pressed sesame, nuts, ghee</span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN SECTION: MEALS LOGGED & WEEKLY CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Meals Logged Today */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isTelugu ? 'ఈరోజు రికార్డు చేసిన భోజనం' : 'Meals Logged Today'}
              </h3>
              <p className="text-xs text-slate-400">Confirmed entries in your nutrition diary</p>
            </div>
            <Link
              href="/diet-planner"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>Diet Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {todayMeals.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Utensils className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="text-sm text-slate-500">No meals logged for today yet.</p>
              <button
                onClick={() => setShowAddMealModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500"
              >
                Log Your First Meal
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 hover:border-brand-500/40 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0">
                      {meal.mealType}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {meal.foodName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{meal.calories} kcal</span>
                        <span>•</span>
                        <span>P: {meal.protein}g</span>
                        <span>•</span>
                        <span>C: {meal.carbs}g</span>
                        <span>•</span>
                        <span>F: {meal.fat}g</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 hidden sm:inline">{meal.loggedAt}</span>
                    <button
                      onClick={() => removeMealLog(meal.id)}
                      title="Remove entry"
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Weekly Energy Trend Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isTelugu ? 'వారపు కేలరీల ట్రెండ్' : 'Weekly Calorie Pattern'}
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Last 7 Days</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Intake (green) vs Expended (amber)
          </p>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="consumed" fill="#10b981" radius={[4, 4, 0, 0]} name="Consumed kcal" />
                <Bar dataKey="burned" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Burned kcal" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-brand-600 dark:text-brand-400">VitaCoach Insight: </span>
            Your dietary intake is consistently within 5% of maintenance requirements, protecting metabolic stability.
          </div>
        </div>
      </div>

      {/* QUICK ADD MEAL MODAL */}
      {showAddMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Log a Meal to Daily Diary
              </h3>
              <button
                onClick={() => setShowAddMealModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickAddMeal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Food Name
                </label>
                <input
                  type="text"
                  required
                  value={newMealName}
                  onChange={(e) => setNewMealName(e.target.value)}
                  placeholder="e.g. 2 Idlis with Sambar"
                  className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Meal Slot
                </label>
                <select
                  value={newMealType}
                  onChange={(e) => setNewMealType(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="snack">Snack</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={newMealCalories}
                    onChange={(e) => setNewMealCalories(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={newMealProtein}
                    onChange={(e) => setNewMealProtein(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={newMealCarbs}
                    onChange={(e) => setNewMealCarbs(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    value={newMealFat}
                    onChange={(e) => setNewMealFat(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddMealModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-md"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
