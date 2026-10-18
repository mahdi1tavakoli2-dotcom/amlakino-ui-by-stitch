import React from 'react';
import { X, FileText, CheckCircle2, ShieldAlert, Users, Calendar } from 'lucide-react';
import { ScheduleItem } from '../data/mockData';

interface ContractModalProps {
  schedule: ScheduleItem;
  onClose: () => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({
  schedule,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-scale-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                پرونده جلسه قرارداد (مبایعه‌نامه)
              </h3>
              <p className="text-[11px] text-slate-400">ساعت ۱۸:۰۰ غروب — اتاق ۲ با مدیریت</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meeting Target */}
        <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/70 my-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-amber-900">{schedule.title}</span>
            <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
              آماده انعقاد
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            مبایعه‌نامه آپارتمان ۱۶۵ متری مهستان سعادت‌آباد، ۳ خواب با پارکینگ اختصاصی و انباری.
          </p>
        </div>

        {/* Parties */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700">خریدار: جناب آقای نیکنام (همراه وکیل)</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600">چک تضمین آماده</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700">فروشنده: مهندس رادپور (مالک سندی)</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600">اصل سند در گاوصندوق</span>
          </div>
        </div>

        {/* Checklist */}
        <h5 className="text-xs font-bold text-slate-800 mb-2">چک‌لیست مدارک قانونی بررسی شده:</h5>
        <div className="space-y-1.5 mb-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>استعلام ثبتی و تصدیق اصالت سند تک‌برگ انجام شد</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>تسویه عوارض نوسازی و پسماند شهرداری رؤیت شد</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>تنظیم متن پیش‌نویس با حضور مشاور حقوقی املاکینو</span>
          </div>
        </div>

        {/* Commission Box */}
        <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100 flex items-center justify-between text-xs mb-4">
          <div>
            <div className="text-slate-500 text-[11px]">کمیسیون مشاور (حق‌الزحمه):</div>
            <div className="font-extrabold text-teal-800 text-sm mt-0.5">۵۸ میلیون تومان</div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold text-[11px]">
            پورسانت ۲۵٪
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          متوجه شدم و آماده‌ام
        </button>
      </div>
    </div>
  );
};
