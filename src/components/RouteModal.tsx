import React from 'react';
import { X, Navigation, MapPin, Clock, Car, Phone, ExternalLink } from 'lucide-react';
import { ScheduleItem } from '../data/mockData';

interface RouteModalProps {
  schedule: ScheduleItem;
  onClose: () => void;
  onCall: (item: ScheduleItem) => void;
}

export const RouteModal: React.FC<RouteModalProps> = ({
  schedule,
  onClose,
  onCall,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">مسیریابی محل بازدید</h3>
              <p className="text-[11px] text-slate-400">ساعت ۱۶:۳۰ عصر — امروز</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map Preview Mockup */}
        <div className="my-3 rounded-2xl overflow-hidden border border-slate-200 relative h-36 bg-slate-100">
          {/* Simulated stylized street map */}
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
            {/* Roads */}
            <div className="absolute w-full h-3 bg-slate-200 top-1/2 -translate-y-1/2" />
            <div className="absolute w-3 h-full bg-slate-200 left-1/3" />
            <div className="absolute w-full h-2 bg-teal-500/30 top-1/2 -translate-y-1/2 shadow-xs" />
            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-teal-400 opacity-75" />
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg relative z-10">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold bg-white text-slate-800 px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                {schedule.title}
              </span>
            </div>
          </div>

          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] text-slate-600 font-bold px-2 py-1 rounded-md shadow-xs">
            فاصله: ۳.۴ کیلومتر (۱۲ دقیقه)
          </div>
        </div>

        {/* Address and client */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl">
            <div className="font-bold text-slate-800 mb-1">نشانی مقصد:</div>
            <div className="text-slate-600 leading-relaxed">{schedule.location}</div>
          </div>

          <div className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500">خریدار همراه:</div>
              <div className="font-bold text-teal-900 mt-0.5">{schedule.subtitle}</div>
            </div>
            <button
              onClick={() => onCall(schedule)}
              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>تماس</span>
            </button>
          </div>
        </div>

        {/* Navigation apps */}
        <p className="text-[11px] text-slate-400 font-semibold mb-2">باز کردن در نرم‌افزارهای مسیریاب:</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-xs font-bold text-slate-700 flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="text-emerald-600 font-black">نشان</span>
            <span className="text-[10px] text-slate-400">Neshan</span>
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-xs font-bold text-slate-700 flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="text-blue-600 font-black">بلد</span>
            <span className="text-[10px] text-slate-400">Balad</span>
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-xs font-bold text-slate-700 flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="text-sky-500 font-black">ویز / مپ</span>
            <span className="text-[10px] text-slate-400">Waze</span>
          </button>
        </div>
      </div>
    </div>
  );
};
