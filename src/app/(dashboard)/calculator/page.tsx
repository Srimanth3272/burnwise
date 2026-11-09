'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { calculateNutritionProfile, CalculationResult } from '@/lib/nutritionCalculations';
import { ActivityLevel, PrimaryGoal } from '@/types';
import {
  Calculator,
  Scale,
  Activity,
  Target,
  Sparkles,
  ShieldAlert,
  Info,
  CheckCircle2,
  RefreshCw,
  Heart,
  Droplet,
} from 'lucide-react';

export default function NutritionCalculatorPage() {
  const { user, updateProfile } = useAuth();

  const [age, setAge] = useState<number>(user?.age || 26);
  const [gender, setGender] = useState<'male' | 'female' | 'non-binary' | 'prefer-not-to-say'>(user?.gender || 'male');
  const [heightCm, setHeightCm] = useState<number>(user?.heightCm || 172);
  const [weightKg, setWeightKg] = useState<number>(user?.weightKg || 68);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(user?.activityLevel || 'moderately-active');
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>(user?.primaryGoal || 'general-health');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Compute reactive results
  const result: CalculationResult = calculateNutritionProfile({
    age,
    gender,
    heightCm,
    weightKg,
    activityLevel,
    primaryGoal,
  });

  const handleSaveToProfile = () => {
    updateProfile({
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel,
      primaryGoal,
      bmi: result.bmi,
      bmiCategory: result.bmiCategory,
      bmr: result.bmr,
      tdee: result.tdee,
      targetCalories: result.targetCalories,
      targetProteinGrams: result.proteinGrams,
      targetCarbsGrams: result.carbsGrams,
      targetFatGrams: result.fatGrams,
      targetWaterMl: result.waterTargetMl,
      isMinor: result.isMinor,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Calorie & Nutrition Calculator
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold border border-brand-500/20">
              Mifflin-St Jeor Validated
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Calculate your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and safe macro distribution.
          </p>
        </div>

        <button
          onClick={handleSaveToProfile}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-md shadow-brand-500/20 transition-all shrink-0"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved to Profile!</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Apply to My Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Minor Safety Alert Banner */}
      {result.isMinor && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Minor Protection Guard Active (Age &lt; 18)</p>
            <p className="leading-relaxed">
              In accordance with pediatric clinical safety guidelines, VitaFit AI does not provide restrictive calorie-deficit targets or weight-loss plans to minors. Recommendations prioritize balanced nutrition, bone density support, and regular sports.
            </p>
          </div>
        </div>
      )}

      {/* Two Column Layout: Inputs on Left, Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-brand-500" />
            <span>Calculation Parameters</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Age: <span className="text-brand-500">{age} years</span>
              </label>
              <input
                type="range"
                min={13}
                max={90}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Biological Sex
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="male">Male (MSJ +5 factor)</option>
                <option value="female">Female (MSJ -161 factor)</option>
                <option value="non-binary">Non-binary (Average factor)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min={110}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
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
                  className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="sedentary">Sedentary (x1.20 - Desk work, minimal exercise)</option>
                <option value="lightly-active">Lightly Active (x1.375 - 1-3 days light exercise)</option>
                <option value="moderately-active">Moderately Active (x1.55 - 3-5 days exercise)</option>
                <option value="very-active">Very Active (x1.725 - 6-7 days intense sports)</option>
                <option value="extremely-active">Extremely Active (x1.90 - Athletic double sessions)</option>
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
                <option value="general-health">General Health & Longevity (Maintenance)</option>
                <option value="build-muscle">Build Lean Muscle (+250 kcal surplus)</option>
                <option value="weight-management">Sustainable Weight Loss (Safe ~350 kcal deficit)</option>
                <option value="improve-stamina">Athletic Stamina & Endurance</option>
                <option value="maintain">Maintain Current Weight</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Computed Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* BMI */}
            <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Body Mass Index
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {result.bmi}{' '}
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                  kg/m²
                </span>
              </div>
              <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500">
                {result.bmiCategory} (WHO)
              </span>
              <p className="text-[10px] text-slate-400 mt-1">Asian Indian cut-off: {result.bmiCategoryAsian}</p>
            </div>

            {/* BMR */}
            <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Basal Metabolism (BMR)
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {result.bmr}{' '}
                <span className="text-xs font-semibold text-slate-400">kcal/day</span>
              </div>
              <span className="inline-block mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                At complete resting state
              </span>
            </div>

            {/* TDEE */}
            <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Total Daily Energy (TDEE)
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {result.tdee}{' '}
                <span className="text-xs font-semibold text-slate-400">kcal/day</span>
              </div>
              <span className="inline-block mt-1 text-[11px] font-semibold text-amber-500">
                Daily expenditure
              </span>
            </div>
          </div>

          {/* Daily Calorie Recommendation & Adjustment */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-900/40 via-navy-900 to-navy-950 border border-brand-500/30 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Recommended Daily Intake Target
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
                Safe &amp; Sustainable
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white">
              ~{result.targetCalories}{' '}
              <span className="text-lg font-normal text-slate-300">kcal / day</span>
            </div>
            <p className="text-xs sm:text-sm text-brand-100/90 leading-relaxed">
              {result.calorieAdjustmentNote}
            </p>
          </div>

          {/* Macronutrients Allocation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Macronutrient Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-0.5">Protein</span>
                <span className="text-lg font-black text-brand-500">{result.proteinGrams}g</span>
                <span className="text-[10px] text-slate-500 block">~{result.proteinGrams * 4} kcal</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-0.5">Carbs</span>
                <span className="text-lg font-black text-amber-500">{result.carbsGrams}g</span>
                <span className="text-[10px] text-slate-500 block">~{result.carbsGrams * 4} kcal</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-0.5">Healthy Fat</span>
                <span className="text-lg font-black text-rose-500">{result.fatGrams}g</span>
                <span className="text-[10px] text-slate-500 block">~{result.fatGrams * 9} kcal</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-0.5">Dietary Fiber</span>
                <span className="text-lg font-black text-cyan-500">{result.fiberGrams}g</span>
                <span className="text-[10px] text-slate-500 block">Gut health</span>
              </div>
            </div>
          </div>

          {/* Scientific Limitations & Educational Notes */}
          <div className="p-5 rounded-2xl bg-slate-100/70 dark:bg-navy-950/70 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Info className="w-4 h-4 text-brand-500 shrink-0" />
              <span>Scientific Limitations of Calculations</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              {result.limitations.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
