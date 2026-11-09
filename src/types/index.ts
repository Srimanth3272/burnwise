export type DietPreference = 'vegetarian' | 'vegan' | 'eggetarian' | 'non-vegetarian';
export type ActivityLevel = 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active';
export type EquipmentAccess = 'none' | 'dumbbells' | 'resistance-bands' | 'full-gym' | 'home-gym';
export type WorkoutLocation = 'home' | 'gym' | 'outdoors' | 'hybrid';
export type PrimaryGoal = 'maintain' | 'general-health' | 'build-muscle' | 'improve-stamina' | 'weight-management' | 'flexibility';
export type LanguagePreference = 'en' | 'te'; // English or Telugu

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  // Onboarding data
  onboardingCompleted: boolean;
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  heightCm: number;
  weightKg: number;
  preferredUnits: 'metric' | 'imperial';
  activityLevel: ActivityLevel;
  dietPreference: DietPreference;
  allergies: string[];
  dietaryRestrictions: string[];
  equipment: EquipmentAccess;
  workoutLocation: WorkoutLocation;
  budgetPerDay: number; // in INR
  preferredLanguage: LanguagePreference;
  primaryGoal: PrimaryGoal;
  healthConsentGiven: boolean;
  // Calculated metrics
  bmi?: number;
  bmiCategory?: string;
  bmr?: number;
  tdee?: number;
  targetCalories?: number;
  targetProteinGrams?: number;
  targetCarbsGrams?: number;
  targetFatGrams?: number;
  targetWaterMl?: number;
  isMinor?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  nameTelugu?: string;
  region: 'South Indian' | 'North Indian' | 'Pan-Indian' | 'Global';
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'beverage';
  dietType: DietPreference;
  servingSize: string;
  servingWeightGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  ingredients: string[];
  preparationTimeMinutes: number;
  estimatedCostINR: number;
  preparationInstructions: string[];
  image?: string;
  isPopular?: boolean;
}

export interface MealLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  foodName: string;
  portionMultiplier: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  verifiedByAi?: boolean;
  notes?: string;
  loggedAt: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  nameTelugu?: string;
  category: 'walking' | 'jogging' | 'cycling' | 'yoga' | 'stretching' | 'bodyweight' | 'strength' | 'mobility' | 'sports';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipmentRequired: string[];
  recommendedDurationMins: number;
  caloriesBurnedPerMin: number;
  instructions: string[];
  safetyNotes: string[];
  targetMuscles: string[];
  mediaUrl: string; // Video or high quality illustration
  homeFriendly: boolean;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  date: string;
  exerciseId: string;
  exerciseName: string;
  category: string;
  durationMinutes: number;
  estimatedCaloriesBurned: number;
  notes?: string;
  completedAt: string;
}

export interface HydrationLog {
  id: string;
  userId: string;
  date: string;
  amountMl: number;
  loggedAt: string;
}

export interface SleepLog {
  id: string;
  userId: string;
  date: string;
  bedTime: string; // HH:mm
  wakeTime: string; // HH:mm
  durationHours: number;
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
  loggedAt: string;
}

export interface GroceryItem {
  id: string;
  userId: string;
  name: string;
  nameTelugu?: string;
  quantity: string;
  category: 'produce' | 'grains-lentils' | 'dairy-eggs' | 'spices-oils' | 'protein' | 'other';
  completed: boolean;
  addedFromMealId?: string;
  estimatedCostINR?: number;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  titleTelugu?: string;
  description: string;
  cuisine: 'South Indian' | 'North Indian' | 'Fusion';
  dietType: DietPreference;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tags: string[];
  estimatedCostINR: number;
  imageUrl: string;
  healthBenefits: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'nutrition' | 'exercise' | 'hydration' | 'mindset';
  unlockedAt?: string;
  isUnlocked: boolean;
  progressPercent: number;
}

export interface VoiceCommandResult {
  action: 'log_meal' | 'log_water' | 'query_nutrition' | 'suggest_meal' | 'show_activity' | 'unknown';
  confidence: number;
  transcription: string;
  detectedLanguage: 'en' | 'te';
  parsedData: {
    mealType?: 'breakfast' | 'lunch' | 'snack' | 'dinner';
    foodItems?: { name: string; quantity: string; calories: number }[];
    waterAmountMl?: number;
    query?: string;
  };
  assistantReply: string;
  assistantReplyTelugu?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsersToday: number;
  totalMealsLogged: number;
  totalWorkoutsLogged: number;
  aiScansProcessed: number;
  voiceQueriesHandled: number;
  serverUptimeHours: number;
  systemHealth: 'optimal' | 'warning' | 'degraded';
}

export interface UserFeedback {
  id: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  category: 'general' | 'bug' | 'feature' | 'recipe';
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}
