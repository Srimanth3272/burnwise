import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { FitnessDataProvider } from '@/context/FitnessDataContext';

export const metadata: Metadata = {
  title: 'VitaFit AI | Your Health. Your Fitness. Your Lifestyle.',
  description:
    'AI-powered personal fitness, nutrition, South & North Indian meal planning, multimodal food recognition, activity tracking, hydration, and intelligent health coaching.',
  keywords: [
    'VitaFit AI',
    'AI Nutrition',
    'Indian Diet Planner',
    'Food Scanner AI',
    'Calorie Calculator',
    'Fitness Coach',
    'South Indian Healthy Diet',
    'Telugu Health Assistant',
    'TDEE BMR Calculator',
  ],
  authors: [{ name: 'VitaFit AI Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <FitnessDataProvider>
              {children}
            </FitnessDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
