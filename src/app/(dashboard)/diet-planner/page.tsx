'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { INDIAN_FOOD_DATABASE } from '@/data/indianFoods';
import { FoodItem, DietPreference } from '@/types';
import { formatCurrencyINR, formatNumber } from '@/lib/utils';
import {
  UtensilsCrossed,
  Filter,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Plus,
  ShoppingCart,
  Clock,
  Flame,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Info,
} from 'lucide-react';

export default function DietPlannerPage() {
  const { user } = useAuth();
  const { addMealLog, addGroceryItem, savedRecipeIds, toggleSaveRecipe } = useFitnessData();

  // Active slot tab: breakfast | lunch | snack | dinner
  const [activeSlot, setActiveSlot] = useState<'breakfast' | 'lunch' | 'snack' | 'dinner'>('breakfast');

  // Filters
  const [regionFilter, setRegionFilter] = useState<'all' | 'South Indian' | 'North Indian' | 'Pan-Indian'>('all');
  const [dietFilter, setDietFilter] = useState<string>(user?.dietPreference || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Portion multiplier for preview
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [expandedFoodId, setExpandedFoodId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered food list
  const filteredFoods = INDIAN_FOOD_DATABASE.filter((food) => {
    // Slot matching
    const slotMatches =
      activeSlot === 'snack'
        ? food.category === 'snack' || food.category === 'beverage'
        : food.category === activeSlot || food.category === 'lunch' || food.category === 'dinner';

    // Region matching
    const regionMatches = regionFilter === 'all' || food.region === regionFilter;

    // Diet matching
    const dietMatches = dietFilter === 'all' || food.dietType === dietFilter;

    // Search query matching
    const queryMatches =
      !searchQuery ||
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (food.nameTelugu && food.nameTelugu.includes(searchQuery)) ||
      food.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    return slotMatches && regionMatches && dietMatches && queryMatches;
  });

  const handleLogMeal = (food: FoodItem) => {
    addMealLog({
      date: new Date().toISOString().split('T')[0],
      mealType: activeSlot,
      foodName: food.name,
      portionMultiplier,
      calories: Math.round(food.calories * portionMultiplier),
      protein: Math.round(food.protein * portionMultiplier),
      carbs: Math.round(food.carbs * portionMultiplier),
      fat: Math.round(food.fat * portionMultiplier),
      notes: `${food.servingSize} (${portionMultiplier}x portion)`,
    });
    showToast(`Added ${food.name} to today's ${activeSlot} log!`);
  };

  const handleAddToGrocery = (food: FoodItem) => {
    food.ingredients.forEach((ing) => {
      addGroceryItem({
        name: ing,
        quantity: '1 portion',
        category: 'produce',
        completed: false,
        estimatedCostINR: Math.round(food.estimatedCostINR / food.ingredients.length),
      });
    });
    showToast(`Added ${food.ingredients.length} ingredients to your Grocery List!`);
  };

  const isTelugu = user?.preferredLanguage === 'te';

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-brand-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isTelugu ? 'భారతీయ డైట్ ప్లానర్' : 'AI Indian Diet Planner'}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
              South &amp; North Indian
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Customizable macro-counted Indian meals with traditional ingredients, portion scaling, and recipe steps.
          </p>
        </div>

        {/* Portion multiplier selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white dark:bg-navy-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold pl-2">Portion:</span>
          {[0.5, 1.0, 1.5, 2.0].map((scale) => (
            <button
              key={scale}
              type="button"
              onClick={() => setPortionMultiplier(scale)}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                portionMultiplier === scale
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {scale}x
            </button>
          ))}
        </div>
      </div>

      {/* Meal Slot Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'breakfast', label: 'Breakfast (అల్పాహారం)', time: '07:30 - 09:30 AM' },
          { id: 'lunch', label: 'Lunch (మధ్యాహ్న భోజనం)', time: '12:30 - 02:00 PM' },
          { id: 'snack', label: 'Evening Snack (సాయంత్రం)', time: '04:30 - 06:00 PM' },
          { id: 'dinner', label: 'Dinner (రాత్రి భోజనం)', time: '07:30 - 09:00 PM' },
        ].map((slot) => {
          const isActive = activeSlot === slot.id;
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => setActiveSlot(slot.id as any)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300 shadow-sm'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
              }`}
            >
              <div>{slot.label}</div>
              <span className="text-[10px] font-normal text-slate-400 block mt-0.5">
                {slot.time}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Region filter */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="all">All Regions</option>
            <option value="South Indian">South Indian</option>
            <option value="North Indian">North Indian</option>
            <option value="Pan-Indian">Pan-Indian</option>
          </select>

          {/* Diet filter */}
          <select
            value={dietFilter}
            onChange={(e) => setDietFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="all">All Diets</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="eggetarian">Eggetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        {/* Search input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish or ingredient..."
            className="w-full px-3.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Food Items Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFoods.map((food) => {
          const isSaved = savedRecipeIds.includes(food.id);
          const isExpanded = expandedFoodId === food.id;

          const scaledCalories = Math.round(food.calories * portionMultiplier);
          const scaledProtein = Math.round(food.protein * portionMultiplier);
          const scaledCarbs = Math.round(food.carbs * portionMultiplier);
          const scaledFat = Math.round(food.fat * portionMultiplier);
          const scaledFiber = Math.round(food.fiber * portionMultiplier);
          const scaledCost = Math.round(food.estimatedCostINR * portionMultiplier);

          return (
            <div
              key={food.id}
              className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        {food.region}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-400">
                        {food.dietType}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {food.name}
                    </h3>
                    {food.nameTelugu && (
                      <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                        {food.nameTelugu}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSaveRecipe(food.id)}
                    title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
                    className={`p-2 rounded-xl transition-colors ${
                      isSaved
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-5 h-5 fill-amber-500" /> : <Bookmark className="w-5 h-5" />}
                  </button>
                </div>

                {/* Serving & Cost Bar */}
                <div className="mt-3 py-2 px-3 rounded-xl bg-slate-50 dark:bg-navy-950 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span>
                    <strong>Serving:</strong> {food.servingSize}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Est. {formatCurrencyINR(scaledCost)}
                  </span>
                </div>

                {/* Macro Nutrition Pills */}
                <div className="grid grid-cols-5 gap-1.5 text-center mt-3">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Calories</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {scaledCalories}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Protein</span>
                    <span className="text-xs font-black text-brand-500">{scaledProtein}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Carbs</span>
                    <span className="text-xs font-black text-amber-500">{scaledCarbs}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Fat</span>
                    <span className="text-xs font-black text-rose-500">{scaledFat}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 block">Fiber</span>
                    <span className="text-xs font-black text-cyan-500">{scaledFiber}g</span>
                  </div>
                </div>

                {/* Expandable Preparation Instructions */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs animate-in fade-in">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">
                        Ingredients:
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {food.ingredients.join(' • ')}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">
                        Preparation Steps ({food.preparationTimeMinutes} mins):
                      </span>
                      <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                        {food.preparationInstructions.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setExpandedFoodId(isExpanded ? null : food.id)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Hide Steps' : 'View Recipe'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddToGrocery(food)}
                    title="Add ingredients to grocery checklist"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-950 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogMeal(food)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log to Diary</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
