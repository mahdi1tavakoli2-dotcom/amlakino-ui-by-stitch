import React, { useState } from 'react';
import { Search, Building, User, Calendar } from 'lucide-react';
import { followUpsList, schedulesList, PropertyMatch, FollowUpItem, ScheduleItem } from '../data/mockData';
import { useProperties } from '../features/properties/hooks/useProperties';
import { PropertyEntity } from '../features/properties/types/property.types';

interface SearchModalProps {
  onClose: () => void;
  onSelectProperty: (item: PropertyMatch) => void;
  onSelectClient: (item: FollowUpItem) => void;
  onSelectSchedule: (item: ScheduleItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  onSelectProperty,
  onSelectClient,
  onSelectSchedule,
}) => {
  const [query, setQuery] = useState('');
  const { properties } = useProperties();

  const filteredProperties = properties.filter(
    (p) => p.title.includes(query) || p.location.includes(query)
  );

  const filteredClients = followUpsList.filter(
    (c) => c.name.includes(query) || c.proposal.includes(query)
  );

  const filteredSchedules = schedulesList.filter(
    (s) => s.title.includes(query) || s.subtitle.includes(query)
  );

  const handlePropertyClick = (p: PropertyEntity) => {
    onClose();
    const adapter: PropertyMatch = {
      id: p.id,
      matchScore: p.matchScore || 90,
      location: p.location,
      title: p.title,
      priceText: p.priceText,
      areaTag: p.areaTag,
      image: p.image,
      clientName: p.ownerName || 'متقاضی',
      clientBudget: p.priceText,
      tag: p.tag || 'فایل فعال',
      features: p.amenitiesChips,
      bedrooms: p.features.bedrooms,
      floor: p.features.floor,
      parkingCount: p.features.parkingCount,
      storage: p.features.storage,
      elevator: p.features.elevator,
      address: p.address || p.location,
    };
    onSelectProperty(adapter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right mt-10 sm:mt-12 animate-scale-up max-h-[85vh] flex flex-col">
        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در فایل‌ها، مشتریان، بازدیدها..."
            className="w-full pr-10 pl-10 py-3 rounded-2xl bg-slate-100 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              ×
            </button>
          )}
        </div>

        {/* Results */}
        <div className="overflow-y-auto space-y-4 flex-1 pr-1">
          {/* Properties */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
              <Building className="w-3.5 h-3.5 text-teal-600" />
              <span>فایل‌های ملکی ({filteredProperties.length}):</span>
            </div>
            <div className="space-y-1.5">
              {filteredProperties.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handlePropertyClick(p)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 transition-colors cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">{p.title}</span>
                  <span className="text-[11px] text-teal-700 font-extrabold">{p.priceText}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clients */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>متقاضیان و سرمایه‌گذاران ({filteredClients.length}):</span>
            </div>
            <div className="space-y-1.5">
              {filteredClients.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onClose();
                    onSelectClient(c);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 transition-colors cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">{c.name}</span>
                  <span className="text-[11px] text-slate-500">{c.roleBadge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedules */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>برنامه‌ها ({filteredSchedules.length}):</span>
            </div>
            <div className="space-y-1.5">
              {filteredSchedules.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onClose();
                    onSelectSchedule(s);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 transition-colors cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">{s.title}</span>
                  <span className="text-[11px] text-slate-500">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
        >
          بستن
        </button>
      </div>
    </div>
  );
};
