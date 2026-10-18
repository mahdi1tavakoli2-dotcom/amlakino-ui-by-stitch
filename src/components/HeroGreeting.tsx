import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface HeroGreetingProps {
  onAssistantClick?: () => void;
}

export const HeroGreeting: React.FC<HeroGreetingProps> = ({ onAssistantClick }) => {
  return (
    <div className="flex items-start justify-between gap-2 pt-4 pb-3 px-4">
      <div className="flex-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          صبح بخیر، علیرضا
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          ۳ کار اولویت‌دار منتظر اقدام شماست.
        </p>
      </div>

      <button
        onClick={onAssistantClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 transition-colors cursor-pointer shrink-0 shadow-xs"
        title="دستیار هوشمند املاکینو"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">
          دستیار هوشمند فعال
        </span>
      </button>
    </div>
  );
};
