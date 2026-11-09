'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import {
  ScanLine,
  Upload,
  Camera,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Utensils,
  RefreshCw,
  Edit2,
  Check,
  ShieldAlert,
} from 'lucide-react';

export default function FoodScannerPage() {
  const { user } = useAuth();
  const { addMealLog } = useFitnessData();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loggedConfirmed, setLoggedConfirmed] = useState(false);

  // User Editable adjustments before confirming
  const [confirmedName, setConfirmedName] = useState('');
  const [confirmedServing, setConfirmedServing] = useState('');
  const [confirmedCalories, setConfirmedCalories] = useState<number>(0);
  const [confirmedProtein, setConfirmedProtein] = useState<number>(0);
  const [confirmedCarbs, setConfirmedCarbs] = useState<number>(0);
  const [confirmedFat, setConfirmedFat] = useState<number>(0);
  const [mealSlot, setMealSlot] = useState<'breakfast' | 'lunch' | 'snack' | 'dinner'>('breakfast');

  // Pre-curated sample photos so user can test scanning instantly
  const sampleMeals = [
    {
      label: 'South Indian Idli Sambar',
      url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80',
      name: 'idli_sambar_breakfast.jpg',
    },
    {
      label: 'Crispy Masala Dosa',
      url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=700&auto=format&fit=crop&q=80',
      name: 'masala_dosa_plate.jpg',
    },
    {
      label: 'Homestyle Dal & Phulkas',
      url: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=700&auto=format&fit=crop&q=80',
      name: 'chapati_dal_lunch.jpg',
    },
    {
      label: 'Tandoori Protein Chicken',
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=700&auto=format&fit=crop&q=80',
      name: 'tandoori_chicken_dinner.jpg',
    },
  ];

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      setFileName(file.name);
      analyzePhoto(base64, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: { url: string; name: string }) => {
    setSelectedImage(sample.url);
    setFileName(sample.name);
    analyzePhoto(sample.url, sample.name);
  };

  const analyzePhoto = async (base64OrUrl: string, name: string) => {
    setLoading(true);
    setError(null);
    setScanResult(null);
    setLoggedConfirmed(false);

    try {
      const res = await fetch('/api/ai/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64OrUrl.startsWith('data:') ? base64OrUrl : '',
          fileName: name,
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setScanResult(data.result);
        setConfirmedName(data.result.foodName);
        setConfirmedServing(data.result.estimatedServing);
        setConfirmedCalories(data.result.calories);
        setConfirmedProtein(data.result.protein);
        setConfirmedCarbs(data.result.carbs);
        setConfirmedFat(data.result.fat);
      } else {
        setError(data.error || 'Could not analyze food image.');
      }
    } catch (err: any) {
      setError(err.message || 'Error communicating with vision server.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAndSave = () => {
    if (!confirmedName) return;

    addMealLog({
      date: new Date().toISOString().split('T')[0],
      mealType: mealSlot,
      foodName: confirmedName,
      portionMultiplier: 1.0,
      calories: confirmedCalories,
      protein: confirmedProtein,
      carbs: confirmedCarbs,
      fat: confirmedFat,
      verifiedByAi: true,
      notes: `AI Scan (${confirmedServing}) - User Confirmed`,
    });

    setLoggedConfirmed(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Title */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Scan My Food AI
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold border border-brand-500/20">
            Multimodal Food Recognition
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Take a photo or upload your plate. VitaFit AI detects Indian dishes, estimates serving portions, and calculates nutritional values.
        </p>
      </div>

      {/* Main Grid: Upload Area on Left, Results & Confirmation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Camera / Upload Target (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-brand-500" />
              <span>Capture or Upload Plate</span>
            </h3>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />

            {/* Image Preview / Drop Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500/60 dark:hover:border-brand-500/60 flex flex-col items-center justify-center p-4 cursor-pointer transition-all overflow-hidden bg-slate-50 dark:bg-navy-950 group"
            >
              {selectedImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedImage}
                    alt="Scanned Food"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                    <Camera className="w-4 h-4" />
                    <span>Upload New Photo</span>
                  </div>
                  {loading && (
                    <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-sm flex flex-col items-center justify-center text-white text-xs gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
                      <span className="font-semibold tracking-wide">
                        Multimodal AI Analyzing Plate...
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Click to upload photo or take picture
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WebP up to 10MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sample Meals to Test Instantly */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Or Test with One-Click Indian Food Samples:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {sampleMeals.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 rounded-xl text-left text-xs bg-slate-50 dark:bg-navy-950 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-800 transition-all font-medium truncate"
                  >
                    🍲 {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results, Portion Correction, and Confirmation (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!scanResult && !loading && (
            <div className="p-10 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <ScanLine className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 animate-pulse" />
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Ready for Food Identification
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Upload a photograph of your breakfast, lunch, or dinner. VitaFit AI will estimate the portion in grams and identify macro nutrients.
              </p>
            </div>
          )}

          {scanResult && (
            <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 animate-in fade-in">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    AI Detection Insights
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-500 text-white">
                  {Math.round((scanResult.confidenceScore || 0.94) * 100)}% Confidence
                </span>
              </div>

              {/* Estimate Warning Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Estimate Notice:</strong> Visual recognition calculates probable serving volume. Please verify the dish name, portion, or oil estimate below before recording to your food diary.
                </p>
              </div>

              {/* Editable Fields Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Confirmed Dish Name
                  </label>
                  <input
                    type="text"
                    value={confirmedName}
                    onChange={(e) => setConfirmedName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                  />
                  {scanResult.foodNameTelugu && (
                    <span className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-1 block">
                      {scanResult.foodNameTelugu}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Serving Size &amp; Weight
                    </label>
                    <input
                      type="text"
                      value={confirmedServing}
                      onChange={(e) => setConfirmedServing(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Meal Slot
                    </label>
                    <select
                      value={mealSlot}
                      onChange={(e) => setMealSlot(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="snack">Evening Snack</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </div>
                </div>

                {/* Macro Adjustment Grid */}
                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">Calories</span>
                    <input
                      type="number"
                      value={confirmedCalories}
                      onChange={(e) => setConfirmedCalories(Number(e.target.value))}
                      className="w-full text-center text-sm font-black bg-transparent text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">Protein (g)</span>
                    <input
                      type="number"
                      value={confirmedProtein}
                      onChange={(e) => setConfirmedProtein(Number(e.target.value))}
                      className="w-full text-center text-sm font-black bg-transparent text-brand-500 focus:outline-none"
                    />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">Carbs (g)</span>
                    <input
                      type="number"
                      value={confirmedCarbs}
                      onChange={(e) => setConfirmedCarbs(Number(e.target.value))}
                      className="w-full text-center text-sm font-black bg-transparent text-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">Fat (g)</span>
                    <input
                      type="number"
                      value={confirmedFat}
                      onChange={(e) => setConfirmedFat(Number(e.target.value))}
                      className="w-full text-center text-sm font-black bg-transparent text-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Detected Ingredients */}
                {scanResult.ingredientsDetected && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Detected Elements:{' '}
                    </span>
                    <span>{scanResult.ingredientsDetected.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Confirmation Action Button */}
              <div className="pt-2">
                {loggedConfirmed ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Successfully Saved to Today&apos;s Food Diary!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirmAndSave}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm &amp; Record to Food Diary</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
