'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { formatCurrencyINR } from '@/lib/utils';
import {
  ShoppingCart,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Check,
  RotateCcw,
} from 'lucide-react';

export default function GroceryListPage() {
  const { user } = useAuth();
  const {
    groceryItems,
    addGroceryItem,
    toggleGroceryItem,
    removeGroceryItem,
    clearCompletedGrocery,
  } = useFitnessData();

  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('500g');
  const [newItemCategory, setNewItemCategory] = useState<any>('produce');
  const [newItemCost, setNewItemCost] = useState<number>(40);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addGroceryItem({
      name: newItemName.trim(),
      quantity: newItemQty,
      category: newItemCategory,
      completed: false,
      estimatedCostINR: Number(newItemCost) || 0,
    });

    setNewItemName('');
  };

  const categories = [
    { id: 'produce', label: 'Fresh Produce & Vegetables' },
    { id: 'grains-lentils', label: 'Whole Grains & Pulses (Dals)' },
    { id: 'dairy-eggs', label: 'Dairy & Farm Eggs' },
    { id: 'spices-oils', label: 'Spices & Cold-Pressed Oils' },
    { id: 'protein', label: 'Lean Proteins & Meats' },
    { id: 'other', label: 'Other Essentials' },
  ];

  const totalCost = groceryItems.reduce((acc, i) => acc + (i.estimatedCostINR || 0), 0);
  const completedCount = groceryItems.filter((i) => i.completed).length;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Smart Grocery Shopping List
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
              Categorized Checklist
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Auto-populated from your diet plans, recipes, and custom kitchen staples with estimated local INR pricing.
          </p>
        </div>

        {/* Clear Completed */}
        {completedCount > 0 && (
          <button
            onClick={clearCompletedGrocery}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear {completedCount} Checked Items</span>
          </button>
        )}
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Items</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {groceryItems.length}{' '}
            <span className="text-xs font-normal text-slate-400">items</span>
          </div>
          <span className="text-[11px] text-emerald-500 font-semibold">
            {completedCount} purchased ({Math.round((completedCount / (groceryItems.length || 1)) * 100)}%)
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Estimated Total Cost</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatCurrencyINR(totalCost)}
          </div>
          <span className="text-[11px] text-slate-400">Estimated Indian market rates</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase">Remaining to Buy</span>
          <div className="text-2xl font-black text-brand-600 dark:text-brand-400">
            {groceryItems.length - completedCount} items
          </div>
          <span className="text-[11px] text-slate-400">Ticked off items stay synced</span>
        </div>
      </div>

      {/* Add Custom Item Card */}
      <form
        onSubmit={handleAddItem}
        className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
      >
        <h3 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
          Add Custom Item to Checklist:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              required
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="e.g. Fresh Coriander Bunch"
              className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-500 shadow-sm flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Checklist</span>
            </button>
          </div>
        </div>
      </form>

      {/* Categorized List Display */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const itemsInCat = groceryItems.filter((i) => i.category === cat.id);
          if (itemsInCat.length === 0) return null;

          return (
            <div
              key={cat.id}
              className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {cat.label} ({itemsInCat.length})
                </h4>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Est. {formatCurrencyINR(itemsInCat.reduce((acc, i) => acc + (i.estimatedCostINR || 0), 0))}
                </span>
              </div>

              <div className="space-y-2">
                {itemsInCat.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleGroceryItem(item.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      item.completed
                        ? 'bg-slate-50 dark:bg-navy-950/40 border-slate-100 dark:border-slate-800/40 opacity-60'
                        : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-slate-800 hover:border-brand-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          item.completed
                            ? 'bg-brand-500 border-brand-500 text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span
                          className={`text-xs font-bold block ${
                            item.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-400">{item.quantity}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.estimatedCostINR && (
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {formatCurrencyINR(item.estimatedCostINR)}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGroceryItem(item.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
