'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { CURATED_RECIPES } from '@/data/recipes';
import { Recipe } from '@/types';
import { formatCurrencyINR } from '@/lib/utils';
import {
  BookOpen,
  Search,
  Bookmark,
  BookmarkCheck,
  ShoppingCart,
  Clock,
  Flame,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export default function RecipeLibraryPage() {
  const { user } = useAuth();
  const { savedRecipeIds, toggleSaveRecipe, addRecipeIngredientsToGrocery } = useFitnessData();

  const [search, setSearch] = useState('');
  const [filterCuisine, setFilterCuisine] = useState<string>('all');
  const [filterDiet, setFilterDiet] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [servingScale, setServingScale] = useState<number>(2);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filtered = CURATED_RECIPES.filter((r) => {
    const qMatches =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.titleTelugu && r.titleTelugu.includes(search)) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const cMatches = filterCuisine === 'all' || r.cuisine === filterCuisine;
    const dMatches = filterDiet === 'all' || r.dietType === filterDiet;

    return qMatches && cMatches && dMatches;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-brand-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Curated Healthy Recipe Library
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            Authentic &amp; Measured
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Nutrient-dense South &amp; North Indian culinary traditions formulated with wholesome ingredients and exact macro breakdowns.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={filterCuisine}
            onChange={(e) => setFilterCuisine(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
          >
            <option value="all">All Cuisines</option>
            <option value="South Indian">South Indian</option>
            <option value="North Indian">North Indian</option>
          </select>

          <select
            value={filterDiet}
            onChange={(e) => setFilterDiet(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
          >
            <option value="all">All Diets</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes, tags (e.g. Iron Rich)..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((r) => {
          const isSaved = savedRecipeIds.includes(r.id);
          return (
            <div
              key={r.id}
              className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-brand-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.imageUrl}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {r.cuisine}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500 text-white">
                      {r.dietType}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      toggleSaveRecipe(r.id);
                      showToast(isSaved ? 'Removed from favorites' : 'Saved to favorites!');
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                      isSaved ? 'bg-amber-500 text-white' : 'bg-black/50 text-white hover:bg-black/80'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 fill-white" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                      {r.title}
                    </h3>
                    {r.titleTelugu && (
                      <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                        {r.titleTelugu}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {r.description}
                  </p>

                  {/* Macro Pills */}
                  <div className="grid grid-cols-4 gap-1.5 text-center py-1">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[9px] text-slate-400 block">Calories</span>
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {r.caloriesPerServing}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[9px] text-slate-400 block">Protein</span>
                      <span className="text-xs font-black text-brand-500">{r.protein}g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[9px] text-slate-400 block">Carbs</span>
                      <span className="text-xs font-black text-amber-500">{r.carbs}g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[9px] text-slate-400 block">Fat</span>
                      <span className="text-xs font-black text-rose-500">{r.fat}g</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {r.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    addRecipeIngredientsToGrocery(r);
                    showToast(`Added ${r.ingredients.length} ingredients to your Grocery List!`);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-500"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-brand-500" />
                  <span>+ Grocery List</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRecipe(r)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 transition-all shadow-sm"
                >
                  View Full Recipe
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Full Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedRecipe.title}
                </h3>
                {selectedRecipe.titleTelugu && (
                  <p className="text-xs text-brand-500">{selectedRecipe.titleTelugu}</p>
                )}
                <span className="text-xs text-slate-400 mt-1 block">
                  Prep: {selectedRecipe.prepTimeMinutes}m • Cook: {selectedRecipe.cookTimeMinutes}m • {selectedRecipe.caloriesPerServing} kcal / serving
                </span>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Ingredients list */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">
                Ingredients Required:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{ing.name}</span>
                    <span className="text-slate-400 font-mono">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cooking steps */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">
                Cooking Instructions:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedRecipe.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>

            {/* Health benefits */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
              <span className="font-bold">Nutritional &amp; Longevity Benefits:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {selectedRecipe.healthBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  addRecipeIngredientsToGrocery(selectedRecipe);
                  showToast('Ingredients added to your grocery checklist!');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500"
              >
                Add All Ingredients to Grocery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
