import React from 'react';
import { Phone, Clock, RefreshCw } from 'lucide-react';
import { UrgentTask } from '../data/mockData';

interface UrgentTaskCardProps {
  task: UrgentTask;
  onCall: (task: UrgentTask) => void;
  onSnooze: (task: UrgentTask) => void;
  onCardClick?: (task: UrgentTask) => void;
}

export const UrgentTaskCard: React.FC<UrgentTaskCardProps> = ({
  task,
  onCall,
  onSnooze,
  onCardClick,
}) => {
  return (
    <div className="mx-4 mb-4">
      <div
        onClick={() => onCardClick?.(task)}
        className="relative bg-white rounded-2xl p-4 shadow-sm border border-slate-100/90 border-r-4 border-r-rose-500 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          {/* Right info in RTL */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-slate-900">
              {task.name === 'آقای رضایی' ? 'تماس مجدد با آقای رضایی' : `تماس مجدد با ${task.name}`}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600">
              {task.delayText}
            </span>
          </div>

          {/* Left time in RTL */}
          <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
            {task.timeText}
          </span>
        </div>

        {/* Content line */}
        <p className="text-xs text-slate-600 font-normal mt-2.5 leading-relaxed">
          {task.summary}
        </p>

        {/* Actions row */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-50">
          {/* Left button: به تعویق */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSnooze(task);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>به تعویق</span>
          </button>

          {/* Right button: تماس فوری */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCall(task);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shadow-xs shadow-rose-200 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>تماس فوری</span>
          </button>
        </div>
      </div>
    </div>
  );
};
