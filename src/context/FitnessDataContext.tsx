'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MealLog,
  WorkoutLog,
  HydrationLog,
  SleepLog,
  GroceryItem,
  Recipe,
  AchievementBadge,
} from '@/types';
import {
  STORAGE_KEYS,
  INITIAL_MEALS,
  INITIAL_WORKOUTS,
  INITIAL_HYDRATION,
  INITIAL_SLEEP,
  INITIAL_GROCERY,
  getStoredData,
  setStoredData,
} from '@/lib/storage';
import { INITIAL_BADGES } from '@/data/badges';
import { CURATED_RECIPES } from '@/data/recipes';
import { getTodayDateString } from '@/lib/utils';
import { useAuth } from './AuthContext';

export interface ReminderSettings {
  waterReminders: boolean;
  exerciseReminders: boolean;
  mealLoggingReminders: boolean;
  sleepReminders: boolean;
  weeklySummaryEmail: boolean;
}

interface FitnessDataContextType {
  // Meals
  mealLogs: MealLog[];
  addMealLog: (meal: Omit<MealLog, 'id' | 'loggedAt' | 'userId'>) => void;
  removeMealLog: (id: string) => void;
  todayMeals: MealLog[];
  todayCaloriesConsumed: number;
  todayProteinConsumed: number;
  todayCarbsConsumed: number;
  todayFatConsumed: number;

  // Workouts
  workoutLogs: WorkoutLog[];
  addWorkoutLog: (workout: Omit<WorkoutLog, 'id' | 'completedAt' | 'userId'>) => void;
  removeWorkoutLog: (id: string) => void;
  todayWorkouts: WorkoutLog[];
  todayActiveMinutes: number;
  todayCaloriesBurned: number;

  // Hydration
  hydrationLogs: HydrationLog[];
  addWaterIntake: (amountMl: number) => void;
  todayWaterMl: number;
  targetWaterMl: number;

  // Sleep
  sleepLogs: SleepLog[];
  addSleepLog: (sleep: Omit<SleepLog, 'id' | 'loggedAt' | 'userId'>) => void;
  latestSleep: SleepLog | undefined;

  // Grocery
  groceryItems: GroceryItem[];
  addGroceryItem: (item: Omit<GroceryItem, 'id' | 'createdAt' | 'userId'>) => void;
  toggleGroceryItem: (id: string) => void;
  removeGroceryItem: (id: string) => void;
  clearCompletedGrocery: () => void;
  addRecipeIngredientsToGrocery: (recipe: Recipe) => void;

  // Saved Recipes
  savedRecipeIds: string[];
  toggleSaveRecipe: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;

  // Badges & Milestones
  badges: AchievementBadge[];

  // Settings
  reminders: ReminderSettings;
  updateReminders: (newSettings: Partial<ReminderSettings>) => void;

  // Export
  exportAllDataAsJSON: () => void;
}

const FitnessDataContext = createContext<FitnessDataContextType | undefined>(undefined);

