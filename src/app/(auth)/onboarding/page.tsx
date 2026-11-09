'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/common/Logo';
import { calculateNutritionProfile } from '@/lib/nutritionCalculations';
import {
  DietPreference,
  ActivityLevel,
  EquipmentAccess,
  WorkoutLocation,
  PrimaryGoal,
  LanguagePreference,
} from '@/types';
import {
  User,
  Scale,
  Utensils,
  Dumbbell,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();

  const [step, setStep] = useState(1);

  // Form States
  const [firstName, setFirstName] = useState(user?.displayName?.split(' ')[0] || '');
  const [age, setAge] = useState<number>(user?.age || 26);
  const [gender, setGender] = useState<'male' | 'female' | 'non-binary' | 'prefer-not-to-say'>('male');

  const [heightCm, setHeightCm] = useState<number>(user?.heightCm || 172);
  const [weightKg, setWeightKg] = useState<number>(user?.weightKg || 68);
  const [preferredUnits, setPreferredUnits] = useState<'metric' | 'imperial'>('metric');

  const [dietPreference, setDietPreference] = useState<DietPreference>('vegetarian');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [budgetPerDay, setBudgetPerDay] = useState<number>(250);

  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately-active');
  const [workoutLocation, setWorkoutLocation] = useState<WorkoutLocation>('home');
  const [equipment, setEquipment] = useState<EquipmentAccess>('dumbbells');

  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>('general-health');
  const [preferredLanguage, setPreferredLanguage] = useState<LanguagePreference>('en');
  const [healthConsentGiven, setHealthConsentGiven] = useState(true);

  // Allergies helper
  const commonAllergies = ['Peanuts', 'Lactose / Milk', 'Gluten / Wheat', 'Soy', 'Shellfish', 'Eggs', 'Tree Nuts'];
  const toggleAllergy = (item: string) => {
    if (allergies.includes(item)) {
      setAllergies(allergies.filter((a) => a !== item));
    } else {
      setAllergies([...allergies, item]);
    }
  };

  const handleFinish = () => {
    // Run evidence-based baseline calculations
    const calculations = calculateNutritionProfile({
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel,
      primaryGoal,
    });

    updateProfile({
      displayName: firstName || user?.displayName || 'VitaFit Member',
      age,
      gender,
      heightCm,
      weightKg,
      preferredUnits,
      dietPreference,
      allergies,
      dietaryRestrictions,
      budgetPerDay,
      activityLevel,
      workoutLocation,
      equipment,
      primaryGoal,
      preferredLanguage,
      healthConsentGiven,
      onboardingCompleted: true,
      bmi: calculations.bmi,
      bmiCategory: calculations.bmiCategory,
      bmr: calculations.bmr,
      tdee: calculations.tdee,
      targetCalories: calculations.targetCalories,
      targetProteinGrams: calculations.proteinGrams,
      targetCarbsGrams: calculations.carbsGrams,
      targetFatGrams: calculations.fatGrams,
      targetWaterMl: calculations.waterTargetMl,
      isMinor: calculations.isMinor,
    });

    router.push('/dashboard');
  };

  const isMinor = age < 18;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="md" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personalize Your VitaFit AI Experience
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Step {step} of 5 • Tailoring Indian nutrition and movement baselines
          </p>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-600 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Card Container */}
        <div className="bg-white dark:bg-navy-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Basics</h3>
                  <p className="text-xs text-slate-500">How should VitaCoach address you?</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Arjun"
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    min={12}
                    max={100}
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  {isMinor && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      Minor protection active: No restrictive calorie targets.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Biological Sex / Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BODY METRICS */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Body Measurements</h3>
                  <p className="text-xs text-slate-500">Used for Mifflin-St Jeor BMR & TDEE formulas</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Unit System:</span>
                <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-navy-950">
                  <button
                    type="button"
                    onClick={() => setPreferredUnits('metric')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      preferredUnits === 'metric'
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Metric (cm / kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredUnits('imperial')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      preferredUnits === 'imperial'
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Imperial (in / lbs)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={250}
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseInt(e.target.value) || 170)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    ~ {Math.floor(heightCm / 30.48)} ft {Math.round((heightCm % 30.48) / 2.54)} in
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min={30}
                    max={250}
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseInt(e.target.value) || 65)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    ~ {Math.round(weightKg * 2.20462)} lbs
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DIET & ALLERGIES */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nutrition & Diet Preferences</h3>
                  <p className="text-xs text-slate-500">South & North Indian meal adaptation</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Dietary Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'vegetarian', label: 'Vegetarian' },
                    { id: 'eggetarian', label: 'Eggetarian' },
                    { id: 'vegan', label: 'Vegan' },
                    { id: 'non-vegetarian', label: 'Non-Veg' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDietPreference(d.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                        dietPreference === d.id
                          ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Allergies & Sensitivities
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonAllergies.map((item) => {
                    const selected = allergies.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAllergy(item)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          selected
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Approximate Daily Food Budget (₹ INR)
                </label>
                <input
                  type="number"
                  min={50}
                  max={2000}
                  step={50}
                  value={budgetPerDay}
                  onChange={(e) => setBudgetPerDay(parseInt(e.target.value) || 200)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Budget planner will prioritize high-nutrient, affordable staples (sprouted moong, eggs, local greens).
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: ACTIVITY & WORKOUT PREFERENCES */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fitness & Equipment</h3>
                  <p className="text-xs text-slate-500">Customized to your routine and available gear</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Daily Physical Activity Level
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="sedentary">Sedentary (Desk job, minimal planned exercise)</option>
                  <option value="lightly-active">Lightly Active (1-3 days light exercise/walking)</option>
                  <option value="moderately-active">Moderately Active (3-5 days moderate workouts)</option>
                  <option value="very-active">Very Active (6-7 days intense exercise)</option>
                  <option value="extremely-active">Extremely Active (Athletic training / physical labor)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Location
                  </label>
                  <select
                    value={workoutLocation}
                    onChange={(e) => setWorkoutLocation(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="home">Home Workouts</option>
                    <option value="gym">Commercial Gym</option>
                    <option value="outdoors">Outdoors / Parks</option>
                    <option value="hybrid">Hybrid (Home & Gym)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Available Equipment
                  </label>
                  <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="none">Bodyweight Only (No Gear)</option>
                    <option value="resistance-bands">Resistance Bands</option>
                    <option value="dumbbells">Dumbbells</option>
                    <option value="full-gym">Full Commercial Gym Access</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: GOALS, LANGUAGE & CONSENT */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Primary Goal & Language</h3>
                  <p className="text-xs text-slate-500">Science-based targets tailored to you</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  What is your primary wellness focus?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'general-health', title: 'General Longevity & Health', desc: 'Balanced nutrition & steady energy' },
                    { id: 'build-muscle', title: 'Lean Muscle & Strength', desc: 'Higher protein, progressive resistance' },
                    { id: 'improve-stamina', title: 'Cardiovascular Stamina', desc: 'Aerobic capacity, running & cycling' },
                    { id: 'weight-management', title: 'Sustainable Weight Management', desc: 'Gentle, muscle-sparing deficit' },
                    { id: 'flexibility', title: 'Mobility & Flexibility', desc: 'Yoga asanas, spinal posture, desk relief' },
                    { id: 'maintain', title: 'Energy Equilibrium Maintenance', desc: 'Stay active and maintain current weight' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setPrimaryGoal(g.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        primaryGoal === g.id
                          ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{g.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{g.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Preferred Platform Language
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPreferredLanguage('en')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      preferredLanguage === 'en'
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredLanguage('te')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      preferredLanguage === 'te'
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    తెలుగు (Telugu)
                  </button>
                </div>
              </div>

              {/* Consent check */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={healthConsentGiven}
                    onChange={(e) => setHealthConsentGiven(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>
                    I confirm my measurements are accurate to the best of my knowledge and understand that VitaFit AI recommendations are educational and not a substitute for clinical physician advice.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-md shadow-brand-500/25 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={!healthConsentGiven}
                className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-lg shadow-brand-500/30 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate & Open Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
