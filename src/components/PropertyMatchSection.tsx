import React from 'react';
import { Sparkles, Zap, Share2, ChevronLeft } from 'lucide-react';
import { PropertyMatch } from '../data/mockData';

interface PropertyMatchSectionProps {
  match: PropertyMatch;
  totalMatches: number;
  onViewAllMatches: () => void;
  onShare: (match: PropertyMatch) => void;
  onViewDetails: (match: PropertyMatch) => void;
}

export const PropertyMatchSection: React.FC<PropertyMatchSectionProps> = ({
  match,
  totalMatches,
  onViewAllMatches,
  onShare,
  onViewDetails,
}) => {
  return (
    <div className="mx-4 mb-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            تطبیق‌های جدید با امتیاز بالا
          </h3>
        </div>
        <button
          onClick={onViewAllMatches}
          className="text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer"
        >
          همه ({totalMatches})
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 hover:shadow-sm transition-all">
        {/* Top Info with Image */}
        <div className="flex items-start gap-3">
          {/* Middle/Left Text in RTL */}
          <div className="flex-1 min-w-0">
            {/* Tag line */}
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-100/60">
                <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                <span>تطبیق {match.matchScore}٪</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {match.location}
              </span>
            </div>

            {/* Property Title */}
            <h4
              onClick={() => onViewDetails(match)}
              className="text-sm font-extrabold text-slate-900 hover:text-teal-700 transition-colors cursor-pointer truncate"
            >
              {match.title}
            </h4>

            {/* Price */}
            <div className="text-sm font-black text-teal-700 mt-1">
              {match.priceText}
            </div>
          </div>

          {/* Right Image in RTL */}
          <div
            onClick={() => onViewDetails(match)}
            className="w-24 h-20 rounded-xl overflow-hidden relative shrink-0 shadow-xs cursor-pointer group bg-slate-100"
          >
            <img
              src={match.image}
              alt={match.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
              {match.areaTag}
            </div>
          </div>
        </div>

        {/* Customer Match Box */}
        <div className="bg-slate-50/90 rounded-xl p-2.5 my-3 flex items-center justify-between text-xs border border-slate-100/90 gap-2">
          <div className="text-slate-700 font-medium truncate">
            <span className="font-bold text-slate-800">مشتری:</span> {match.clientName} ({match.clientBudget})
          </div>
          <span className="inline-flex px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-800 text-[10px] font-bold whitespace-nowrap shrink-0">
            {match.tag}
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 pt-1">
          {/* Left Text Button: مشاهده تطبیق */}
          <button
            onClick={() => onViewDetails(match)}
            className="inline-flex items-center gap-0.5 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>مشاهده تطبیق</span>
          </button>

          {/* Right Primary Button: معرفی ملک */}
          <button
            onClick={() => onShare(match)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-98 text-white text-xs font-bold shadow-xs shadow-teal-700/20 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>معرفی ملک</span>
          </button>
        </div>
      </div>
    </div>
  );
};
