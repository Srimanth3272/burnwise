import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { Heart, Shield, Globe2, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Your Health. Your Fitness. Your Lifestyle. AI-driven nutrition, calorie estimations, home & gym workout regimens, and intelligent fitness coaching tailored for Indian and global lifestyles.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400 font-medium">
              <Globe2 className="w-4 h-4" />
              <span>Available in English and Telugu (తెలుగు)</span>
            </div>
            <div className="pt-2 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>HIPAA-aligned data isolation & encrypted health metrics.</span>
            </div>
          </div>

          {/* Platform Columns */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Intelligence
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-brand-500 transition-colors">
                  Smart Dashboard
                </Link>
              </li>
              <li>
                <Link href="/diet-planner" className="hover:text-brand-500 transition-colors">
                  Indian Diet Planner
                </Link>
              </li>
              <li>
                <Link href="/food-scanner" className="hover:text-brand-500 transition-colors">
                  Scan My Food AI
                </Link>
              </li>
              <li>
                <Link href="/kitchen-ai" className="hover:text-brand-500 transition-colors">
                  What&apos;s in My Kitchen?
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-brand-500 transition-colors">
                  BMR / TDEE Calculator
                </Link>
              </li>
              <li>
                <Link href="/voice-assistant" className="hover:text-brand-500 transition-colors">
                  Voice Fitness Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Lifestyle & Health
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/exercise" className="hover:text-brand-500 transition-colors">
                  Exercise Planner
                </Link>
              </li>
              <li>
                <Link href="/hydration" className="hover:text-brand-500 transition-colors">
                  Hydration Tracker
                </Link>
              </li>
              <li>
                <Link href="/sleep" className="hover:text-brand-500 transition-colors">
                  Sleep & Recovery
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-brand-500 transition-colors">
                  Healthy Recipe Library
                </Link>
              </li>
              <li>
                <Link href="/grocery" className="hover:text-brand-500 transition-colors">
                  Smart Grocery List
                </Link>
              </li>
              <li>
                <Link href="/budget-planner" className="hover:text-brand-500 transition-colors">
                  Budget Meal Planner
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-500 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-500 transition-colors flex items-center gap-1 text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p className="max-w-3xl leading-relaxed">
            <strong>Medical Disclaimer:</strong> VitaFit AI provides estimated nutritional, caloric, and exercise analytics for general educational and habit-building purposes only. It is not intended to replace certified medical diagnosis, treatment, or dietary consultation. Always seek advice from a qualified healthcare practitioner before adopting aggressive dietary changes or strenuous workout programs.
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <span>© {new Date().getFullYear()} VitaFit AI. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for healthy longevity.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
