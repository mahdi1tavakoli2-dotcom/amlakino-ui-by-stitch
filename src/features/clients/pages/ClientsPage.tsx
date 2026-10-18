import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Flame,
  Sun,
  Handshake,
  Sparkles,
  ChevronLeft,
  FileText,
  User,
  Snowflake,
} from 'lucide-react';

import { useClients } from '../hooks/useClients';
import { ClientEntity, ClientLeadStatus } from '../types/client.types';
import { useModals } from '@/src/app/context/ModalContext';
import { useToast } from '@/src/app/context/ToastContext';
import { toPersianDigits } from '@/src/core/utils/persianNumbers';

import { ClientDossierModal } from '../components/ClientDossierModal';
import { AddClientModal } from '../components/AddClientModal';
import { VoiceAddClientModal } from '../components/VoiceAddClientModal';
import { ClientFilterSheet, ClientAdvancedFilter } from '../components/ClientFilterSheet';

export const ClientsPage: React.FC = () => {
  const { openCall } = useModals();
  const { showToast } = useToast();
  const { clients, addClient, totalCount } = useClients();

  const [activeTab, setActiveTab] = useState<ClientLeadStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientEntity | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState<ClientAdvancedFilter>({});

  // Summary Metrics
  const hotCount = clients.filter((c) => c.statusCategory === 'hot').length;
  const warmCount = clients.filter((c) => c.statusCategory === 'warm').length;
  const dealCount = clients.filter((c) => c.statusCategory === 'deal').length;
  const coldCount = clients.filter((c) => c.statusCategory === 'cold').length;

  // Filtered Clients
  const filteredClients = clients.filter((client) => {
    // Advanced Filter Checks
    if (advancedFilter.leadStatus && client.statusCategory !== advancedFilter.leadStatus) {
      return false;
    }
    if (advancedFilter.category && client.category !== advancedFilter.category) {
      return false;
    }
    if (advancedFilter.hasOverdueOnly && !client.nextFollowUp.isOverdue) {
      return false;
    }

    // Active Tab Filter
    if (activeTab === 'hot' && client.statusCategory !== 'hot') return false;
    if (activeTab === 'warm' && client.statusCategory !== 'warm') return false;
    if (activeTab === 'deal' && client.statusCategory !== 'deal') return false;
    if (activeTab === 'cold' && client.statusCategory !== 'cold') return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchName = client.name.toLowerCase().includes(q);
      const matchLoc = client.preferredLocations.toLowerCase().includes(q);
      const matchBudget = client.budgetDisplay.toLowerCase().includes(q);
      const matchPhone = client.phone.includes(q);
      const matchCategory = client.category.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchBudget && !matchPhone && !matchCategory) {
        return false;
      }
    }

    return true;
  });

  const handleCallClient = (client: ClientEntity) => {
    openCall({
      contactName: client.name,
      phoneNumber: client.phone,
      subtitle: `${client.category} • بودجه ${client.budgetDisplay}`,
    });
  };

  const handleSendMessage = (client: ClientEntity) => {
    showToast(`آماده‌سازی پیامک و ارسال به «${client.name}» (${client.phone})`);
  };

  const handleAddClientSuccess = (newClientData: Omit<ClientEntity, 'id'>) => {
    const created = addClient(newClientData);
    showToast(`متقاضی «${created.name}» با موفقیت به سیستم اضافه شد.`);
  };

  const getStatusBadge = (status: ClientLeadStatus) => {
    switch (status) {
      case 'hot':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
            <Flame className="w-3 h-3 fill-rose-500" />
            <span>مشتری داغ</span>
          </span>
        );
      case 'warm':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Sun className="w-3 h-3 fill-amber-400" />
            <span>مشتری گرم</span>
          </span>
        );
      case 'deal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
            <Handshake className="w-3 h-3" />
            <span>در معامله</span>
          </span>
        );
      case 'cold':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <Snowflake className="w-3 h-3" />
            <span>سرد / راکد</span>
          </span>
        );
    }
  };

  return (
    <div className="px-3.5 py-3 pb-24 text-right animate-fade-in font-['Vazirmatn']">
      {/* 1. SEARCH BAR & FILTER BUTTON */}
      <div className="flex items-center gap-2 mb-3.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی متقاضی (نام، بودجه، منطقه...)"
            className="w-full pr-3.5 pl-9 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 shadow-2xs transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          onClick={() => setIsFilterSheetOpen(true)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-teal-700 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer shrink-0"
          title="فیلترهای پیشرفته"
          aria-label="فیلترها"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 2. HORIZONTAL FILTER TABS (EXACT CATEGORIES) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3.5 no-scrollbar scroll-smooth">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          همه ({toPersianDigits(totalCount)})
        </button>

        <button
          onClick={() => setActiveTab('hot')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            activeTab === 'hot'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Flame className="w-3 h-3 fill-current" />
          <span>مشتری داغ ({toPersianDigits(hotCount)})</span>
        </button>

        <button
          onClick={() => setActiveTab('warm')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            activeTab === 'warm'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Sun className="w-3 h-3 fill-current" />
          <span>گرم / پیگیر ({toPersianDigits(warmCount)})</span>
        </button>

        <button
          onClick={() => setActiveTab('deal')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            activeTab === 'deal'
              ? 'bg-[#0c7a6f] text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Handshake className="w-3 h-3" />
          <span>در معامله ({toPersianDigits(dealCount)})</span>
        </button>

        <button
          onClick={() => setActiveTab('cold')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
            activeTab === 'cold'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <Snowflake className="w-3 h-3" />
          <span>سرد / راکد ({toPersianDigits(coldCount)})</span>
        </button>
      </div>

      {/* 5. CLIENT CARDS LIST */}
      <div className="space-y-3.5">
        {filteredClients.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs">
            <User className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">متقاضی با این مشخصات یافت نشد</h4>
            <p className="text-xs text-slate-400 mt-1">می‌توانید فیلترها را بازنشانی کرده یا متقاضی جدید ثبت کنید.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
                setAdvancedFilter({});
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors cursor-pointer"
            >
              نمایش همه متقاضیان
            </button>
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100/90 hover:border-teal-200 hover:shadow-sm transition-all cursor-pointer text-right"
            >
              {/* Card Header Row: Avatar + Name + Category + Status Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                {/* Right in RTL: Avatar + Name + Category + Phone */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-full ${client.avatarColor} font-black text-sm flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs`}
                  >
                    {client.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-black text-slate-900 truncate">
                        {client.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold shrink-0">
                        {client.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {client.phone}
                    </div>
                  </div>
                </div>

                {/* Left in RTL: Status Badge */}
                <div className="shrink-0">
                  {getStatusBadge(client.statusCategory)}
                </div>
              </div>

              {/* Requirements & Budget Box */}
              <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-100 space-y-2 mb-2.5 text-xs">
                {/* Budget Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">سقف بودجه:</span>
                  <span className="font-black text-slate-900 text-xs sm:text-sm text-teal-900">
                    {client.budgetDisplay}
                  </span>
                </div>

                {/* Preferred Area & Location */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1.5 border-t border-slate-200/60">
                  <div className="flex items-center gap-1 truncate max-w-[65%]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{client.preferredLocations}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 font-bold text-slate-700">
                    <span>{client.areaDisplay}</span>
                    {client.preferredBedrooms ? (
                      <span className="text-slate-400 font-normal">
                        ({toPersianDigits(client.preferredBedrooms)} خواب)
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Notes excerpt if present */}
                {client.notes && (
                  <p className="text-[10px] text-slate-500 line-clamp-1 pt-1.5 border-t border-slate-200/50">
                    <span className="font-bold text-slate-700">یادداشت: </span>
                    {client.notes}
                  </p>
                )}
              </div>

              {/* AI Matches Highlight Box */}
              <div className="bg-teal-50/80 border border-teal-100/90 rounded-xl p-2.5 flex items-center justify-between text-xs mb-2.5">
                <div className="flex items-center gap-1.5 text-teal-900 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0c7a6f]" />
                  <span>{toPersianDigits(client.matchesCount)} ملک منطبق در فایلینگ شما</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 bg-teal-600 text-white rounded-md shadow-2xs">
                  {toPersianDigits(client.bestMatchScore)}٪ تطبیق
                </span>
              </div>

              {/* Follow-up reminder alert */}
              <div
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] mb-3 font-medium ${
                  client.nextFollowUp.isOverdue
                    ? 'bg-rose-50 text-rose-700 border border-rose-100'
                    : client.nextFollowUp.text.includes('امروز')
                    ? 'bg-teal-50/80 text-teal-800 border border-teal-100'
                    : 'bg-slate-50 text-slate-600 border border-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span className="truncate">پیگیری: {client.nextFollowUp.text}</span>
                </div>
                {client.nextFollowUp.isOverdue && (
                  <span className="text-[10px] font-black text-rose-600 shrink-0">تاخیر داشته</span>
                )}
              </div>

              {/* BOTTOM ACTION BUTTONS ROW (EXACT ORDER FROM SCREENSHOT: Message, Phone, Teal Button) */}
              <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                {/* 1. Rightmost in RTL: Message icon button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendMessage(client);
                  }}
                  className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
                  title="ارسال پیامک به متقاضی"
                  aria-label="ارسال پیام"
                >
                  <MessageSquare className="w-4 h-4 text-slate-600" />
                </button>

                {/* 2. Next in RTL: Phone icon button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCallClient(client);
                  }}
                  className="w-10 h-10 rounded-xl border border-emerald-200/90 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
                  title="تماس تلفنی با متقاضی"
                  aria-label="تماس"
                >
                  <Phone className="w-4 h-4" />
                </button>

                {/* 3. Left in RTL (fills rest): The Teal Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClient(client);
                  }}
                  className="flex-1 bg-[#0c7a6f] hover:bg-[#0a665d] active:scale-[0.98] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>مشاهده پرونده و تطبیق‌ها</span>
                  <ChevronLeft className="w-3.5 h-3.5 mr-auto" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODALS */}
      {selectedClient && (
        <ClientDossierModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      {isAddModalOpen && (
        <AddClientModal
          onClose={() => setIsAddModalOpen(false)}
          onClientAdded={handleAddClientSuccess}
        />
      )}

      {isVoiceModalOpen && (
        <VoiceAddClientModal
          onClose={() => setIsVoiceModalOpen(false)}
          onClientAdded={handleAddClientSuccess}
        />
      )}

      {isFilterSheetOpen && (
        <ClientFilterSheet
          onClose={() => setIsFilterSheetOpen(false)}
          currentFilter={advancedFilter}
          onApplyFilter={(f: ClientAdvancedFilter) => setAdvancedFilter(f)}
        />
      )}
    </div>
  );
};
