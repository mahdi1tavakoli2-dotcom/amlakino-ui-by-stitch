import React from 'react';
import { X, Phone, Bell } from 'lucide-react';
import { FollowUpItem } from '../data/mockData';

interface AllFollowUpsDrawerProps {
  items: FollowUpItem[];
  onClose: () => void;
  onCall: (item: FollowUpItem) => void;
}

export const AllFollowUpsDrawer: React.FC<AllFollowUpsDrawerProps> = ({
  items,
  onClose,
  onCall,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-100 text-right max-h-[85vh] flex flex-col">
        {/* Grab bar */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              همه پیگیری‌های امروز ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-2.5 my-3 flex-1 pr-0.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 font-extrabold text-xs flex items-center justify-center shrink-0 border border-teal-100">
                  {item.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded font-bold">
                      {item.roleBadge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.proposal}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">آخرین تماس: {item.lastContact}</div>
                </div>
              </div>

              <button
                onClick={() => onCall(item)}
                className="w-9 h-9 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
                title={`تماس با ${item.name}`}
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 shrink-0"
        >
          بستن لیست
        </button>
      </div>
    </div>
  );
};