export function FitnessDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const today = getTodayDateString();

  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [hydrationLogs, setHydrationLogs] = useState<HydrationLog[]>([]);
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([]);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [badges, setBadges] = useState<AchievementBadge[]>([]);
  const [reminders, setReminders] = useState<ReminderSettings>({
    waterReminders: true,
    exerciseReminders: true,
    mealLoggingReminders: true,
    sleepReminders: true,
    weeklySummaryEmail: false,
  });

  // Load from storage on mount
  useEffect(() => {
    setMealLogs(getStoredData<MealLog[]>(STORAGE_KEYS.MEAL_LOGS, INITIAL_MEALS));
    setWorkoutLogs(getStoredData<WorkoutLog[]>(STORAGE_KEYS.WORKOUT_LOGS, INITIAL_WORKOUTS));
    setHydrationLogs(getStoredData<HydrationLog[]>(STORAGE_KEYS.HYDRATION_LOGS, INITIAL_HYDRATION));
    setSleepLogs(getStoredData<SleepLog[]>(STORAGE_KEYS.SLEEP_LOGS, INITIAL_SLEEP));
    setGroceryItems(getStoredData<GroceryItem[]>(STORAGE_KEYS.GROCERY_ITEMS, INITIAL_GROCERY));
    setSavedRecipeIds(getStoredData<string[]>(STORAGE_KEYS.SAVED_RECIPES, ['rec-high-protein-pesarattu']));
    setBadges(getStoredData<AchievementBadge[]>(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_BADGES));
    setReminders(
      getStoredData<ReminderSettings>(STORAGE_KEYS.SETTINGS, {
        waterReminders: true,
        exerciseReminders: true,
        mealLoggingReminders: true,
        sleepReminders: true,
        weeklySummaryEmail: false,
      })
    );
  }, []);

  // Today specific calculations
  const todayMeals = mealLogs.filter((m) => m.date === today);
  const todayCaloriesConsumed = todayMeals.reduce((acc, m) => acc + (m.calories || 0), 0);
  const todayProteinConsumed = todayMeals.reduce((acc, m) => acc + (m.protein || 0), 0);
  const todayCarbsConsumed = todayMeals.reduce((acc, m) => acc + (m.carbs || 0), 0);
  const todayFatConsumed = todayMeals.reduce((acc, m) => acc + (m.fat || 0), 0);

  const todayWorkouts = workoutLogs.filter((w) => w.date === today);
  const todayActiveMinutes = todayWorkouts.reduce((acc, w) => acc + (w.durationMinutes || 0), 0);
  const todayCaloriesBurned = todayWorkouts.reduce((acc, w) => acc + (w.estimatedCaloriesBurned || 0), 0);

  const todayHydrations = hydrationLogs.filter((h) => h.date === today);
  const todayWaterMl = todayHydrations.reduce((acc, h) => acc + (h.amountMl || 0), 0);
  const targetWaterMl = user?.targetWaterMl || 2500;

  const latestSleep = sleepLogs.length > 0 ? sleepLogs[sleepLogs.length - 1] : undefined;

  // Meal Handlers
  const addMealLog = (mealData: Omit<MealLog, 'id' | 'loggedAt' | 'userId'>) => {
    const newMeal: MealLog = {
      ...mealData,
      id: 'meal-' + Date.now(),
      userId: user?.uid || 'guest',
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newMeal, ...mealLogs];
    setMealLogs(updated);
    setStoredData(STORAGE_KEYS.MEAL_LOGS, updated);
  };

  const removeMealLog = (id: string) => {
    const updated = mealLogs.filter((m) => m.id !== id);
    setMealLogs(updated);
    setStoredData(STORAGE_KEYS.MEAL_LOGS, updated);
  };

  // Workout Handlers
  const addWorkoutLog = (workoutData: Omit<WorkoutLog, 'id' | 'completedAt' | 'userId'>) => {
    const newWorkout: WorkoutLog = {
      ...workoutData,
      id: 'workout-' + Date.now(),
      userId: user?.uid || 'guest',
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newWorkout, ...workoutLogs];
    setWorkoutLogs(updated);
    setStoredData(STORAGE_KEYS.WORKOUT_LOGS, updated);
  };

  const removeWorkoutLog = (id: string) => {
    const updated = workoutLogs.filter((w) => w.id !== id);
    setWorkoutLogs(updated);
    setStoredData(STORAGE_KEYS.WORKOUT_LOGS, updated);
  };

  // Hydration Handlers
  const addWaterIntake = (amountMl: number) => {
    const newEntry: HydrationLog = {
      id: 'hydro-' + Date.now(),
      userId: user?.uid || 'guest',
      date: today,
      amountMl,
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newEntry, ...hydrationLogs];
    setHydrationLogs(updated);
    setStoredData(STORAGE_KEYS.HYDRATION_LOGS, updated);
  };

  // Sleep Handlers
  const addSleepLog = (sleepData: Omit<SleepLog, 'id' | 'loggedAt' | 'userId'>) => {
    const newSleep: SleepLog = {
      ...sleepData,
      id: 'sleep-' + Date.now(),
      userId: user?.uid || 'guest',
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newSleep, ...sleepLogs];
    setSleepLogs(updated);
    setStoredData(STORAGE_KEYS.SLEEP_LOGS, updated);
  };

  // Grocery Handlers
  const addGroceryItem = (itemData: Omit<GroceryItem, 'id' | 'createdAt' | 'userId'>) => {
    const newItem: GroceryItem = {
      ...itemData,
      id: 'groc-' + Date.now(),
      userId: user?.uid || 'guest',
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...groceryItems];
    setGroceryItems(updated);
    setStoredData(STORAGE_KEYS.GROCERY_ITEMS, updated);
  };

  const toggleGroceryItem = (id: string) => {
    const updated = groceryItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setGroceryItems(updated);
    setStoredData(STORAGE_KEYS.GROCERY_ITEMS, updated);
  };

  const removeGroceryItem = (id: string) => {
    const updated = groceryItems.filter((i) => i.id !== id);
    setGroceryItems(updated);
    setStoredData(STORAGE_KEYS.GROCERY_ITEMS, updated);
  };

  const clearCompletedGrocery = () => {
    const updated = groceryItems.filter((i) => !i.completed);
    setGroceryItems(updated);
    setStoredData(STORAGE_KEYS.GROCERY_ITEMS, updated);
  };

  const addRecipeIngredientsToGrocery = (recipe: Recipe) => {
    const newItems: GroceryItem[] = recipe.ingredients.map((ing, idx) => ({
      id: `groc-${Date.now()}-${idx}`,
      userId: user?.uid || 'guest',
      name: ing.name,
      quantity: ing.amount,
      category: 'produce',
      completed: false,
      createdAt: new Date().toISOString(),
    }));
    const updated = [...newItems, ...groceryItems];
    setGroceryItems(updated);
    setStoredData(STORAGE_KEYS.GROCERY_ITEMS, updated);
  };

  // Saved Recipes
  const toggleSaveRecipe = (recipeId: string) => {
    let updated: string[];
    if (savedRecipeIds.includes(recipeId)) {
      updated = savedRecipeIds.filter((id) => id !== recipeId);
    } else {
      updated = [...savedRecipeIds, recipeId];
    }
    setSavedRecipeIds(updated);
    setStoredData(STORAGE_KEYS.SAVED_RECIPES, updated);
  };

  const isRecipeSaved = (recipeId: string) => savedRecipeIds.includes(recipeId);

  // Reminders Settings
  const updateReminders = (newSettings: Partial<ReminderSettings>) => {
    const updated = { ...reminders, ...newSettings };
    setReminders(updated);
    setStoredData(STORAGE_KEYS.SETTINGS, updated);
  };

  // Export Data
  const exportAllDataAsJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      userProfile: user,
      mealLogs,
      workoutLogs,
      hydrationLogs,
      sleepLogs,
      groceryItems,
      badges,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vitafit-ai-health-record-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <FitnessDataContext.Provider
      value={{
        mealLogs,
        addMealLog,
        removeMealLog,
        todayMeals,
        todayCaloriesConsumed,
        todayProteinConsumed,
        todayCarbsConsumed,
        todayFatConsumed,
        workoutLogs,
        addWorkoutLog,
        removeWorkoutLog,
        todayWorkouts,
        todayActiveMinutes,
        todayCaloriesBurned,
        hydrationLogs,
        addWaterIntake,
        todayWaterMl,
        targetWaterMl,
        sleepLogs,
        addSleepLog,
        latestSleep,
        groceryItems,
        addGroceryItem,
        toggleGroceryItem,
        removeGroceryItem,
        clearCompletedGrocery,
        addRecipeIngredientsToGrocery,
        savedRecipeIds,
        toggleSaveRecipe,
        isRecipeSaved,
        badges,
        reminders,
        updateReminders,
        exportAllDataAsJSON,
      }}
    >
      {children}
    </FitnessDataContext.Provider>
  );
}

export function useFitnessData() {
  const context = useContext(FitnessDataContext);
  if (!context) {
    throw new Error('useFitnessData must be used within a FitnessDataProvider');
  }
  return context;
}
