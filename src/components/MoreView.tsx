import React from 'react';
import { User, Sparkles, Shield, Award, Settings, PhoneCall, LogOut, ChevronLeft } from 'lucide-react';

interface MoreViewProps {
  onAssistantSettings: () => void;
}

export const MoreView: React.FC<MoreViewProps> = ({ onAssistantSettings }) => {
  return (
    <div className="px-4 py-3 pb-24 text-right animate-fade-in">
      {/* Profile Card */}
      <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-xs mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md shadow-teal-700/20">
            ع
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">علیرضا تهرانی</h3>
            <p className="text-xs text-slate-500">مشاور ارشد سعادت‌آباد و شهرک غرب</p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-teal-700">
              <Award className="w-3.5 h-3.5" />
              <span>مشاور برتر ماه (رتبه ۱ آژانس)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-2 border border-slate-100 shadow-xs space-y-1">
          <button
            onClick={onAssistantSettings}
            className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>تنظیمات دستیار هوش مصنوعی املاکینو</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>

          <div className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-slate-500" />
              <span>امنیت، حریم خصوصی و دسترسی‌ها</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </div>

          <div className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-slate-500" />
              <span>پشتیبانی و تماس با مدیریت آژانس</span>
            </div>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* App Version Info */}
        <div className="p-3 text-center text-xs text-slate-400">
          نسخه ۴.۲.۰ • املاکینو — سیستم یکپارچه هوشمند املاک ایران
        </div>
      </div>
    </div>
  );
};
