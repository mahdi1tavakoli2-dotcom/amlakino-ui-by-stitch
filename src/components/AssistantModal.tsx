import React from 'react';
import { X, Sparkles, ShieldCheck, Zap, Bell, CheckCircle2 } from 'lucide-react';

interface AssistantModalProps {
  onClose: () => void;
}

export const AssistantModal: React.FC<AssistantModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">دستیار هوشمند املاکینو</h3>
              <p className="text-[11px] text-emerald-600 font-bold">وضعیت: فعال و آنلاین</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-slate-600 my-3 leading-relaxed">
          دستیار هوش مصنوعی به طور خودکار فایل‌های ورودی آژانس را با درخواست‌های ثبت‌شده متقاضیان تطبیق داده و پیگیری‌های فوری را به شما یادآوری می‌کند.
        </p>

        {/* Features Active */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>پایش لحظه‌ای تقاضای خریداران سعادت‌آباد و شهرک غرب</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>تطبیق هوشمند بالای ۹۰٪ بین فایل‌ها و خریداران نقدی</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>هشدار خودکار تأخیر در پیگیری‌های دارای اولویت بالا</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>استعلام هوشمند مشخصات ثبتی و متراژ از سامانه املاک</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
};
