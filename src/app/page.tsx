'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Utensils,
  Dumbbell,
  ScanLine,
  ChefHat,
  Mic,
  Droplets,
  Moon,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Globe,
  Zap,
  Activity,
  Heart,
  Award,
  Play,
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does VitaFit AI support regional Indian diets like South Indian and North Indian?',
      a: 'Yes, absolutely! VitaFit AI has an extensive verified Indian food database covering traditional dishes such as Idli, Dosa, Pesarattu, Pongal, Dal Tadka, Sambar, Rasam, Curd Rice, Paneer, Chicken, and Fish. It provides accurate portion estimation in grams and household measures with protein, carbohydrate, and fat breakdowns.',
    },
    {
      q: 'How does the "Scan My Food" AI image recognition work?',
      a: 'You simply take a photo of your meal or upload an image. VitaFit AI runs multimodal neural analysis to identify the dishes, estimate portion sizes, and calculate macro and micronutrients. Crucially, it asks you to review and confirm ingredients and portion sizes before recording them into your food diary.',
    },
    {
      q: 'Does VitaFit AI support both English and Telugu (తెలుగు)?',
      a: 'Yes! VitaCoach and the voice assistant interact fluently in both English and Telugu. You can speak commands like "ఈరోజు నేను ఎంత నీళ్లు తాగాను?" or "I ate two idlis and one bowl of sambar", and the assistant will structure and log your data.',
    },
    {
      q: 'Is VitaFit AI safe for adolescents and minors?',
      a: 'Safety and evidence-based science are central to VitaFit AI. For minors under 18, our algorithms strictly avoid restrictive calorie deficits and weight-loss prescriptions, focusing instead on nutrient density, active play, sports, and healthy lifestyle habits.',
    },
    {
      q: 'Can I use VitaFit AI without gym equipment?',
      a: 'Yes! During your onboarding questionnaire, you can specify your workout preference (Home, Gym, Outdoors, or Hybrid) and your available equipment (None, Resistance Bands, Dumbbells, or Full Gym). You will receive custom video-guided routines suited to your exact environment.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-brand-500/20 via-emerald-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-50/80 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
              <span>Next-Gen Health SaaS • Powered by Multimodal AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Your Personal AI{' '}
              <span className="bg-gradient-to-r from-brand-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                Health & Fitness
              </span>{' '}
              Companion
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Smarter nutrition, personalized workouts and healthier everyday habits — all in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all text-base"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-navy-800 shadow-sm transition-all text-base"
              >
                <span>Explore Features</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero Fad Diets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>English & Telugu (తెలుగు)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Safe for All Ages</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero SaaS Preview Mockup */}
          <div className="mt-14 relative max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-navy-900/70 shadow-2xl backdrop-blur-xl p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">vitafit.ai/dashboard</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Live Demo Active
              </span>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Daily Energy */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-500/10 via-transparent to-transparent border border-brand-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Consumed</span>
                  <Utensils className="w-4 h-4 text-brand-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">810 <span className="text-xs font-normal text-slate-500">/ 2,846 kcal</span></div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-brand-500 h-full w-[28%]" />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">South Indian balanced breakfast & snack logged</p>
              </div>

              {/* Energy Burned */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Expended</span>
                  <Activity className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">255 <span className="text-xs font-normal text-slate-500">kcal burned</span></div>
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-2">Surya Namaskar + Squats</p>
                <p className="text-[11px] text-slate-400 mt-0.5">45 active workout minutes</p>
              </div>

              {/* Hydration */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Hydration</span>
                  <Droplets className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">1,750 <span className="text-xs font-normal text-slate-500">/ 2,750 ml</span></div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[63%]" />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">4 glasses logged today</p>
              </div>

              {/* Sleep Score */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sleep Rest</span>
                  <Moon className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">7h 45m</div>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  Optimal REM Recovery
                </span>
                <p className="text-[11px] text-slate-400 mt-1">Bedtime: 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW VITAFIT AI WORKS */}
      <section className="py-20 bg-white dark:bg-navy-900/50 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2">
              Simple 4-Step Journey
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How VitaFit AI Empowers You
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              No complicated calorie counting or impossible workout splits. Sustainable lifestyle habits built on real science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Personal Baselines',
                desc: 'Enter age, height, activity level, and dietary preferences. Our Mifflin-St Jeor engine computes baseline metrics without restrictive crash targets.',
                icon: ShieldCheck,
              },
              {
                step: '02',
                title: 'AI Food Scanner',
                desc: 'Snap a photograph of your home-cooked meal. Multimodal AI identifies dishes, estimates portions, and reveals true macronutrient values.',
                icon: ScanLine,
              },
              {
                step: '03',
                title: 'Indian Diet & Workouts',
                desc: 'Receive tailored daily meal plans (Pesarattu, Idli, Dal, Chicken, Paneer) and customized routines for home or gym with zero equipment barriers.',
                icon: Utensils,
              },
              {
                step: '04',
                title: 'Lifelong Vitality',
                desc: 'Track hydration, sleep hygiene, and active minutes with VitaCoach bilingual voice guidance and interactive weekly progress analytics.',
                icon: TrendingUp,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="relative p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-all hover:shadow-lg group"
                >
                  <span className="text-4xl font-black text-slate-200 dark:text-slate-800 group-hover:text-brand-500/30 transition-colors">
                    {card.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center my-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {card.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SMART NUTRITION & INDIAN DIET PLANNER */}
      <section id="features-section" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <Utensils className="w-3.5 h-3.5" />
                <span>Authentic Indian Nutrition Database</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Designed for South Indian & North Indian Lifestyles
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Most Western calorie apps fail to understand real Indian cooking: rasam, pesarattu, dal tadka, curds, or drumstick sambar. VitaFit AI features an extensive verified food library supporting vegetarian, eggetarian, vegan, and non-vegetarian choices.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  'Portion sizes in household measurements (cups, katoris, pieces)',
                  'Complete macro breakdown: Protein, Fiber, Net Carbs, and Healthy Fats',
                  'One-click meal swap and auto grocery shopping list generation',
                  'Telugu recipe titles and local spice instructions',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="/diet-planner"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500"
                >
                  <span>Explore Indian Diet Planner</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Meal Preview Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs">
                    AM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Andhra Pesarattu & Ginger Chutney
                    </h4>
                    <p className="text-xs text-slate-400">ఎమ్మెల్యే పెసరట్టు • 285 kcal</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500">
                  High Protein
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center py-2">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                  <span className="text-[10px] text-slate-400 block">Protein</span>
                  <span className="font-bold text-sm text-brand-500">13g</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                  <span className="text-[10px] text-slate-400 block">Carbs</span>
                  <span className="font-bold text-sm text-amber-500">46g</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                  <span className="text-[10px] text-slate-400 block">Fat</span>
                  <span className="font-bold text-sm text-rose-500">6g</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950">
                  <span className="text-[10px] text-slate-400 block">Fiber</span>
                  <span className="font-bold text-sm text-cyan-500">7g</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                &quot;Whole green moong beans soaked & ground with warming ginger and cumin. Naturally gluten-free and gut-friendly.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI FOOD IMAGE SCANNER ("SCAN MY FOOD") */}
      <section className="py-20 bg-slate-100/60 dark:bg-navy-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-950 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ScanLine className="w-5 h-5 text-brand-500 animate-pulse" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Scan My Food AI Scanner
                  </span>
                </div>
                <span className="text-xs bg-brand-500 text-white font-semibold px-2 py-0.5 rounded-full">
                  96% Match
                </span>
              </div>
              <div className="relative my-4 aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                {/* Simulated scan target */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80"
                  alt="Idli Sambar Scan Preview"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 border-2 border-brand-400 border-dashed m-6 rounded-xl animate-pulse" />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs">
                  Detected: 3 Steamed Idlis + 1 bowl Sambar
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    Estimated 310 kcal (11g Protein)
                  </p>
                  <p className="text-[11px] text-slate-400">User confirmation required before logging</p>
                </div>
                <Link
                  href="/food-scanner"
                  className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs"
                >
                  Try Scanner
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">
                <ScanLine className="w-3.5 h-3.5" />
                <span>Multimodal Vision Technology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Photograph Your Plate. Get Instant Nutrition Insights.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                No tedious searches or manual typing. Our multimodal AI identifies complex curries, mixed platters, and traditional Indian dishes in seconds.
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Transparent Estimates, Not False Absolutes
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We treat AI recognition as intelligent estimates. You can always adjust the number of idlis, rotis, or oil levels before saving to your food diary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT'S IN MY KITCHEN? & BUDGET PLANNER */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2">
              Innovative Cooking Intelligence
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What&apos;s in My Kitchen? & Smart Budget Planner
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Turn leftover pantry items into nutrient-dense Indian meals without exceeding your weekly budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kitchen AI Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <ChefHat className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                What&apos;s in My Kitchen? AI
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter ingredients like &quot;Rice, tomatoes, onions, spinach, eggs&quot;. VitaFit AI generates delicious recipes, identifies missing ingredients, and suggests smart substitutes.
              </p>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-navy-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 font-mono text-slate-600 dark:text-slate-300">
                <div className="text-emerald-500 font-bold">Suggested Dish:</div>
                <div>Tomato Spinach Egg Curry with Jeera Rice (410 kcal)</div>
                <div className="text-slate-400">Missing: Mustard seeds & fresh curry leaves</div>
              </div>
              <Link
                href="/kitchen-ai"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400"
              >
                Launch Kitchen AI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Smart Budget Meal Planner */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                Smart Budget Meal Planner
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Specify your daily or weekly budget (e.g. ₹200 / day). VitaFit AI compiles wholesome, high-protein Indian options (sprouted lentils, seasonal greens, curd, eggs) without sacrificing health.
              </p>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-navy-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 font-mono text-slate-600 dark:text-slate-300">
                <div className="text-brand-500 font-bold">Today&apos;s Budget Allocation: ₹180 / ₹200</div>
                <div>• Breakfast: Moong Pesarattu (₹35)</div>
                <div>• Lunch: Palak Pappu + Rice (₹45)</div>
                <div>• Dinner: 2 Boiled Eggs + Roti (₹40)</div>
              </div>
              <Link
                href="/budget-planner"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400"
              >
                Open Budget Planner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VITACOACH & VOICE ASSISTANT */}
      <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <Mic className="w-3.5 h-3.5" />
                <span>Multilingual Voice & Chat Assistant</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Meet VitaCoach: Your Bilingual AI Fitness Guide
              </h2>
              <p className="text-emerald-100/80 leading-relaxed text-sm sm:text-base">
                Ask questions verbally or type in English or Telugu. From explaining why toor dal and rice form a complete protein to suggesting safe hip stretches, VitaCoach is with you 24/7.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center font-bold text-xs">
                    EN
                  </div>
                  <p className="text-xs text-white">
                    &quot;I ate two idlis and one bowl of sambar.&quot; → Logged into morning meal diary.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center font-bold text-xs">
                    తె
                  </div>
                  <p className="text-xs text-white">
                    &quot;ఈరోజు నేను ఎంత నీళ్లు తాగాను?&quot; → 1,750ml నీటి రికార్డు తనిఖీ చేయబడింది.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-navy-950/80 border border-emerald-500/30 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-sm">VitaCoach Voice Console</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono">Microphone Ready</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Try hands-free logging while cooking or post-workout. VitaCoach transcribes, extracts ingredients, and confirms with you before saving any record.
              </p>
              <div className="pt-2">
                <Link
                  href="/voice-assistant"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-lg shadow-brand-500/30 transition-all"
                >
                  <Mic className="w-4 h-4" />
                  <span>Launch Voice Assistant</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROGRESS & ANALYTICS PREVIEW */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2">
              Holistic Analytics
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Measure What Truly Matters
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              We never rank users by weight or body appearance. VitaFit AI tracks habit consistency, energy equilibrium, hydration streaks, and restful sleep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">Energy Equilibrium</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Visualize daily consumed nutrition alongside estimated exercise expenditure to maintain balanced cellular energy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">Hydration Milestones</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Customizable glass sizes (250ml, 500ml, bottle) and gentle hydration reminders configured to your work schedule.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">Achievement Badges</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Celebrate healthy habit streaks, nutritious choices, and movement achievements with interactive celebratory confetti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-slate-50 dark:bg-navy-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2">
              Have Questions?
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-950 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-semibold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Start Your VitaFit AI Journey Today
          </h2>
          <p className="text-brand-100 text-base sm:text-lg max-w-2xl mx-auto">
            Take the 2-minute onboarding questionnaire and receive your customized Indian nutrition and activity baseline.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-100 shadow-xl transition-all text-base"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5 text-brand-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <Footer />
    </div>
  );
}
