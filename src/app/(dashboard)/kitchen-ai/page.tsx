'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import {
  ChefHat,
  Sparkles,
  Plus,
  X,
  ShoppingCart,
  Bookmark,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export default function KitchenAIPage() {
  const { user } = useAuth();
  const { addGroceryItem, toggleSaveRecipe, isRecipeSaved } = useFitnessData();

  const [ingredients, setIngredients] = useState<string[]>([
    'Rice',
    'Tomatoes',
    'Onions',
    'Spinach',
    'Eggs',
  ]);
  const [customInput, setCustomInput] = useState('');
  const [cuisine, setCuisine] = useState<'South Indian' | 'North Indian' | 'Pan-Indian'>('South Indian');
  const [loading, setLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const quickPantryStaples = [
    'Toor Dal',
    'Moong Dal',
    'Paneer',
    'Potatoes',
    'Curd (Dahi)',
    'Green Chilies',
    'Ginger & Garlic',
    'Mustard Seeds',
    'Whole Wheat Atta',
    'Chicken Breast',
    'Coconut',
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddIngredient = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCustomInput('');
    }
  };

  const handleRemoveIngredient = (item: string) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/kitchen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients,
          cuisine,
          dietPreference: user?.dietPreference || 'vegetarian',
        }),
      });

      const data = await res.json();
      if (data.success && data.recipes) {
        setGeneratedRecipes(data.recipes);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMissingToGrocery = (missing: string[]) => {
    missing.forEach((item) => {
      addGroceryItem({
        name: item,
        quantity: 'As needed',
        category: 'spices-oils',
        completed: false,
      });
    });
    showToast(`Added ${missing.length} missing ingredients to Grocery Checklist!`);
  };

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
            What&apos;s in My Kitchen? AI
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-semibold border border-amber-500/20">
            Intelligent Pantry Matcher
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tell VitaFit AI what ingredients you have at home. We will design nutritious Indian meals, calculate macros, and suggest substitutes.
        </p>
      </div>

      {/* Input Console */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Available Ingredients in Your Kitchen
            </h3>
            <p className="text-xs text-slate-400">Add vegetables, grains, pulses, dairy or spices</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Cuisine:</span>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
            >
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Pan-Indian">Pan-Indian</option>
            </select>
          </div>
        </div>

        {/* Selected Ingredients Tag Cloud */}
        <div className="flex flex-wrap items-center gap-2 min-h-12 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
          {ingredients.length === 0 ? (
            <span className="text-xs text-slate-400">No ingredients added yet. Add items below!</span>
          ) : (
            ingredients.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveIngredient(item)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Input Form & Quick Staples */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddIngredient(customInput);
                }
              }}
              placeholder="Type an ingredient (e.g. Sambar onions, capsicum, eggs)..."
              className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => handleAddIngredient(customInput)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 transition-colors"
            >
              Add
            </button>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Quick Staples to Add:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPantryStaples.map((staple) => (
                <button
                  key={staple}
                  type="button"
                  onClick={() => handleAddIngredient(staple)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-navy-950 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  + {staple}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || ingredients.length === 0}
          className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'AI Generating Custom Recipes...' : 'Generate Meal Recipes from My Kitchen'}</span>
        </button>
      </div>

      {/* Generated Recipes Grid */}
      {generatedRecipes.length > 0 && (
        <div className="space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              AI Tailored Recipes ({generatedRecipes.length} Found)
            </h3>
            <span className="text-xs text-brand-500 font-semibold">Matched to Your Pantry</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedRecipes.map((recipe, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-brand-500/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        {recipe.cuisine}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                        {recipe.title}
                      </h4>
                      {recipe.titleTelugu && (
                        <p className="text-xs text-brand-500 font-medium">{recipe.titleTelugu}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                    {recipe.description}
                  </p>

                  {/* Macros Pills */}
                  <div className="grid grid-cols-4 gap-2 text-center my-3">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[10px] text-slate-400 block">Calories</span>
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {recipe.caloriesPerServing}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[10px] text-slate-400 block">Protein</span>
                      <span className="text-xs font-black text-brand-500">{recipe.protein}g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[10px] text-slate-400 block">Carbs</span>
                      <span className="text-xs font-black text-amber-500">{recipe.carbs}g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                      <span className="text-[10px] text-slate-400 block">Fat</span>
                      <span className="text-xs font-black text-rose-500">{recipe.fat}g</span>
                    </div>
                  </div>

                  {/* Missing ingredients */}
                  {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Missing Ingredients:
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddMissingToGrocery(recipe.missingIngredients)}
                          className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
                        >
                          + Add to Grocery List
                        </button>
                      </div>
                      <p>{recipe.missingIngredients.join(', ')}</p>
                    </div>
                  )}

                  {/* Substitutions */}
                  {recipe.substitutions && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
                      💡 <strong>Smart Swap:</strong> {recipe.substitutions}
                    </div>
                  )}

                  {/* Steps */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">
                      Preparation Instructions:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {recipe.steps.map((st: string, sIdx: number) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      toggleSaveRecipe(`custom-kitchen-${idx}`);
                      showToast('Saved recipe to your favorites!');
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-navy-950 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save to My Recipes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
