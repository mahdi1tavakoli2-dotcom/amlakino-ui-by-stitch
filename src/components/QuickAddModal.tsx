import React, { useState } from 'react';
import { X, Building2, UserPlus, CalendarPlus, Mic } from 'lucide-react';
import { propertyRepository } from '../features/properties/api/property.repository';

interface QuickAddModalProps {
  onClose: () => void;
  onAdded: (message: string) => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  onClose,
  onAdded,
}) => {
  const [activeForm, setActiveForm] = useState<'menu' | 'property' | 'client' | 'visit'>('menu');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyPrice, setPropertyPrice] = useState('');
  const [propertyArea, setPropertyArea] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [visitLocation, setVisitLocation] = useState('');
  const [visitTime, setVisitTime] = useState('');

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyTitle || !propertyPrice) return;

    await propertyRepository.create({
      title: propertyTitle,
      location: propertyLocation || 'سعادت‌آباد',
      priceText: propertyPrice,
      areaSqm: parseInt(propertyArea, 10) || 120,
      listingType: 'sale',
    });

    onAdded(`فایل «${propertyTitle}» با موفقیت در بانک املاک ثبت شد.`);
    onClose();
  };

  const handleSubmitClient = (e: React.FormEvent) => {
    e.preventDefault();
    onAdded(`متقاضی «${clientName}» با موفقیت ثبت شد.`);
    onClose();
  };

  const handleSubmitVisit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdded(`قرار بازدید در «${visitLocation}» برای ${visitTime} تنظیم شد.`);
    onClose();
  };

  const handleVoiceNote = () => {
    onAdded('یادداشت صوتی هوشمند ضبط و توسط AI پردازش گردید.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-slide-up">
        {/* Top grab bar */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-slate-900">
            {activeForm === 'menu' && 'ثبت و عملیات سریع'}
            {activeForm === 'property' && 'ثبت فایل ملکی جدید'}
            {activeForm === 'client' && 'ثبت متقاضی جدید'}
            {activeForm === 'visit' && 'تنظیم قرار بازدید'}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeForm === 'menu' ? (
          <div className="grid grid-cols-2 gap-2.5 my-4">
            <button
              onClick={() => setActiveForm('property')}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50 hover:border-teal-300 border border-slate-100 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">ثبت ملک جدید</span>
              <span className="text-[10px] text-slate-400">فروش، رهن یا اجاره</span>
            </button>

            <button
              onClick={() => setActiveForm('client')}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50 hover:border-teal-300 border border-slate-100 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserPlus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">ثبت متقاضی جدید</span>
              <span className="text-[10px] text-slate-400">خریدار یا مستأجر</span>
            </button>

            <button
              onClick={() => setActiveForm('visit')}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50 hover:border-teal-300 border border-slate-100 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CalendarPlus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">تنظیم قرار بازدید</span>
              <span className="text-[10px] text-slate-400">هماهنگی ساعت و کلید</span>
            </button>

            <button
              onClick={handleVoiceNote}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50 hover:border-teal-300 border border-slate-100 flex flex-col items-center text-center gap-2 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100/70 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mic className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">یادداشت هوشمند</span>
              <span className="text-[10px] text-slate-400">پردازش صوتی با AI</span>
            </button>
          </div>
        ) : activeForm === 'property' ? (
          <form onSubmit={handleSubmitProperty} className="my-3 space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">عنوان ملک و متراژ:</label>
              <input
                type="text"
                required
                value={propertyTitle}
                onChange={(e) => setPropertyTitle(e.target.value)}
                placeholder="مثال: ۱۴۰ متری علامه سعادت‌آباد"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">منطقه / محله:</label>
                <input
                  type="text"
                  value={propertyLocation}
                  onChange={(e) => setPropertyLocation(e.target.value)}
                  placeholder="مثال: سعادت‌آباد"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">متراژ (متر):</label>
                <input
                  type="number"
                  value={propertyArea}
                  onChange={(e) => setPropertyArea(e.target.value)}
                  placeholder="مثال: ۱۴۰"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">قیمت یا رهن (تومان):</label>
              <input
                type="text"
                required
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(e.target.value)}
                placeholder="مثال: ۱۴ میلیارد تومان"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveForm('menu')}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
              >
                بازگشت
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold shadow-xs hover:bg-teal-800 cursor-pointer active:scale-95 transition-all"
              >
                ثبت ملک در سامانه
              </button>
            </div>
          </form>
        ) : activeForm === 'client' ? (
          <form onSubmit={handleSubmitClient} className="my-3 space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">نام و نام خانوادگی:</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="مثال: آقای مهندس حسینی"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">شماره تماس:</label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="۰۹۱۲..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 text-left"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveForm('menu')}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
              >
                بازگشت
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold shadow-xs hover:bg-teal-800 cursor-pointer active:scale-95 transition-all"
              >
                ثبت متقاضی
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitVisit} className="my-3 space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">محل بازدید:</label>
              <input
                type="text"
                required
                value={visitLocation}
                onChange={(e) => setVisitLocation(e.target.value)}
                placeholder="مثال: کوچه صنوبر، پلاک ۶"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">ساعت بازدید امروز:</label>
              <input
                type="text"
                required
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                placeholder="مثال: ساعت ۱۹:۰۰"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveForm('menu')}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
              >
                بازگشت
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold shadow-xs hover:bg-teal-800 cursor-pointer active:scale-95 transition-all"
              >
                تنظیم قرار بازدید
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
