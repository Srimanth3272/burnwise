import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ScanLine,
  UtensilsCrossed,
  Activity,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Establish Your Physiological Baselines',
      desc: 'Complete our multi-step onboarding questionnaire to determine your Mifflin-St Jeor Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Minors under 18 are safely protected from restrictive calorie targets.',
      icon: Scale,
    },
    {
      step: '02',
      title: 'Multimodal AI Meal Recognition',
      desc: 'Take a picture of your breakfast, lunch, or dinner. Our multimodal neural vision calculates estimated serving sizes in grams and presents ingredients for your confirmation.',
      icon: ScanLine,
    },
    {
      step: '03',
      title: 'Curated Indian Nutrition & Movement',
      desc: 'Receive tailored daily meals including South & North Indian staples (Pesarattu, Idli, Dal, Chicken, Paneer) paired with custom home or gym exercise routines.',
      icon: UtensilsCrossed,
    },
    {
      step: '04',
      title: 'Track Habits & Celebrate Milestones',
      desc: 'Maintain daily hydration, track sleep cycles, and consult with VitaCoach in English or Telugu. Earn achievement badges as your lifestyle habits solidify.',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-16 animate-in fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How VitaFit AI Works
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          A scientific, step-by-step approach to health, fitness, and nutrition — avoiding extreme deficits and prioritizing long-term vitality.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start gap-6 group hover:border-brand-500/50 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-105 transition-transform">
                {s.step}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="text-center pt-8">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 shadow-xl shadow-brand-500/25 transition-all text-sm"
        >
          <span>Begin Your Health Onboarding</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
