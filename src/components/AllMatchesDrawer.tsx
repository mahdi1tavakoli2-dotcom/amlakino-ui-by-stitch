import React from 'react';
import { X, Sparkles, Zap, Share2 } from 'lucide-react';
import { PropertyMatch } from '../data/mockData';

interface AllMatchesDrawerProps {
  matches: PropertyMatch[];
  onClose: () => void;
  onSelectMatch: (match: PropertyMatch) => void;
  onShare: (match: PropertyMatch) => void;
}

export const AllMatchesDrawer: React.FC<AllMatchesDrawerProps> = ({
  matches,
  onClose,
  onSelectMatch,
  onShare,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-100 text-right max-h-[85vh] flex flex-col">
        {/* Grab bar */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              همه تطبیق‌های دارای امتیاز بالا ({matches.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-3 my-3 flex-1 pr-0.5">
          {matches.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectMatch(item)}
              className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-teal-200 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">{item.title}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      <Zap className="w-2.5 h-2.5 fill-emerald-600" />
                      {item.matchScore}٪
                    </span>
                  </div>
                  <div className="text-xs font-bold text-teal-700 mt-1">{item.priceText}</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    مشتری: {item.clientName} ({item.clientBudget})
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-400">{item.location}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare(item);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-900"
                >
                  <Share2 className="w-3 h-3" />
                  <span>معرفی ملک</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 shrink-0"
        >
          بستن
        </button>
      </div>
    </div>
  );
};
