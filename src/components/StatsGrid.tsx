import React from 'react';

interface StatsGridProps {
  stats: {
    activeFiles: string;
    activeClients: string;
    newMatches: string;
    todayFollowUps: string;
  };
  onStatClick?: (statType: string) => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, onStatClick }) => {
  const statItems = [
    {
      id: 'files',
      count: stats.activeFiles,
      label: 'فایل فعال',
      colorClass: 'text-teal-600',
    },
    {
      id: 'clients',
      count: stats.activeClients,
      label: 'مشتری فعال',
      colorClass: 'text-slate-800',
    },
    {
      id: 'matches',
      count: stats.newMatches,
      label: 'تطبیق جدید',
      colorClass: 'text-teal-600',
    },
    {
      id: 'followups',
      count: stats.todayFollowUps,
      label: 'پیگیری امروز',
      colorClass: 'text-rose-500',
    },
  ];

  return (
    <div className="mx-4 mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
          خلاصه عملکرد
        </h3>
        <span className="text-xs font-medium text-slate-400">
          امروز
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2">
        {statItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onStatClick?.(item.id)}
            className="bg-white rounded-2xl py-3 px-1 text-center shadow-xs border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className={`text-xl sm:text-2xl font-black ${item.colorClass} tracking-tight`}>
              {item.count}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 truncate">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
