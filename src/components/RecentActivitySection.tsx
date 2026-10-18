import React from 'react';
import { RecentActivity } from '../data/mockData';

interface RecentActivitySectionProps {
  activities: RecentActivity[];
  onActivityClick?: (act: RecentActivity) => void;
}

export const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({
  activities,
  onActivityClick,
}) => {
  return (
    <div className="mx-4 mb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
          فعالیت‌های اخیر
        </h3>
        <span className="text-xs font-medium text-slate-400">
          ساعت گذشته
        </span>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
        {activities.map((act) => (
          <div
            key={act.id}
            onClick={() => onActivityClick?.(act)}
            className="flex items-center justify-between gap-2 text-xs cursor-pointer hover:opacity-80 transition-opacity"
          >
            {/* Right in RTL: Green dot + Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-slate-800 truncate">
                {act.title}
              </span>
            </div>

            {/* Left in RTL: Time Ago */}
            <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
              {act.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
