import React from 'react';
import { Logo } from '@/components/common/Logo';
import { Heart, ShieldCheck, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12 animate-in fade-in max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-2">
          <Logo size="lg" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About VitaFit AI
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Tagline: <strong>Your Health. Your Fitness. Your Lifestyle.</strong>
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Core Mission &amp; Product Philosophy
        </h2>
        <p>
          VitaFit AI was created to solve a profound problem: mainstream health and fitness apps were engineered around Western diets and unsustainable crash deficit targets. They fail to understand traditional Indian cooking—steamed fermented idlis, protein-packed pesarattus, drumstick sambar, curd rice, and turmeric-infused dishes.
        </p>
        <p>
          We believe true wellness is grounded in <strong>healthy habits, personalized recommendations, accurate information, user privacy, and sustainable longevity</strong>. We reject fad diets, dangerous rapid weight-loss prescriptions, and algorithms that rank people by appearance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Evidence-Based Science</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Validating metrics with Mifflin-St Jeor BMR, Asian Indian BMI thresholds, and age-appropriate guidelines.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Bilingual Access</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Native voice interaction and coaching in both English and Telugu (తెలుగు) to democratize health technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
