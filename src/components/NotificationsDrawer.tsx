import React from 'react';
import { X, Bell, CheckCheck } from 'lucide-react';
import { notificationsList } from '../data/mockData';

interface NotificationsDrawerProps {
  onClose: () => void;
  onClear: () => void;
  onSelectUrgent: () => void;
  onSelectMatch: () => void;
  onSelectMeeting: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  onClose,
  onClear,
  onSelectUrgent,
  onSelectMatch,
  onSelectMeeting,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right mt-12 sm:mt-0 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
              ۳
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">اعلان‌های فوری مشاور</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="my-3 space-y-2.5">
          {notificationsList.map((notif, index) => (
            <div
              key={notif.id}
              onClick={() => {
                onClose();
                if (index === 0) onSelectUrgent();
                else if (index === 1) onSelectMatch();
                else if (index === 2) onSelectMeeting();
              }}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-teal-50/50 hover:border-teal-200 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                <span className="text-[10px] text-slate-400">{notif.time}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{notif.desc}</p>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClear}
            className="flex-1 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            علامت‌گذاری همه به عنوان خوانده‌شده
          </button>
        </div>
      </div>
    </div>
  );
};
