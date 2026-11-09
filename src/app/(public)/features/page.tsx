import React from 'react';
import Link from 'next/link';
import {
  UtensilsCrossed,
  ScanLine,
  Dumbbell,
  ChefHat,
  Wallet,
  Mic,
  Droplets,
  Moon,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Globe,
  ArrowRight,
} from 'lucide-react';

export default function FeaturesPage() {
  const featureList = [
    {
      title: 'AI Indian Diet Planner',
      desc: 'Formulated for South and North Indian cuisines with macro breakdowns for Idli, Dosa, Pesarattu, Pongal, Dal, Sambar, Chicken, and Paneer.',
      icon: UtensilsCrossed,
      href: '/diet-planner',
      badge: 'Core Feature',
    },
    {
      title: 'Scan My Food (Multimodal AI)',
      desc: 'Snap a photo of your food. Neural vision identifies the dish, calculates estimated weight in grams, and asks for confirmation before recording.',
      icon: ScanLine,
      href: '/food-scanner',
      badge: 'AI Vision',
    },
    {
      title: 'Personalized Exercise Planner',
      desc: '9 movement categories ranging from classical Surya Namaskar to dumbbell strength, with safety guidelines and age-appropriate drills.',
      icon: Dumbbell,
      href: '/exercise',
      badge: 'Fitness',
    },
    {
      title: "What's in My Kitchen? AI",
      desc: 'Input available pantry ingredients and let AI invent nutritious, appetizing regional recipes with smart substitution advice.',
      icon: ChefHat,
      href: '/kitchen-ai',
      badge: 'Smart Pantry',
    },
    {
      title: 'Smart Budget Meal Planner',
      desc: 'Plan daily or weekly food rations (₹150–₹350/day) utilizing cost-effective local staples like sprouted lentils, eggs, and seasonal vegetables.',
      icon: Wallet,
      href: '/budget-planner',
      badge: 'Economical',
    },
    {
      title: 'Multilingual Voice Assistant',
      desc: 'Hands-free voice recognition and audio responses in English and Telugu (తెలుగు) for seamless logging while cooking or training.',
      icon: Mic,
      href: '/voice-assistant',
      badge: 'EN & TE',
    },
    {
      title: 'Hydration & Electrolyte Tracker',
      desc: 'Log fluids with custom glass/bottle presets, calculate estimated hydration baselines, and receive gentle reminders.',
      icon: Droplets,
      href: '/hydration',
      badge: 'Habits',
    },
    {
      title: 'Circadian Sleep & Recovery Tracker',
      desc: 'Record bedtime and wake hours, analyze 7-day sleep duration patterns, and learn actionable sleep hygiene protocols.',
      icon: Moon,
      href: '/sleep',
      badge: 'Restoration',
    },
    {
      title: 'Holistic Progress & Analytics',
      desc: 'Interactive Recharts graphs tracking energy equilibrium, protein intake, and achievement badges with celebration confetti.',
      icon: BarChart3,
      href: '/analytics',
      badge: 'Analytics',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Complete Platform Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Everything You Need for Sustainable Longevity
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          VitaFit AI fuses evidence-based nutritional science, multimodal machine learning, and Indian dietary wisdom into a seamless SaaS experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/50 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-400">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={f.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:text-brand-500"
                >
                  <span>Launch Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
