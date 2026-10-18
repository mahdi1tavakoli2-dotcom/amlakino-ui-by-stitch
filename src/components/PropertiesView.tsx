import React, { useState } from 'react';
import { Building2, Search, Filter, Zap, Share2, Plus } from 'lucide-react';
import { propertyMatchesList, PropertyMatch } from '../data/mockData';

interface PropertiesViewProps {
  onSelectProperty: (property: PropertyMatch) => void;
  onShare: (property: PropertyMatch) => void;
  onAddNew: () => void;
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  onSelectProperty,
  onShare,
  onAddNew,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = propertyMatchesList.filter((p) =>
    p.title.includes(searchTerm) || p.location.includes(searchTerm)
  );

  return (
    <div className="px-4 py-3 pb-24 text-right animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-black text-slate-900">بانک فایل‌های ملکی</h2>
          <p className="text-xs text-slate-400">۲۴ فایل فعال تحت مدیریت شما</p>
        </div>
        <button
          onClick={onAddNew}
          className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>فایل جدید</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl mb-3 text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-white text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          همه فایل‌ها (۲۴)
        </button>
        <button
          onClick={() => setActiveFilter('sale')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
            activeFilter === 'sale'
              ? 'bg-white text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          فروش و پیش‌فروش
        </button>
        <button
          onClick={() => setActiveFilter('rent')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
            activeFilter === 'rent'
              ? 'bg-white text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          رهن و اجاره VIP
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجو بر اساس متراژ، منطقه، قیمت..."
          className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-teal-600"
        />
        <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectProperty(item)}
            className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">{item.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                    {item.location}
                  </span>
                </div>
                <div className="text-xs font-black text-teal-700 mt-1">{item.priceText}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {item.bedrooms} خواب • طبقه {item.floor} • پارکینگ سندی
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] text-emerald-600 font-bold">
                تطبیق ۹۴٪ با مشتریان فعال
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(item);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold"
              >
                <Share2 className="w-3 h-3" />
                <span>اشتراک‌گذاری</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
