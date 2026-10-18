import React from 'react';
import { CalendarCheck, Phone, Navigation, FileText } from 'lucide-react';
import { ScheduleItem } from '../data/mockData';

interface ScheduleSectionProps {
  schedules: ScheduleItem[];
  onOpenRoute: (item: ScheduleItem) => void;
  onCall: (item: ScheduleItem) => void;
  onOpenContract: (item: ScheduleItem) => void;
  onItemClick?: (item: ScheduleItem) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  schedules,
  onOpenRoute,
  onCall,
  onOpenContract,
  onItemClick,
}) => {
  return (
    <div className="mx-4 mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-1.5">
          <CalendarCheck className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            برنامه و بازدیدهای امروز
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-400">
          ۲ برنامه
        </span>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {schedules.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item)}
            className="bg-white rounded-2xl p-3 shadow-xs border border-slate-100 hover:shadow-sm transition-all flex items-center justify-between cursor-pointer"
          >
            {/* Right side in RTL: Time Box + Title & Subtitle */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Time block */}
              <div className="w-13 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-center flex flex-col justify-center shrink-0">
                <span
                  className={`text-xs font-black leading-tight ${
                    item.type === 'visit' ? 'text-teal-700' : 'text-slate-800'
                  }`}
                >
                  {item.time}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {item.period}
                </span>
              </div>

              {/* Text info */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.typeBadge === 'بازدید حضوری'
                        ? 'bg-teal-50 text-teal-700 border border-teal-100/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-100/60'
                    }`}
                  >
                    {item.typeBadge}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>

            {/* Left side in RTL: Actions */}
            <div className="flex items-center gap-1.5 shrink-0 mr-2">
              {item.type === 'visit' ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRoute(item);
                    }}
                    className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:text-teal-700 hover:bg-slate-200 active:scale-95 flex items-center justify-center transition-colors cursor-pointer"
                    title="مسیریابی"
                    aria-label="مسیریابی"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCall(item);
                    }}
                    className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:text-teal-700 hover:bg-slate-200 active:scale-95 flex items-center justify-center transition-colors cursor-pointer"
                    title={`تماس با ${item.subtitle}`}
                    aria-label="تماس"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContract(item);
                  }}
                  className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:text-amber-700 hover:bg-slate-200 active:scale-95 flex items-center justify-center transition-colors cursor-pointer"
                  title="مشاهده جزئیات قرارداد"
                  aria-label="جزئیات قرارداد"
                >
                  <FileText className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
