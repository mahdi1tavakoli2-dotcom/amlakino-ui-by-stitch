import React, { useState } from 'react';
import {
  ArrowRight,
  MoreVertical,
  Camera,
  MapPin,
  Calendar,
  Edit,
  ClipboardList,
  SlidersHorizontal,
  Users,
  CheckCircle2,
  Info,
  Phone,
  Send,
  CalendarCheck,
  Plus,
  Clock,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Building,
  Shield,
  Key,
  Flame,
  Lock,
  Lightbulb,
  FileText,
  History,
} from 'lucide-react';

import { useRouter } from '@/src/app/router/RouterContext';
import { useModals } from '@/src/app/context/ModalContext';
import { useToast } from '@/src/app/context/ToastContext';
import { useProperties } from '../hooks/useProperties';
import luxuryApartmentImage from '@/src/assets/images/luxury_apartment_saadat_abad_1791330057482.jpg';
import { toPersianDigits } from '@/src/core/utils/persianNumbers';
import { PropertyMatch } from '@/src/data/mockData';

export const PropertyDetailsPage: React.FC = () => {
  const { navigate, selectedPropertyId } = useRouter();
  const { openCall, openShare } = useModals();
  const { showToast } = useToast();
  const { properties } = useProperties();

  // Find the selected property or fall back to the first 140m Saadat Abad property
  const property =
    properties.find((p) => p.id === selectedPropertyId) || properties[0] || {
      id: 'prop-1',
      code: 'L-2084',
      title: 'آپارتمان ۱۴۰ متری، ۳ خواب - سعادت‌آباد',
      priceText: '۲۲٫۵ میلیارد تومان',
      location: 'سعادت‌آباد، صراف‌های شمالی',
      address: 'صراف‌های شمالی، کوچه یکم غربی',
    };

  // Accordion states
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(true);
  const [isPaymentTermsOpen, setIsPaymentTermsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Follow-up task completion state
  const [isTask1Done, setIsTask1Done] = useState(false);

  const handleBack = () => {
    navigate('properties');
  };

  const handleIntroduceDrRezaei = () => {
    const adapter: PropertyMatch = {
      id: property.id,
      matchScore: 94,
      location: 'سعادت‌آباد',
      title: property.title,
      priceText: property.priceText,
      areaTag: '۱۴۰ م',
      image: luxuryApartmentImage,
      clientName: 'دکتر علیرضا رضایی',
      clientBudget: 'بودجه تا ۲۳ م',
      tag: 'منطقه و قیمت هم‌خوان',
      features: ['۳ خواب مستر', 'پارکینگ سندی', 'آسانسور', 'انباری'],
      bedrooms: 3,
      floor: 3,
      parkingCount: 1,
      storage: true,
      elevator: true,
      address: 'سعادت‌آباد، صراف‌های شمالی، پلاک ۱۲',
    };
    openShare(adapter);
  };

  return (
    <div className="pb-24 animate-fade-in font-sans text-right">
      {/* 1. TOP HEADER (Dedicated detail navigation matching screenshot) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center justify-between shadow-xs">
        {/* Right in RTL: Back button */}
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-full bg-slate-100/90 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          title="بازگشت به لیست املاک"
          aria-label="بازگشت"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Center in RTL: Title & Code */}
        <div className="flex flex-col items-center text-center px-2 min-w-0">
          <h1 className="text-sm sm:text-base font-black text-slate-900 truncate">
            ملک L-2084...
          </h1>
          <span className="text-[11px] text-slate-400 font-medium truncate">
            آپارتمان ۱۴۰ متری سعادت‌آبـ...
          </span>
        </div>

        {/* Left in RTL: Three dots menu */}
        <button
          onClick={() => showToast('تنظیمات و خروجی فایل ملک')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="منوی بیشتر"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="px-3.5 py-3 space-y-3.5">
        {/* 2. SUMMARY CARD */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          {/* Top Info + Image row */}
          <div className="flex items-start justify-between gap-3">
            {/* Right text info in RTL */}
            <div className="flex-1 min-w-0">
              {/* Price & Subtitle */}
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-xl sm:text-2xl font-black text-teal-800 tracking-tight">
                  ۲۲٫۵ میلیارد
                </span>
                <span className="text-xs font-bold text-slate-500">تومان</span>
              </div>

              {/* Subprice pill */}
              <div className="mt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                  متری ۱۶۰ م • فروش
                </span>
              </div>

              {/* Title & Neighborhood */}
              <h2 className="text-sm font-extrabold text-slate-900 mt-2">
                آپارتمان مسکونی • سعادت‌آباد
              </h2>

              {/* Street Address */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">صراف‌های شمالی، کوچه یکم غربی</span>
              </div>
            </div>

            {/* Left Image in RTL */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden relative shrink-0 shadow-xs border border-slate-100 bg-slate-100">
              <img
                src={luxuryApartmentImage}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                <span>۸</span>
                <Camera className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Status pill */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>فعال • ۵ متقاضی مناسب • ۱ پیگیری امروز</span>
            </span>
          </div>

          {/* Key and Document badges */}
          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-100">
              <Key className="w-3.5 h-3.5 text-teal-600" />
              <span>کلید در اختیار</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span>سند تک‌برگ</span>
            </span>
          </div>
        </div>

        {/* 3. PRIMARY ACTION CTAs */}
        <div className="space-y-2">
          {/* Main Primary Button: ثبت و برنامه‌ریزی بازدید جدید */}
          <button
            onClick={() => showToast('فرم زمان‌بندی و هماهنگی بازدید باز شد.')}
            className="w-full py-3 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>ثبت و برنامه‌ریزی بازدید جدید</span>
          </button>

          {/* Two Secondary Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('امکان ویرایش مشخصات فایل')}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5 text-slate-500" />
              <span>ویرایش مشخصات</span>
            </button>

            <button
              onClick={() => showToast('فرم ثبت پیگیری جدید برای این فایل باز شد.')}
              className="py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/80 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5 text-teal-600" />
              <span>ثبت پیگیری</span>
            </button>
          </div>
        </div>

        {/* 4. KEY SPECIFICATIONS (مشخصات کلیدی ملک) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-teal-700" />
              <h3 className="text-sm font-extrabold text-slate-900">مشخصات کلیدی ملک</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">طبقه ۳ • دو واحدی</span>
          </div>

          {/* 8 Cards Grid */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {/* 1. متراژ */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">متراژ</span>
              <span className="font-extrabold text-slate-900 text-xs mt-1 block">۱۴۰ متر</span>
            </div>

            {/* 2. تعداد خواب */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">تعداد خواب</span>
              <span className="font-extrabold text-slate-900 text-[11px] mt-1 block leading-tight">
                ۳ (۱ مستر)
              </span>
            </div>

            {/* 3. طبقه */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">طبقه</span>
              <span className="font-extrabold text-slate-900 text-xs mt-1 block">۳ از ۵</span>
            </div>

            {/* 4. سن بنا */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">سن بنا</span>
              <span className="font-extrabold text-slate-900 text-xs mt-1 block">۳ سال</span>
            </div>

            {/* 5. پارکینگ */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">پارکینگ</span>
              <span className="font-extrabold text-slate-900 text-xs mt-1 block">سندی</span>
            </div>

            {/* 6. آسانسور */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">آسانسور</span>
              <span className="font-extrabold text-slate-900 text-xs mt-1 block">۸ نفره</span>
            </div>

            {/* 7. انباری */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">انباری</span>
              <span className="font-extrabold text-slate-900 text-xs mt-1 block">۶ متر</span>
            </div>

            {/* 8. سند */}
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">سند</span>
              <span className="font-extrabold text-teal-700 text-xs mt-1 block">تک‌برگ</span>
            </div>
          </div>
        </div>

        {/* 5. MATCHED BUYERS (مشتریان متقاضی این ملک) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-700" />
              <h3 className="text-sm font-extrabold text-slate-900">مشتریان متقاضی این ملک</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-100">
              ۵ متقاضی • ۲ تطبیق عالی
            </span>
          </div>

          {/* Primary Matched Buyer: دکتر علیرضا رضایی */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-3">
            {/* Top profile row */}
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-full bg-teal-700 text-white font-black text-sm flex items-center justify-center shrink-0">
                رض
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                    دکتر علیرضا رضایی
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100 text-[10px] font-black shrink-0">
                    ۹۴٪ تطبیق عالی
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  بودجه: تا ۲۳ میلیارد تومان (۱۰۰٪ نقد و آماده)
                </p>
              </div>
            </div>

            {/* Checklist breakdown */}
            <div className="bg-white rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>منطقه ۱۰۰٪ منطبق با خواسته خریدار (سعادت‌آباد)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>بودجه نقد و آماده قرارداد بدون نیاز به فروش ملک دیگر</span>
              </div>
              <div className="flex items-start gap-1.5 text-amber-700">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>طبقه ترجیحی ۴ بود (این ملک در طبقه ۳ قرار دارد)</span>
              </div>
            </div>

            {/* Actions for this buyer */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() =>
                  openCall({
                    contactName: 'دکتر علیرضا رضایی',
                    phoneNumber: '۰۹۱۲۴۴۵۵۶۷۸',
                    subtitle: 'خریدار سعادت‌آباد • بودجه ۲۳ م',
                  })
                }
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-teal-700 hover:bg-teal-50 flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer"
                title="تماس با دکتر رضایی"
              >
                <Phone className="w-4 h-4" />
              </button>

              <button
                onClick={handleIntroduceDrRezaei}
                className="flex-1 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>معرفی فایل و هماهنگی بازدید</span>
              </button>
            </div>
          </div>

          {/* Secondary Buyer: مهندس کیانی */}
          <div
            onClick={() => showToast('مشاهده پرونده تطبیق مهندس کیانی')}
            className="p-3 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                کی
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-800">مهندس کیانی</h5>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  بودجه ۲۲ میلیارد • پیگیری ۲ روز پیش
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100 text-[10px] font-bold">
                ۸۸٪ تطبیق قوی
              </span>
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* 6. SCHEDULED VISITS (بازدیدهای برنامه‌ریزی‌شده) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-teal-700" />
              <h3 className="text-sm font-extrabold text-slate-900">بازدیدهای برنامه‌ریزی‌شده</h3>
            </div>
            <button
              onClick={() => showToast('فرم زمان‌بندی بازدید جدید')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
            >
              + زمان‌بندی
            </button>
          </div>

          {/* Active Visit Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-slate-900">امروز • ساعت ۱۸:۳۰</span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  متقاضی: دکتر علیرضا رضایی (همراه با همسر)
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold">
                تأیید شده
              </span>
            </div>

            {/* Note box */}
            <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
              یادداشت مشاور: هماهنگی با سرایدار جهت تحویل کلید و تست روشنایی انجام شد.
            </div>

            {/* Button */}
            <button
              onClick={() => showToast('فرم ثبت بازخورد بازدید باز شد.')}
              className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 text-teal-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5 text-teal-700" />
              <span>ثبت نتیجه و بازخورد پس از بازدید</span>
            </button>
          </div>

          {/* Past visit note */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>۲ روز پیش با آقای مهندس کیانی</span>
            </div>
            <span className="text-[11px] text-slate-400">پسندیدند، در حال مذاکره</span>
          </div>
        </div>

        {/* 7. FOLLOW-UP QUEUE (صف پیگیری‌های این ملک) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-teal-700" />
              <h3 className="text-sm font-extrabold text-slate-900">صف پیگیری‌های این ملک</h3>
            </div>
            <span className="text-xs font-bold text-slate-400">۲ وظیفه</span>
          </div>

          {/* Task 1 */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-start gap-2.5 min-w-0">
              <button
                onClick={() => setIsTask1Done(!isTask1Done)}
                className="mt-0.5 text-teal-700 hover:text-teal-900 cursor-pointer"
              >
                {isTask1Done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                )}
              </button>
              <div className="min-w-0">
                <span
                  className={`text-xs font-bold ${
                    isTask1Done ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}
                >
                  بررسی بازخورد قیمت و جلسه با دکتر رضایی
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  فردا ساعت ۱۰:۰۰ • در انتظار تماس
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                openCall({
                  contactName: 'دکتر علیرضا رضایی',
                  phoneNumber: '۰۹۱۲۴۴۵۵۶۷۸',
                  subtitle: 'بررسی بازخورد قیمت',
                })
              }
              className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 hover:bg-teal-100 cursor-pointer"
              title="تماس"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Task 2 (Completed) */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/40 border border-slate-100/60 opacity-80">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-medium text-slate-600">
                استعلام نهایی کلید از سرایداری
              </span>
            </div>
            <span className="text-[10px] text-slate-400">امروز ۹:۰۰</span>
          </div>
        </div>

        {/* 8. AMENITIES ACCORDIONS (امکانات، جزئیات و شرایط معامله) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-2.5">
          {/* Main Title */}
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <Building className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-extrabold text-slate-900">
              امکانات، جزئیات و شرایط معامله
            </h3>
          </div>

          {/* Accordion 1: امکانات ساختمان و واحد */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
              className="w-full p-3 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-700" />
                <span>امکانات ساختمان و واحد (لابی، سرایداری، چیلر...)</span>
              </div>
              {isAmenitiesOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isAmenitiesOpen && (
              <div className="p-3 bg-white grid grid-cols-2 gap-2 text-xs text-slate-700 animate-fade-in">
                <div className="p-2 rounded-xl bg-slate-50 flex items-center gap-2">
                  <Building className="w-4 h-4 text-teal-600" />
                  <span>لابی مجلل مبله</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>سرایداری ۲۴ ساعته</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-teal-600" />
                  <span>تراس روبه جنوب</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 flex items-center gap-2">
                  <Info className="w-4 h-4 text-teal-600" />
                  <span>داکت اسپلیت اینورتر</span>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: شرایط پرداخت */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsPaymentTermsOpen(!isPaymentTermsOpen)}
              className="w-full p-3 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                <span>شرایط پرداخت و انعطاف فروشنده (تهاتر، تخفیف نقد...)</span>
              </div>
              {isPaymentTermsOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isPaymentTermsOpen && (
              <div className="p-3 bg-white text-xs text-slate-600 leading-relaxed animate-fade-in">
                فروشنده انعطاف کامل جهت دریافت ۷۰٪ نقد همزمان با قرارداد، ۲۰٪ زمان تحویل ملک و ۱۰٪ زمان انتقال سند رسمی در دفترخانه دارد. امکان تهاتر تا ۴ میلیارد با خودرو خارجی سال.
              </div>
            )}
          </div>

          {/* Accordion 3: یادداشت‌ها و توضیحات */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="w-full p-3 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-700" />
                <span>یادداشت‌ها و توضیحات تکمیلی</span>
              </div>
              {isNotesOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isNotesOpen && (
              <div className="p-3 bg-white text-xs text-slate-600 leading-relaxed animate-fade-in">
                ملک تک‌واحدی، متریال درجه یک وارداتی، مشاعات سنگ اسلب، آسانسور گیرلس ایتالیایی، کابینت‌های انزو با صفحه کورین.
              </div>
            )}
          </div>
        </div>

        {/* 9. CONFIDENTIAL DOSSIER (اطلاعات محرمانه پرونده - فقط برای شما) */}
        <div className="bg-indigo-50/70 border border-indigo-150 rounded-3xl p-4 shadow-xs space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
            <div className="flex items-center gap-1.5 text-indigo-950">
              <Lock className="w-4 h-4 text-indigo-700" />
              <h3 className="text-xs sm:text-sm font-black">
                اطلاعات محرمانه پرونده (فقط برای شما)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-black">
              محرمانه
            </span>
          </div>

          {/* Owner Profile & Direct Call */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                مهندس تهرانی
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                سازنده برند منطقه و مالک قطعی
              </p>
              <p className="text-xs text-indigo-900 font-bold tracking-wider font-mono mt-0.5">
                ۰۹۱۲ ۰۰۰ ۴۵۸۲
              </p>
            </div>

            <button
              onClick={() =>
                openCall({
                  contactName: 'مهندس تهرانی (مالک)',
                  phoneNumber: '۰۹۱۲۰۰۰۴۵۸۲',
                  subtitle: 'فایل L-2084 سعادت‌آباد',
                })
              }
              className="py-2 px-3.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>تماس مستقیم</span>
            </button>
          </div>

          {/* Exact Address Box */}
          <div className="p-3 bg-white/80 rounded-2xl border border-indigo-100 text-xs text-slate-700 space-y-1">
            <span className="text-[11px] text-slate-400 font-bold block">
              آدرس دقیق ثبتی ملک:
            </span>
            <p className="font-bold text-slate-800 leading-relaxed">
              سعادت‌آباد، میدان کاج، خیابان صراف‌های شمالی، پلاک ۱۲، زنگ سوم
            </p>
          </div>

          {/* Strategic Advisor Note */}
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-extrabold">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>یادداشت استراتژیک مشاور:</span>
            </div>
            <p className="text-slate-700 leading-relaxed mt-1">
              فروشنده کاملاً واقعی است. به دلیل پیش‌خرید پروژه اداری نیازمند نقدینگی تا پایان هفته جاری است. امکان تخفیف تا ۵۰۰ میلیون تومان در جلسه حضوری وجود دارد.
            </p>
          </div>
        </div>

        {/* 10. ACTIVITY HISTORY (تاریخچه فعالیت) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <History className="w-4 h-4 text-teal-700" />
              <h3 className="text-sm font-extrabold text-slate-900">تاریخچه فعالیت</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">به‌روزرسانی امروز</span>
          </div>

          {/* Timeline Points */}
          <div className="space-y-3 text-xs">
            {/* 1 */}
            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">امروز ۱۱:۲۰</span>
                </div>
                <p className="text-slate-600 mt-0.5">ثبت هماهنگی بازدید با دکتر رضایی</p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-slate-900">دیروز</span>
                <p className="text-slate-600 mt-0.5">
                  ۳ متقاضی جدید با معیارهای این ملک تطبیق یافتند.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-slate-900">۳ روز پیش</span>
                <p className="text-slate-600 mt-0.5">
                  ثبت اولیه و راستی‌آزمایی سند توسط شما انجام شد.
                </p>
              </div>
            </div>
          </div>

          {/* View All link */}
          <button
            onClick={() => showToast('نمایش گزارش جامع لاگ و تاریخچه')}
            className="w-full pt-2 flex items-center justify-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
          >
            <span>مشاهده همه فعالیت‌ها</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
