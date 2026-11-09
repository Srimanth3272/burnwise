import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto text-slate-700 dark:text-slate-300">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy &amp; Health Data Governance
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Effective Date: November 9, 2026 • Platform: VitaFit AI
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span>1. Commitment to Sensitive Health Privacy</span>
          </h2>
          <p>
            VitaFit AI prioritizes user confidentiality. We recognize that biometric information (height, weight, dietary restrictions, and medical allergies) represents sensitive personal data. We do not sell, rent, or trade your personal health data to third-party advertisers or data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>2. Minor Protection Safeguards</span>
          </h2>
          <p>
            In strict compliance with pediatric clinical ethics, VitaFit AI enforces algorithm-level protections for individuals under 18 years of age. Our calculators and planners will never prescribe calorie deficits, rapid weight loss, or restrictive diets to minors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>3. Multimodal Food Scanner &amp; AI Privacy</span>
          </h2>
          <p>
            Photographs uploaded via &quot;Scan My Food&quot; are transmitted over encrypted TLS channels solely for real-time nutritional estimation. Images are not retained for facial recognition or commercial training without explicit separate consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>4. User Data Control &amp; Portability</span>
          </h2>
          <p>
            You hold unhindered ownership over your records. You may export your entire profile, meal logs, hydration logs, and workout metrics as a portable JSON file at any time from your Analytics dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}
