import { ActivityLevel, PrimaryGoal } from '@/types';

export interface CalculationResult {
  isMinor: boolean;
  bmi: number;
  bmiCategory: string;
  bmiCategoryAsian: string;
  bmr: number;
  tdee: number;
  targetCalories: number;
  calorieAdjustmentNote: string;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  waterTargetMl: number;
  limitations: string[];
  safetyGuidance: string[];
}

export function calculateNutritionProfile(params: {
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  primaryGoal: PrimaryGoal;
}): CalculationResult {
  const { age, gender, heightCm, weightKg, activityLevel, primaryGoal } = params;

  const isMinor = age < 18;

  // Calculate BMI
  const heightM = heightCm / 100;
  const rawBmi = heightM > 0 ? weightKg / (heightM * heightM) : 22;
  const bmi = Math.round(rawBmi * 10) / 10;

  // Standard WHO BMI Categories
  let bmiCategory = 'Normal weight';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Normal weight';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obesity';

  // Consensus guidelines for Asian Indians (lower cutoffs due to visceral adiposity)
  let bmiCategoryAsian = 'Normal';
  if (bmi < 18.5) bmiCategoryAsian = 'Underweight';
  else if (bmi < 23) bmiCategoryAsian = 'Normal';
  else if (bmi < 25) bmiCategoryAsian = 'Overweight';
  else bmiCategoryAsian = 'Obese';

  // Mifflin-St Jeor Equation for BMR
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else if (gender === 'female') {
    bmr -= 161;
  } else {
    // Average for non-binary or unstated
    bmr -= 78;
  }
  bmr = Math.round(bmr);

  // Activity Multipliers
  const activityFactors: Record<ActivityLevel, number> = {
    'sedentary': 1.2,
    'lightly-active': 1.375,
    'moderately-active': 1.55,
    'very-active': 1.725,
    'extremely-active': 1.9,
  };
  const factor = activityFactors[activityLevel] || 1.2;
  const tdee = Math.round(bmr * factor);

  let targetCalories = tdee;
  let calorieAdjustmentNote = 'Maintaining current energy balance with nutrient-dense foods.';

  if (isMinor) {
    // STRICT SAFETY RULE: For minors, never prescribe restrictive deficits or aggressive targets.
    targetCalories = tdee;
    calorieAdjustmentNote = 'For individuals under 18, VitaFit AI prioritizes natural growth, nutrient density, and balanced eating rather than calorie deficits.';
  } else {
    // Safe adult goals
    if (primaryGoal === 'build-muscle') {
      targetCalories = Math.round(tdee + 250);
      calorieAdjustmentNote = 'Lean surplus (+250 kcal) to fuel muscle synthesis without unnecessary fat gain.';
    } else if (primaryGoal === 'weight-management') {
      // Conservative, sustainable deficit of max 15-20% (approx 300-400 kcal), never below safe minimums (1200 for women, 1500 for men)
      const safeDeficit = Math.min(350, Math.round(tdee * 0.15));
      const minCalories = gender === 'female' ? 1250 : 1500;
      targetCalories = Math.max(minCalories, tdee - safeDeficit);
      calorieAdjustmentNote = 'Gentle, sustainable deficit (~300-350 kcal) designed to protect muscle mass and metabolic health.';
    } else if (primaryGoal === 'improve-stamina') {
      targetCalories = tdee;
      calorieAdjustmentNote = 'Iso-caloric athletic fueling emphasizing complex carbohydrates for glycogen replenishment.';
    } else {
      targetCalories = tdee;
    }
  }

  // Macronutrient distribution
  // Protein: 1.6g-2.0g per kg for active/muscle, 1.0-1.2g per kg for general maintenance
  let proteinPerKg = 1.2;
  if (primaryGoal === 'build-muscle') proteinPerKg = 1.8;
  else if (activityLevel === 'very-active' || activityLevel === 'extremely-active') proteinPerKg = 1.6;
  else if (primaryGoal === 'weight-management') proteinPerKg = 1.5; // preserve lean mass

  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const proteinCalories = proteinGrams * 4;

  // Fat: 25% to 30% of target calories
  const fatCalories = Math.round(targetCalories * 0.27);
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs: Remainder of calories
  const carbsCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbsGrams = Math.round(carbsCalories / 4);

  // Fiber: 14g per 1000 kcal (standard dietary recommendation)
  const fiberGrams = Math.round((targetCalories / 1000) * 14);

  // Hydration baseline: ~35ml per kg of body weight, rounded to nearest 250ml
  const waterTargetMl = Math.min(4000, Math.max(2000, Math.round((weightKg * 35) / 250) * 250));

  const limitations = [
    'BMI is a population-level screening metric; it does not directly distinguish between lean skeletal muscle mass and adipose tissue.',
    'BMR calculations via the Mifflin-St Jeor formula provide a statistically sound baseline (±10% variance depending on thyroid activity, genetics, and lean body mass).',
    'TDEE fluctuates based on non-exercise activity thermogenesis (NEAT), environmental temperature, digestion, and workout intensity.',
    'Hydration requirements vary with climate, sweat rate, and sodium intake; targets are educational guidelines, not strict clinical prescriptions.',
  ];

  const safetyGuidance = isMinor
    ? [
        'Adolescents require adequate energy and micronutrients (calcium, iron, vitamin D) for skeletal bone development and hormonal balance.',
        'Never skip meals or restrict food groups without supervision from a registered pediatric dietitian.',
        'Focus on colorful home-cooked foods, regular sports, and consistent 8-9 hours of sleep.',
      ]
    : [
        'VitaFit AI adheres to evidence-based dietary guidelines, avoiding crash dieting and extreme deficits.',
        'Sustainable fat loss is typically 0.25 to 0.5 kg per week to prevent metabolic adaptation and muscle loss.',
        'Always consult with a licensed physician or registered dietitian before initiating a strenuous new training program or dramatic dietary change.',
      ];

  return {
    isMinor,
    bmi,
    bmiCategory,
    bmiCategoryAsian,
    bmr,
    tdee,
    targetCalories,
    calorieAdjustmentNote,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams,
    waterTargetMl,
    limitations,
    safetyGuidance,
  };
}
