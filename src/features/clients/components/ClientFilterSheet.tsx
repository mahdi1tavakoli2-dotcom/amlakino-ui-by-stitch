import React, { useState } from 'react';
import { X, Check, RotateCcw, Filter, Flame, Clock, Users } from 'lucide-react';
import { ClientLeadStatus } from '../types/client.types';

export interface ClientAdvancedFilter {
  leadStatus?: ClientLeadStatus;
  category?: string;
  hasOverdueOnly?: boolean;
}

interface ClientFilterSheetProps {
  onClose: () => void;
  currentFilter: ClientAdvancedFilter;
  onApplyFilter: (filter: ClientAdvancedFilter) => void;
}

export const ClientFilterSheet: React.FC<ClientFilterSheetProps> = ({
  onClose,
  currentFilter,
  onApplyFilter,
}) => {
  const [leadStatus, setLeadStatus] = useState<ClientLeadStatus>(currentFilter.leadStatus || 'all');
  const [category, setCategory] = useState<string>(currentFilter.category || 'all');
  const [hasOverdueOnly, setHasOverdueOnly] = useState<boolean>(!!currentFilter.hasOverdueOnly);

  const handleApply = () => {
    onApplyFilter({
      leadStatus: leadStatus === 'all' ? undefined : leadStatus,
      category: category === 'all' ? undefined : category,
      hasOverdueOnly,
    });
    onClose();
  };

  const handleReset = () => {
    setLeadStatus('all');
    setCategory('all');
    setHasOverdueOnly(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-slide-up max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">فیلترهای پیشرفته مشتریان</h3>
              <p className="text-[11px] text-slate-400">فیلتر بر اساس حرارت لید، وضعیت پیگیری و نیاز</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 my-4 text-xs">
          {/* Lead Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-2">
              وضعیت و حرارت لید
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLeadStatus('all')}
                className={`py-2 px-3 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                  leadStatus === 'all'
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                }`}
              >
                همه وضعیت‌ها
              </button>
              <button
                type="button"
                onClick={() => setLeadStatus('hot')}
                className={`py-2 px-3 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                  leadStatus === 'hot'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                }`}
              >
                🔥 فقط مشتریان داغ
              </button>
              <button
                type="button"
                onClick={() => setLeadStatus('deal')}
                className={`py-2 px-3 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                  leadStatus === 'deal'
                    ? 'bg-teal-800 text-white border-teal-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                }`}
              >
                🤝 در مرحله معامله
              </button>
              <button
                type="button"
                onClick={() => setLeadStatus('cold')}
                className={`py-2 px-3 rounded-xl border text-center font-bold cursor-pointer transition-all ${
                  leadStatus === 'cold'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                }`}
              >
                ⚠️ در خطر رکود
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-2">
              دسته‌بندی تقاضا
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-teal-600 text-slate-900"
            >
              <option value="all">همه دسته‌بندی‌ها</option>
              <option value="خریدار مسکونی">خریدار مسکونی</option>
              <option value="رهن و اجاره مسکونی">رهن و اجاره مسکونی</option>
              <option value="سرمایه‌گذار ملکی">سرمایه‌گذار ملکی</option>
              <option value="رهن و اجاره اداری">رهن و اجاره اداری</option>
              <option value="خریدار خانه اولی">خریدار خانه اولی</option>
              <option value="مشارکت در ساخت">مشارکت در ساخت</option>
            </select>
          </div>

          {/* Overdue Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={hasOverdueOnly}
                onChange={(e) => setHasOverdueOnly(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="text-xs font-bold text-amber-900">
                فقط نمایش پیگیری‌های عقب‌افتاده و نیازمند اقدام فوری
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>بازنشانی</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>اعمال فیلترها</span>
          </button>
        </div>
      </div>
    </div>
  );
};
