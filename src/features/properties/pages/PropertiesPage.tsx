import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Zap,
  Mic,
  Plus,
  PlusCircle,
  MapPin,
  User,
  Camera,
  Clock,
  Phone,
  ChevronLeft,
  Info,
} from 'lucide-react';

import { useProperties } from '../hooks/useProperties';
import { useModals } from '@/src/app/context/ModalContext';
import { useToast } from '@/src/app/context/ToastContext';
import { useRouter } from '@/src/app/router/RouterContext';
import { PropertyEntity, PropertyFilterQuery, PropertyListingType } from '../types/property.types';
import { PropertyMatch } from '@/src/data/mockData';
import { toPersianDigits } from '@/src/core/utils/persianNumbers';
import { VoiceAddPropertyModal } from '../components/VoiceAddPropertyModal';
import { PropertyFilterSheet } from '../components/PropertyFilterSheet';

export const PropertiesPage: React.FC = () => {
  const { openQuickAdd, openCall } = useModals();
  const { showToast } = useToast();
  const { navigateToPropertyDetails } = useRouter();

  const [activeCategoryTab, setActiveCategoryTab] = useState<PropertyListingType>('all');
  const [activeStatusCategory, setActiveStatusCategory] = useState<'all' | 'fresh' | 'inquiry' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState<PropertyFilterQuery>({});

  const { properties, totalCount } = useProperties({
    listingType: advancedFilter.listingType || (activeCategoryTab === 'all' ? undefined : activeCategoryTab),
    statusCategory: advancedFilter.statusCategory || (activeStatusCategory === 'all' ? undefined : activeStatusCategory),
    searchQuery: searchQuery,
    location: advancedFilter.location,
  });

  const handleOpenDetails = (prop: PropertyEntity) => {
    navigateToPropertyDetails(prop.id);
  };

  const handleCallOwner = (prop: PropertyEntity) => {
    openCall({
      contactName: prop.ownerName || 'مالک فایل',
      phoneNumber: prop.ownerPhone || '۰۹۱۲۵۵۵۶۶۷۷',
      subtitle: `استعلام فایل: ${prop.title}`,
    });
  };

  return (
    <div className="px-3.5 py-2.5 pb-24 text-right animate-fade-in">
      {/* 1. HERO BANNER: ثبت و سپردن سریع ملک */}
      <div className="bg-[#0c7a6f] rounded-3xl p-4 text-white shadow-sm mb-4 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top row of banner */}
        <div className="flex items-center justify-between gap-2">
          {/* Right in RTL: Icon + Title */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-teal-600/60 flex items-center justify-center text-teal-200">
              <Zap className="w-3.5 h-3.5 fill-teal-200" />
            </div>
            <h3 className="text-sm font-extrabold tracking-tight">ثبت و سپردن سریع ملک</h3>
          </div>

          {/* Left in RTL: Mint pill badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-900/60 text-teal-200 text-[10px] font-bold border border-teal-600/40">
            <Mic className="w-3 h-3 text-teal-300" />
            <span>دستیار صوتی هوشمند</span>
          </span>
        </div>

        {/* Description line */}
        <p className="text-xs text-teal-100/90 font-normal leading-relaxed mt-2 mb-3.5">
          فایل جدید را کمتر از ۳۰ ثانیه بسپارید یا با ویس مالک ثبت کنید تا هوش مصنوعی اطلاعات را استخراج کند.
        </p>

        {/* Action buttons inside banner */}
        <div className="grid grid-cols-2 gap-2">
          {/* Right Button: + ثبت سریع دستی */}
          <button
            onClick={openQuickAdd}
            className="bg-white text-teal-900 font-bold text-xs py-2 px-3 rounded-xl shadow-xs flex items-center justify-center gap-1.5 hover:bg-teal-50 active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-teal-700" />
            <span>ثبت سریع دستی</span>
          </button>

          {/* Left Button: ثبت ملک با صدا */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="bg-teal-900/50 hover:bg-teal-900/70 text-white font-bold text-xs py-2 px-3 rounded-xl border border-teal-500/40 flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4 text-teal-300" />
            <span>ثبت ملک با صدا</span>
          </button>
        </div>
      </div>

      {/* 2. SEARCH & ADVANCED FILTER ROW */}
      <div className="flex items-center gap-2 mb-3">
        {/* Right in RTL: Search Input with icon inside on the left */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در فایل‌ها (منطقه، متراژ، قیمت...)"
            className="w-full pr-3.5 pl-9 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 shadow-xs transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Left in RTL: Filter icon button */}
        <button
          onClick={() => setIsFilterSheetOpen(true)}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-teal-700 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer shrink-0"
          title="فیلترهای پیشرفته"
          aria-label="فیلترها"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 3. CATEGORY PILL TABS (Horizontal Scroll) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-2.5 no-scrollbar scroll-smooth">
        <button
          onClick={() => setActiveCategoryTab('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategoryTab === 'all'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          همه فایل‌ها ({toPersianDigits(totalCount || 48)})
        </button>

        <button
          onClick={() => setActiveCategoryTab('sale')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategoryTab === 'sale'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          فروش
        </button>

        <button
          onClick={() => setActiveCategoryTab('rent')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategoryTab === 'rent'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          رهن و اجاره
        </button>

        <button
          onClick={() => setActiveCategoryTab('apartment')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategoryTab === 'apartment'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          آپارتمان
        </button>

        <button
          onClick={() => setActiveCategoryTab('commercial')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCategoryTab === 'commercial'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          کلنگی / اداری
        </button>
      </div>

      {/* 4. STATUS INDICATOR SEGMENT PILLS */}
      <div className="flex items-center gap-2 mb-4 text-[11px] overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveStatusCategory('fresh')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
            activeStatusCategory === 'fresh'
              ? 'bg-white border-slate-300 text-slate-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>تازه و معتبر (۳۱)</span>
        </button>

        <button
          onClick={() => setActiveStatusCategory('inquiry')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
            activeStatusCategory === 'inquiry'
              ? 'bg-white border-amber-300 text-amber-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>نیاز به استعلام (۱۲)</span>
        </button>

        <button
          onClick={() => setActiveStatusCategory('archived')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
            activeStatusCategory === 'archived'
              ? 'bg-white border-slate-300 text-slate-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span>منقضی/بایگانی (۵)</span>
        </button>
      </div>

      {/* 5. PROPERTY CARDS LIST */}
      <div className="space-y-3.5">
        {properties.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenDetails(item)}
            className={`bg-white rounded-2xl p-3.5 shadow-xs border transition-all cursor-pointer hover:shadow-sm ${
              item.hasWarningAccent
                ? 'border-slate-100 border-r-4 border-r-amber-400'
                : 'border-slate-100'
            }`}
          >
            {/* Top row of card */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              {/* Right in RTL: Exclusive/Category Badge + Title */}
              <div className="flex items-center gap-1.5 min-w-0">
                {item.exclusiveBadge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-black shrink-0">
                    {item.exclusiveBadge}
                  </span>
                )}
                {item.categoryBadge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200/80 text-[10px] font-black shrink-0">
                    {item.categoryBadge}
                  </span>
                )}
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                  {item.title}
                </h4>
              </div>

              {/* Left in RTL: Status Badge */}
              <div className="shrink-0">
                {item.statusBadge.type === 'warning' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-[10px] font-bold">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{item.statusBadge.text}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item.statusBadge.text}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Middle Content Row: Information on right, Photo on left */}
            <div className="flex items-start justify-between gap-3 my-1">
              {/* Right Info Section */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                {/* Convertible tag if applicable */}
                {item.convertible && (
                  <div className="mb-1">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                      قابل تبدیل
                    </span>
                  </div>
                )}

                {/* Price Display */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <div className="text-sm sm:text-base font-black text-slate-900">
                    {item.priceText}
                  </div>
                  {item.priceSubtitle && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      {item.priceSubtitle}
                    </span>
                  )}
                  {item.rentSubtitle && (
                    <span className="text-xs font-black text-teal-800 mr-2">
                      {item.rentSubtitle}
                    </span>
                  )}
                </div>

                {/* Amenities Chips Row */}
                <div className="flex items-center gap-1 flex-wrap my-1.5">
                  {item.amenitiesChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-medium"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Location or Owner Row */}
                {item.ownerName ? (
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>مالک: {item.ownerName}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}
              </div>

              {/* Left Photo Section with Count Badge */}
              <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative shrink-0 bg-slate-100 border border-slate-100 shadow-xs group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                  <span>{toPersianDigits(item.photoCount)}</span>
                  <Camera className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Bottom Action & Match Bar */}
            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100/90 gap-2">
              {/* Right: Match Score + Matched Clients */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                    item.matchScore >= 90
                      ? 'bg-teal-700 text-white'
                      : item.matchScore >= 85
                      ? 'bg-amber-500 text-white'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  {toPersianDigits(item.matchScore)}٪ تطبیق
                </span>
                <span className="text-[11px] font-bold text-slate-600">
                  {item.matchedClientsText}
                </span>
              </div>

              {/* Left: Action Button */}
              <div>
                {item.ctaType === 'inquiry_call' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCallOwner(item);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-50 active:scale-95 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>استعلام سریع مالک</span>
                    <Phone className="w-3 h-3 text-amber-600" />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetails(item);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>
                      {item.ctaType === 'view_and_buyers'
                        ? 'مشاهده ملک و خریداران'
                        : 'مشاهده ملک'}
                    </span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 6. BOTTOM NOTICE (matching screenshot) */}
      <div className="flex items-center justify-center gap-1.5 py-4 text-center text-slate-400 text-[11px] font-medium">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>برای ثبت فایل جدید کلید سبز (+) را در پایین لمس کنید</span>
      </div>

      {/* Interactive Voice Registration Modal */}
      {isVoiceModalOpen && (
        <VoiceAddPropertyModal
          onClose={() => setIsVoiceModalOpen(false)}
          onAdded={(title) => {
            showToast(`فایل «${title}» با دستیار صوتی ثبت شد.`);
          }}
        />
      )}

      {/* Advanced Filter Bottom Sheet */}
      {isFilterSheetOpen && (
        <PropertyFilterSheet
          onClose={() => setIsFilterSheetOpen(false)}
          currentFilter={advancedFilter}
          onApplyFilter={(f) => {
            setAdvancedFilter(f);
            showToast('فیلترها با موفقیت اعمال شدند.');
          }}
        />
      )}
    </div>
  );
};
