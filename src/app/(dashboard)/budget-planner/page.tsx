'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { formatCurrencyINR } from '@/lib/utils';
import {
  Wallet,
  AlertTriangle,
  CheckCircle2,
  ShoppingCart,
  Plus,
  Sparkles,
  TrendingUp,
  Info,
} from 'lucide-react';

export default function BudgetMealPlannerPage() {
  const { user } = useAuth();
  const { addGroceryItem, addMealLog } = useFitnessData();

  const [dailyBudget, setDailyBudget] = useState<number>(user?.budgetPerDay || 200);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Warning for unrealistic budget
  const isBudgetTooLow = dailyBudget < 120;

  // Curated affordable meal plans matching Indian budget levels
  const budgetTiers = [
    {
      slot: 'Breakfast',
      name: 'High-Protein Moong Pesarattu + Ginger Chutney',
      cost: 35,
      calories: 285,
      protein: 13,
      staples: 'Whole Green Moong Gram (₹15), Ginger & Cumin (₹10), Onion & Chutney (₹10)',
    },
    {
      slot: 'Lunch',
      name: 'Palak Pappu (Spinach Dal) + Steamed Rice + Carrot Salad',
      cost: 45,
      calories: 380,
      protein: 12,
      staples: 'Toor Dal (₹20), Fresh Spinach bunch (₹15), Rice portion (₹10)',
    },
    {
      slot: 'Evening Snack',
      name: 'Spiced Roasted Peanuts or Makhana + Black Tea / Majjiga',
      cost: 20,
      calories: 150,
      protein: 6,
      staples: 'Local Groundnuts or Curd Buttermilk (₹20)',
    },
    {
      slot: 'Dinner',
      name: '2 Farm Eggs Curry (or Paneer Bhurji) + 2 Whole Wheat Phulkas',
      cost: 50,
      calories: 420,
      protein: 21,
      staples: '2 Eggs (₹16), Atta Rotis (₹12), Onion-Tomato curry (₹22)',
    },
  ];

  const totalPlanCost = budgetTiers.reduce((acc, b) => acc + b.cost, 0);
  const totalPlanProtein = budgetTiers.reduce((acc, b) => acc + b.protein, 0);
  const totalPlanCalories = budgetTiers.reduce((acc, b) => acc + b.calories, 0);

  const handleAddAllToGrocery = () => {
    budgetTiers.forEach((tier) => {
      addGroceryItem({
        name: tier.name,
        quantity: 'Daily ration',
        category: 'produce',
        completed: false,
        estimatedCostINR: tier.cost,
      });
    });
    showToast(`Added full ₹${totalPlanCost} daily ration plan to your Grocery List!`);
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
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Smart Budget Meal Planner
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
              Nutrient-Dense &amp; Economical
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Achieve complete macro targets using local Indian grains, pulses, seasonal greens, and dairy without overspending.
          </p>
        </div>

        <button
          onClick={handleAddAllToGrocery}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-md shadow-brand-500/20 transition-all shrink-0"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add Plan to Grocery List</span>
        </button>
      </div>

      {/* Budget Slider & Target Selector */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Set Daily Food Budget Target:
            </label>
            <div className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 mt-1">
              {formatCurrencyINR(dailyBudget)}{' '}
              <span className="text-xs font-normal text-slate-400">/ day (~{formatCurrencyINR(dailyBudget * 7)} weekly)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[150, 200, 250, 350].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDailyBudget(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  dailyBudget === preset
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                ₹{preset}
              </button>
            ))}
          </div>
        </div>

        <input
          type="range"
          min={80}
          max={600}
          step={10}
          value={dailyBudget}
          onChange={(e) => setDailyBudget(Number(e.target.value))}
          className="w-full accent-brand-500"
        />

        {/* Warning if budget is too low */}
        {isBudgetTooLow && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Budget Adequacy Warning (Under ₹120/day)</p>
              <p className="leading-relaxed mt-0.5">
                Meeting daily protein requirements (&gt;60g) and essential micronutrients on less than ₹120 per day in urban India risks compromising dietary variety and nutrient density. We recommend at least ₹150–200/day for complete nutritional adequacy.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Plan Summary Highlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-900/40 via-navy-900 to-navy-950 border border-brand-500/30 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3">
            <span className="text-xs text-brand-300 uppercase font-bold block mb-1">
              Total Daily Cost
            </span>
            <div className="text-3xl font-black text-white">{formatCurrencyINR(totalPlanCost)}</div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
              ₹{dailyBudget - totalPlanCost >= 0 ? `${dailyBudget - totalPlanCost} surplus remaining` : 'On budget'}
            </span>
          </div>

          <div className="p-3">
            <span className="text-xs text-brand-300 uppercase font-bold block mb-1">
              Estimated Total Energy
            </span>
            <div className="text-3xl font-black text-white">~{totalPlanCalories} kcal</div>
            <span className="text-[11px] text-slate-300 mt-1 inline-block">Sustained glycemic energy</span>
          </div>

          <div className="p-3">
            <span className="text-xs text-brand-300 uppercase font-bold block mb-1">
              Complete Protein Intake
            </span>
            <div className="text-3xl font-black text-brand-400">{totalPlanProtein}g Protein</div>
            <span className="text-[11px] text-slate-300 mt-1 inline-block">Moong, Dal, Eggs / Paneer</span>
          </div>
        </div>
      </div>

      {/* Meal Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Affordable Meal Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetTiers.map((tier, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-brand-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    {tier.slot}
                  </span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    Est. {formatCurrencyINR(tier.cost)}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                  {tier.name}
                </h4>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 py-1">
                  <span>{tier.calories} kcal</span>
                  <span>•</span>
                  <span className="font-bold text-brand-500">{tier.protein}g Protein</span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-navy-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Cost Breakdown: </span>
                  {tier.staples}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    addGroceryItem({
                      name: tier.name,
                      quantity: '1 day portion',
                      category: 'produce',
                      completed: false,
                      estimatedCostINR: tier.cost,
                    });
                    showToast(`Added ${tier.name} to grocery list!`);
                  }}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add Ingredients</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    addMealLog({
                      date: new Date().toISOString().split('T')[0],
                      mealType: tier.slot.toLowerCase() as any,
                      foodName: tier.name,
                      portionMultiplier: 1.0,
                      calories: tier.calories,
                      protein: tier.protein,
                      carbs: 45,
                      fat: 7,
                    });
                    showToast(`Recorded ${tier.name} in today's meal log!`);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500"
                >
                  Log Meal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
