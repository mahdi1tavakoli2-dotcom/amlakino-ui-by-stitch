import React from 'react';
import { X, Zap, CheckCircle2, MapPin, Building, Bed, Car, Check, Share2 } from 'lucide-react';
import { PropertyMatch } from '../data/mockData';

interface MatchDetailsModalProps {
  match: PropertyMatch;
  onClose: () => void;
  onShare: (match: PropertyMatch) => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({
  match,
  onClose,
  onShare,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                تحلیل تطبیق هوشمند ({match.matchScore}٪)
              </h3>
              <p className="text-[11px] text-slate-400">تطبیق فایل با تقاضای مشتری</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Photo & Info */}
        <div className="relative mt-3 rounded-2xl overflow-hidden aspect-video bg-slate-100">
          <img
            src={match.image}
            alt={match.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 bg-black/75 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs">
            {match.areaTag}
          </div>
          <div className="absolute bottom-2 right-2 left-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-xl text-white">
            <h4 className="text-sm font-bold">{match.title}</h4>
            <div className="text-xs font-black text-teal-300 mt-0.5">{match.priceText}</div>
          </div>
        </div>

        {/* Match Breakdown Score Cards */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
            <div className="text-xs text-slate-400 font-medium">هم‌پوشانی بودجه</div>
            <div className="text-sm font-extrabold text-emerald-600 mt-0.5">۹۸٪</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
            <div className="text-xs text-slate-400 font-medium">موقعیت و منطقه</div>
            <div className="text-sm font-extrabold text-emerald-600 mt-0.5">۱۰۰٪</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
            <div className="text-xs text-slate-400 font-medium">سلیقه و امکانات</div>
            <div className="text-sm font-extrabold text-teal-600 mt-0.5">۹۲٪</div>
          </div>
        </div>

        {/* Target Client Profile */}
        <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/70 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-800">مشخصات خریدار متقاضی:</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
              آماده بازدید
            </span>
          </div>
          <div className="text-xs text-slate-700">
            <strong>{match.clientName}</strong> — {match.clientBudget}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            متقاضی خرید آپارتمان ۳ خوابه نوساز با نور مستقیم در سعادت‌آباد؛ دارای نقدینگی آماده و اولویت بالا.
          </p>
        </div>

        {/* Property Features */}
        <div className="mb-4">
          <h5 className="text-xs font-bold text-slate-800 mb-2">ویژگی‌ها و امکانات ملک:</h5>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl">
              <Bed className="w-3.5 h-3.5 text-teal-600" />
              <span>تعداد خواب: {match.bedrooms} خواب مستر</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl">
              <Car className="w-3.5 h-3.5 text-teal-600" />
              <span>پارکینگ: {match.parkingCount} سندی باکس</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl">
              <Building className="w-3.5 h-3.5 text-teal-600" />
              <span>طبقه: {match.floor} از ۵ (تک‌واحدی)</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>آسانسور + انباری سندی</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mb-4">
          <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{match.address}</span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            بستن
          </button>
          <button
            onClick={() => {
              onClose();
              onShare(match);
            }}
            className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>معرفی به {match.clientName}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
