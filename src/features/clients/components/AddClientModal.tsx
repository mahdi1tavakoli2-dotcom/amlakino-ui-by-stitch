import React, { useState } from 'react';
import { X, UserPlus, Phone, MapPin, DollarSign, Tag, Flame, Clock, Check, FileText } from 'lucide-react';
import { ClientEntity } from '../types/client.types';

interface AddClientModalProps {
  onClose: () => void;
  onClientAdded: (client: Omit<ClientEntity, 'id'>) => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({ onClose, onClientAdded }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('خریدار مسکونی');
  const [statusCategory, setStatusCategory] = useState<'hot' | 'warm' | 'cold' | 'deal'>('hot');
  const [budget, setBudget] = useState('');
  const [locations, setLocations] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [followUpTime, setFollowUpTime] = useState('فردا ۱۱:۰۰');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Generate initials from Persian name
    const parts = name.trim().split(' ').filter(Boolean);
    const initials = parts.length >= 2 
      ? `${parts[0][0]}‌${parts[parts.length - 1][0]}` 
      : parts[0]?.slice(0, 2) || 'م';

    const getStatusBadge = () => {
      switch (statusCategory) {
        case 'hot':
          return { text: 'مشتری داغ', iconType: 'flame' as const, colorScheme: 'red' as const };
        case 'warm':
          return { text: 'مشتری گرم', iconType: 'sun' as const, colorScheme: 'amber' as const };
        case 'deal':
          return { text: 'در معامله', iconType: 'deal' as const, colorScheme: 'teal' as const };
        case 'cold':
        default:
          return { text: 'در خطر رکود', iconType: 'warning' as const, colorScheme: 'red' as const };
      }
    };

    onClientAdded({
      name: name.trim(),
      initials,
      avatarColor: 'bg-teal-100 text-teal-800',
      category,
      phone: phone || '۰۹۱۲۰۰۰۰۰۰۰',
      statusBadge: getStatusBadge(),
      statusCategory,
      budgetDisplay: budget || 'بودجه توافقی',
      preferredLocations: locations || 'تهران (مناطق ۱ تا ۳)',
      areaDisplay: area ? `${area} متر` : '۱۰۰-۱۲۰ م',
      matchesCount: 3,
      bestMatchScore: 92,
      nextFollowUp: {
        text: `${followUpTime} - پیگیری اول`,
        isOverdue: false,
        timeText: followUpTime,
      },
      preferredBedrooms: Number(bedrooms) || 2,
      notes: notes.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right max-h-[92vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">ثبت متقاضی / خریدار جدید</h3>
              <p className="text-[11px] text-slate-400">تطبیق فوری با فایل‌های املاکینو</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-3.5 text-xs">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                نام و نام خانوادگی <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: دکتر مسعودی"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                شماره تماس
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲..."
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-900"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">دسته‌بندی متقاضی</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-teal-600 text-slate-900"
              >
                <option value="خریدار مسکونی">خریدار مسکونی</option>
                <option value="رهن و اجاره مسکونی">رهن و اجاره مسکونی</option>
                <option value="سرمایه‌گذار ملکی">سرمایه‌گذار ملکی</option>
                <option value="رهن و اجاره اداری">رهن و اجاره اداری</option>
                <option value="خریدار خانه اولی">خریدار خانه اولی</option>
                <option value="مشارکت در ساخت">مشارکت در ساخت</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">میزان حرارت لید</label>
              <select
                value={statusCategory}
                onChange={(e) => setStatusCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-teal-600 text-slate-900"
              >
                <option value="hot">🔥 داغ (آماده خرید فوری)</option>
                <option value="warm">☀️ گرم (در حال بررسی)</option>
                <option value="deal">🤝 در معامله (مرحله قرارداد)</option>
                <option value="cold">⚠️ راکد / پیگیری مجدد</option>
              </select>
            </div>
          </div>

          {/* Budget & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                بودجه / سقف مالی
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="مثلاً: ۱۵ تا ۲۰ م.ت"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                متراژ مدنظر
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="مثلاً: ۱۲۰-۱۴۰"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-900"
              />
            </div>
          </div>

          {/* Preferred Locations */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              محدوده یا محله‌های مدنظر
            </label>
            <input
              type="text"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              placeholder="مثلاً: سعادت‌آباد، شهرک غرب، صراف‌ها"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-900"
            />
          </div>

          {/* Follow-up schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                تعداد خواب
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-teal-600 text-slate-900"
              >
                <option value="1">۱ خواب</option>
                <option value="2">۲ خواب</option>
                <option value="3">۳ خواب</option>
                <option value="4">۴ خواب یا بیشتر</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                زمان پیگیری بعدی
              </label>
              <input
                type="text"
                value={followUpTime}
                onChange={(e) => setFollowUpTime(e.target.value)}
                placeholder="مثلاً: فردا ۱۱:۰۰"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-900"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              یادداشت‌های اختصاصی و شرایط خرید
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="نقدینگی در حساب، اولویت نور مستقیم، طبقات بالا..."
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-900 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>ثبت متقاضی و تطبیق هوشمند</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
