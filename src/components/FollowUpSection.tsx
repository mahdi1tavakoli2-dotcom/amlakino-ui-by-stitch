import React from 'react';
import { Bell, Phone } from 'lucide-react';
import { FollowUpItem } from '../data/mockData';

interface FollowUpSectionProps {
  primaryItem: FollowUpItem;
  totalCount: number;
  onViewAll: () => void;
  onCall: (item: FollowUpItem) => void;
  onCardClick?: (item: FollowUpItem) => void;
}

export const FollowUpSection: React.FC<FollowUpSectionProps> = ({
  primaryItem,
  totalCount,
  onViewAll,
  onCall,
  onCardClick,
}) => {
  return (
    <div className="mx-4 mb-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            پیگیری‌های امروز
          </h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer"
        >
          مشاهده همه ({totalCount})
        </button>
      </div>

      {/* Item Card */}
      <div
        onClick={() => onCardClick?.(primaryItem)}
        className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between"
      >
        {/* Right side in RTL: Avatar and details */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-teal-50 text-teal-700 font-extrabold text-sm flex items-center justify-center shrink-0 border border-teal-100/60">
            {primaryItem.initials}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                {primaryItem.name}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 text-[10px] font-bold border border-teal-100/50">
                {primaryItem.roleBadge}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-normal mt-0.5">
              {primaryItem.proposal}
            </span>
          </div>
        </div>

        {/* Left side in RTL: Phone button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCall(primaryItem);
          }}
          className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-100 active:scale-95 flex items-center justify-center transition-all cursor-pointer shrink-0"
          title={`تماس با ${primaryItem.name}`}
          aria-label={`تماس با ${primaryItem.name}`}
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
