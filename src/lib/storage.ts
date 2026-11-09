import {
  UserProfile,
  MealLog,
  WorkoutLog,
  HydrationLog,
  SleepLog,
  GroceryItem,
  UserFeedback,
  AchievementBadge,
  Recipe,
} from '@/types';
import { INITIAL_BADGES } from '@/data/badges';
import { CURATED_RECIPES } from '@/data/recipes';
import { getTodayDateString } from './utils';

const STORAGE_KEYS = {
  USER_PROFILE: 'vitafit_user_profile',
  MEAL_LOGS: 'vitafit_meal_logs',
  WORKOUT_LOGS: 'vitafit_workout_logs',
  HYDRATION_LOGS: 'vitafit_hydration_logs',
  SLEEP_LOGS: 'vitafit_sleep_logs',
  GROCERY_ITEMS: 'vitafit_grocery_items',
  SAVED_RECIPES: 'vitafit_saved_recipes',
  ACHIEVEMENTS: 'vitafit_badges',
  FEEDBACK: 'vitafit_feedback',
  SETTINGS: 'vitafit_settings',
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  uid: 'demo-user-101',
  email: 'arjun.sharma@example.com',
  displayName: 'Arjun Sharma',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  role: 'user',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  onboardingCompleted: true,
  age: 28,
  gender: 'male',
  heightCm: 175,
  weightKg: 72,
  preferredUnits: 'metric',
  activityLevel: 'moderately-active',
  dietPreference: 'vegetarian',
  allergies: ['Peanuts'],
  dietaryRestrictions: ['Lactose sensitive'],
  equipment: 'dumbbells',
  workoutLocation: 'home',
  budgetPerDay: 250,
  preferredLanguage: 'en',
  primaryGoal: 'build-muscle',
  healthConsentGiven: true,
  bmi: 23.5,
  bmiCategory: 'Normal weight',
  bmr: 1675,
  tdee: 2596,
  targetCalories: 2846,
  targetProteinGrams: 130,
  targetCarbsGrams: 375,
  targetFatGrams: 85,
  targetWaterMl: 2750,
  isMinor: false,
};

export const INITIAL_MEALS: MealLog[] = [
  {
    id: 'meal-1',
    userId: 'demo-user-101',
    date: getTodayDateString(),
    mealType: 'breakfast',
    foodName: 'Steamed Idli with Sambar & Coconut Chutney',
    portionMultiplier: 1.5,
    calories: 330,
    protein: 12,
    carbs: 63,
    fat: 4.5,
    verifiedByAi: true,
    notes: 'South Indian probiotic morning fuel',
    loggedAt: '08:30 AM',
  },
  {
    id: 'meal-2',
    userId: 'demo-user-101',
    date: getTodayDateString(),
    mealType: 'lunch',
    foodName: 'Whole Wheat Phulkas with Yellow Dal Tadka & Salad',
    portionMultiplier: 1.0,
    calories: 340,
    protein: 13,
    carbs: 60,
    fat: 6,
    verifiedByAi: false,
    notes: '2 phulkas + 1 cup yellow dal + sliced cucumber',
    loggedAt: '01:15 PM',
  },
  {
    id: 'meal-3',
    userId: 'demo-user-101',
    date: getTodayDateString(),
    mealType: 'snack',
    foodName: 'Sprouted Green Moong & Pomegranate Chaat',
    portionMultiplier: 1.0,
    calories: 140,
    protein: 9,
    carbs: 23,
    fat: 1,
    verifiedByAi: true,
    notes: 'Pre-workout afternoon snack',
    loggedAt: '05:00 PM',
  },
];

export const INITIAL_WORKOUTS: WorkoutLog[] = [
  {
    id: 'work-1',
    userId: 'demo-user-101',
    date: getTodayDateString(),
    exerciseId: 'ex-surya-namaskar',
    exerciseName: 'Classical Surya Namaskar (8 rounds)',
    category: 'yoga',
    durationMinutes: 20,
    estimatedCaloriesBurned: 110,
    notes: 'Morning mobility flow',
    completedAt: '07:15 AM',
  },
  {
    id: 'work-2',
    userId: 'demo-user-101',
    date: getTodayDateString(),
    exerciseId: 'ex-bodyweight-squats',
    exerciseName: 'Bodyweight Squats & Incline Push-ups',
    category: 'bodyweight',
    durationMinutes: 25,
    estimatedCaloriesBurned: 145,
    notes: '4 sets of 15 squats + 3 sets push-ups',
    completedAt: '06:30 PM',
  },
];

export const INITIAL_HYDRATION: HydrationLog[] = [
  { id: 'h-1', userId: 'demo-user-101', date: getTodayDateString(), amountMl: 500, loggedAt: '07:30 AM' },
  { id: 'h-2', userId: 'demo-user-101', date: getTodayDateString(), amountMl: 350, loggedAt: '10:15 AM' },
  { id: 'h-3', userId: 'demo-user-101', date: getTodayDateString(), amountMl: 500, loggedAt: '01:00 PM' },
  { id: 'h-4', userId: 'demo-user-101', date: getTodayDateString(), amountMl: 400, loggedAt: '04:30 PM' },
];

export const INITIAL_SLEEP: SleepLog[] = [
  {
    id: 's-1',
    userId: 'demo-user-101',
    date: getTodayDateString(),
    bedTime: '23:00',
    wakeTime: '06:45',
    durationHours: 7.75,
    sleepQuality: 'good',
    notes: 'Woke up refreshed after magnesium and cool room temperature.',
    loggedAt: '07:00 AM',
  },
];

export const INITIAL_GROCERY: GroceryItem[] = [
  { id: 'g-1', userId: 'demo-user-101', name: 'Whole Green Moong Gram', quantity: '500g', category: 'grains-lentils', completed: true, estimatedCostINR: 65, createdAt: new Date().toISOString() },
  { id: 'g-2', userId: 'demo-user-101', name: 'Fresh Spinach (Palak)', quantity: '2 bunches', category: 'produce', completed: false, estimatedCostINR: 30, createdAt: new Date().toISOString() },
  { id: 'g-3', userId: 'demo-user-101', name: 'Low-fat Artisanal Paneer', quantity: '400g', category: 'dairy-eggs', completed: false, estimatedCostINR: 130, createdAt: new Date().toISOString() },
  { id: 'g-4', userId: 'demo-user-101', name: 'Fresh Pomegranates', quantity: '1 kg', category: 'produce', completed: false, estimatedCostINR: 90, createdAt: new Date().toISOString() },
  { id: 'g-5', userId: 'demo-user-101', name: 'Cold-pressed Sesame Oil', quantity: '500ml', category: 'spices-oils', completed: true, estimatedCostINR: 120, createdAt: new Date().toISOString() },
];

// Helper to access LocalStorage safely
export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

export { STORAGE_KEYS };
