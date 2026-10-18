import React, { useState } from 'react';
import { X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PropertyFilterQuery } from '../types/property.types';

interface PropertyFilterSheetProps {
  onClose: () => void;
  currentFilter: PropertyFilterQuery;
  onApplyFilter: (filter: PropertyFilterQuery) => void;
}

export const PropertyFilterSheet: React.FC<PropertyFilterSheetProps> = ({
  onClose,
  currentFilter,
  onApplyFilter,
}) => {
  const [selectedListingType, setSelectedListingType] = useState(currentFilter.listingType || 'all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(currentFilter.location || '');
  const [selectedStatus, setSelectedStatus] = useState(currentFilter.statusCategory || 'all');

  const neighborhoods = ['همه محله‌ها', 'سعادت‌آباد', 'شهرک غرب', 'زعفرانیه', 'ولنجک'];

  const handleApply = () => {
    onApplyFilter({
      listingType: selectedListingType,
      location: selectedNeighborhood === 'همه محله‌ها' ? '' : selectedNeighborhood,
      statusCategory: selectedStatus,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedListingType('all');
    setSelectedNeighborhood('');
    setSelectedStatus('all');
    onApplyFilter({
      listingType: 'all',
      location: '',
      statusCategory: 'all',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-slide-up">
        {/* Top grab bar */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-extrabold text-slate-900">فیلترهای پیشرفته فایل‌ها</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Section: نوع معامله */}
        <div className="my-3">
          <label className="text-xs font-bold text-slate-800 block mb-2">نوع معامله:</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { id: 'all', label: 'همه' },
              { id: 'sale', label: 'فروش' },
              { id: 'rent', label: 'رهن و اجاره' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedListingType(item.id as any)}
                className={`py-2 px-3 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedListingType === item.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Section: محدوده و محله */}
        <div className="my-3">
          <label className="text-xs font-bold text-slate-800 block mb-2">منطقه و محله:</label>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {neighborhoods.map((n) => {
              const isSelected =
                (n === 'همه محله‌ها' && !selectedNeighborhood) ||
                selectedNeighborhood === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSelectedNeighborhood(n === 'همه محله‌ها' ? '' : n)}
                  className={`py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border border-teal-500 text-teal-800 font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Section: وضعیت فایل */}
        <div className="my-3">
          <label className="text-xs font-bold text-slate-800 block mb-2">وضعیت استعلام فایل:</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { id: 'all', label: 'همه وضعیت‌ها' },
              { id: 'fresh', label: 'تازه و معتبر' },
              { id: 'inquiry', label: 'نیازمند استعلام' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedStatus(item.id as any)}
                className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                  selectedStatus === item.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>پاک کردن فیلترها</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>اعمال فیلتر</span>
          </button>
        </div>
      </div>
    </div>
  );
};
