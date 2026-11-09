import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  href = '/',
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* VitaFit AI Unique Emblem: Leaf + Heartbeat Pulse + Dynamic Ring */}
      <div
        className={`relative ${iconDimensions} rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-400 p-0.5 shadow-md shadow-brand-500/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
      >
        <div className="w-full h-full bg-navy-950/90 dark:bg-navy-950 rounded-[10px] flex items-center justify-center p-1 relative overflow-hidden">
          {/* Subtle glowing backdrop */}
          <div className="absolute inset-0 bg-brand-500/10 blur-sm pointer-events-none" />

          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-brand-400"
          >
            {/* Organic Wellness Leaf Silhouette */}
            <path
              d="M18 5C24.5 5 29 10 28.5 17C28 23.5 22.5 28.5 17 28.5C11.5 28.5 7 24 7.5 17C8 10 12.5 5 18 5Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-400 opacity-80"
            />
            {/* Heartbeat Pulse (ECG) intersecting fitness core */}
            <path
              d="M9 18.5H13L15 13L18 24L21 15L23 20H27"
              stroke="#34d399"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Fitness Spark at Apex */}
            <circle cx="18" cy="8.5" r="1.5" fill="#10b981" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className={`font-black tracking-tight ${textSizes} bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent`}>
              VitaFit
            </span>
            <span className="font-bold text-xs uppercase px-1.5 py-0.5 rounded-md bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30">
              AI
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-0.5">
            Health • Fitness • Life
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block group">
        {content}
      </Link>
    );
  }

  return content;
};
