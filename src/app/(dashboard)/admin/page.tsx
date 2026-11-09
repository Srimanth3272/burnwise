'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { INDIAN_FOOD_DATABASE } from '@/data/indianFoods';
import { EXERCISE_DATABASE } from '@/data/exercises';
import { CURATED_RECIPES } from '@/data/recipes';
import {
  ShieldCheck,
  Users,
  Activity,
  Sparkles,
  Bot,
  MessageSquare,
  Utensils,
  Dumbbell,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  AlertTriangle,
  Server,
  Plus,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'foods' | 'exercises' | 'feedback'>('overview');

  // Simulated Admin KPI Data
  const stats = {
    totalUsers: 14280,
    activeToday: 3840,
    aiScansToday: 1920,
    voiceQueriesHandled: 840,
    systemUptime: '99.98%',
    activeFeedbackCount: 14,
  };

  const recentFeedback = [
    {
      id: 'fb-1',
      user: 'Pooja R. (Hyderabad)',
      category: 'recipe',
      message: 'Can you please add Pesarattu Upma combination to the quick breakfast planner? Loved the Telugu voice logging!',
      status: 'resolved',
      time: '2 hours ago',
    },
    {
      id: 'fb-2',
      user: 'Karthik N. (Bangalore)',
      category: 'feature',
      message: 'The AI Food scanner detected my idli sambar with 95% accuracy. It would be great to have barcode scanning for packaged foods too.',
      status: 'reviewed',
      time: '5 hours ago',
    },
    {
      id: 'fb-3',
      user: 'Sneha M. (Delhi)',
      category: 'general',
      message: 'Appreciated that you do not push extreme 1200 kcal diets. Sustainable habit tracking feels much healthier.',
      status: 'new',
      time: '1 day ago',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              VitaFit AI Administrator Console
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-semibold border border-amber-500/20">
              Role-Based Access Control
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            System health, AI usage metrics, content database registries, and user feedback management.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-navy-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <Server className="w-4 h-4 text-emerald-500" />
          <span>Status: <strong>System Operational</strong></span>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-500/20 flex items-start gap-3 text-xs text-brand-800 dark:text-brand-300">
        <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>HIPAA-Aligned Privacy Notice:</strong> User health logs, individual weights, and personal biometric data are strictly masked and isolated. Administrators only view aggregate analytics, anonymized usage volumes, and operational feedback.
        </p>
      </div>

      {/* Admin KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Total Registered</span>
            <Users className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.totalUsers.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-500 font-semibold">+18% this month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Daily Active (DAU)</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.activeToday.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">26.8% engagement ratio</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>AI Food Scans Today</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.aiScansToday.toLocaleString()}
          </div>
          <span className="text-[11px] text-brand-500 font-semibold">94.8% user confirmation</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Voice Queries Handled</span>
            <Bot className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.voiceQueriesHandled.toLocaleString()}
          </div>
          <span className="text-[11px] text-blue-500 font-semibold">42% in Telugu (తెలుగు)</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'overview', label: 'AI Health Metrics', icon: Activity },
          { id: 'foods', label: `Food DB (${INDIAN_FOOD_DATABASE.length})`, icon: Utensils },
          { id: 'exercises', label: `Exercise Library (${EXERCISE_DATABASE.length})`, icon: Dumbbell },
          { id: 'feedback', label: `User Feedback (${recentFeedback.length})`, icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                isActive
                  ? 'border-brand-500 bg-brand-500 text-white shadow-sm'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Vision &amp; Model Performance
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <span>Model Endpoint</span>
                <span className="font-mono text-brand-500 font-bold">gemini-1.5-flash / local fallback</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <span>Average Recognition Latency</span>
                <span className="font-bold text-slate-900 dark:text-white">620 ms</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <span>South Indian Regional Detection Rate</span>
                <span className="font-bold text-emerald-500">97.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <span>Telugu Speech Token Accuracy</span>
                <span className="font-bold text-emerald-500">94.1%</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Firestore Cloud Database Status
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <span>Security Rules Engine</span>
                <span className="font-semibold text-emerald-500">Authenticated Isolation Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <span>Indexed Collections</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">14 Collections</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <span>Database Sync Uptime</span>
                <span className="font-bold text-emerald-500">100% Operational</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'foods' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Verified Indian Food Database Records ({INDIAN_FOOD_DATABASE.length})
            </h3>
            <span className="text-xs text-brand-500 font-semibold">Active in Food Scanner &amp; Planner</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Item Name</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3">Diet</th>
                  <th className="py-2.5 px-3">Calories</th>
                  <th className="py-2.5 px-3">Protein</th>
                  <th className="py-2.5 px-3">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {INDIAN_FOOD_DATABASE.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-navy-950/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      {f.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{f.region}</td>
                    <td className="py-2.5 px-3 capitalize">{f.dietType}</td>
                    <td className="py-2.5 px-3 font-bold text-brand-500">{f.calories} kcal</td>
                    <td className="py-2.5 px-3 font-semibold">{f.protein}g</td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-500">₹{f.estimatedCostINR}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'exercises' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Exercise Library Registry ({EXERCISE_DATABASE.length})
            </h3>
            <span className="text-xs text-brand-500 font-semibold">Safety Notes Validated</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Exercise Drill</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Difficulty</th>
                  <th className="py-2.5 px-3">Target Duration</th>
                  <th className="py-2.5 px-3">Burn Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {EXERCISE_DATABASE.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50 dark:hover:bg-navy-950/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      {ex.name}
                    </td>
                    <td className="py-2.5 px-3 capitalize text-slate-500">{ex.category}</td>
                    <td className="py-2.5 px-3 capitalize">{ex.difficulty}</td>
                    <td className="py-2.5 px-3">{ex.recommendedDurationMins} mins</td>
                    <td className="py-2.5 px-3 font-bold text-amber-500">{ex.caloriesBurnedPerMin} kcal/min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            User Support &amp; Community Feedback ({recentFeedback.length})
          </h3>

          <div className="space-y-3">
            {recentFeedback.map((fb) => (
              <div
                key={fb.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{fb.user}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-500">
                      {fb.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{fb.time}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &quot;{fb.message}&quot;
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span
                    className={`font-semibold capitalize ${
                      fb.status === 'resolved'
                        ? 'text-emerald-500'
                        : fb.status === 'reviewed'
                        ? 'text-blue-500'
                        : 'text-amber-500'
                    }`}
                  >
                    ● Status: {fb.status}
                  </span>
                  <button className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
                    Reply / Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
