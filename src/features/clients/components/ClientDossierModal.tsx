import React from 'react';
import { X, User, Phone, MapPin, DollarSign, Sparkles, Send, CheckCircle2, Calendar } from 'lucide-react';
import { ClientEntity } from '../types/client.types';
import { useProperties } from '../../properties/hooks/useProperties';
import { useModals } from '@/src/app/context/ModalContext';
import { toPersianDigits } from '@/src/core/utils/persianNumbers';
import { PropertyMatch } from '@/src/data/mockData';

interface ClientDossierModalProps {
  client: ClientEntity;
  onClose: () => void;
}

export const ClientDossierModal: React.FC<ClientDossierModalProps> = ({ client, onClose }) => {
  const { openCall, openShare } = useModals();
  const { properties } = useProperties();

  const handleCall = () => {
    openCall({
      contactName: client.name,
      phoneNumber: client.phone,
      subtitle: `${client.category} • بودجه ${client.budgetDisplay}`,
    });
  };

  const handleShareProperty = (prop: any) => {
    const adapter: PropertyMatch = {
      id: prop.id,
      matchScore: prop.matchScore || 90,
      location: prop.location,
      title: prop.title,
      priceText: prop.priceText,
      areaTag: prop.areaTag,
      image: prop.image,
      clientName: client.name,
      clientBudget: client.budgetDisplay,
      tag: 'منطقه و بودجه منطبق',
      features: prop.amenitiesChips || ['پارکینگ', 'آسانسور'],
      bedrooms: prop.features?.bedrooms || 2,
      floor: prop.features?.floor || 2,
      parkingCount: 1,
      storage: true,
      elevator: true,
      address: prop.address || prop.location,
    };
    openShare(adapter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-full ${client.avatarColor} font-black text-sm flex items-center justify-center shrink-0`}>
              {client.initials}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">{client.name}</h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {client.category} • {client.phone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Requirements Box */}
        <div className="my-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-700">
            <span className="text-slate-500 font-medium">بودجه اعلامی:</span>
            <span className="font-extrabold text-teal-800 text-sm">{client.budgetDisplay}</span>
          </div>

          <div className="flex justify-between items-center text-slate-700">
            <span className="text-slate-500 font-medium">محدوده درخواستی:</span>
            <span className="font-bold">{client.preferredLocations}</span>
          </div>

          <div className="flex justify-between items-center text-slate-700">
            <span className="text-slate-500 font-medium">متراژ مدنظر:</span>
            <span className="font-bold">{client.areaDisplay}</span>
          </div>

          {client.notes && (
            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800">یادداشت مشاور: </span>
              {client.notes}
            </div>
          )}
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handleCall}
            className="flex-1 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>تماس با متقاضی</span>
          </button>
        </div>

        {/* Matched Properties Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>فایل‌های پیشنهادی هوش مصنوعی ({toPersianDigits(properties.length)}):</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              تطبیق تا {toPersianDigits(client.bestMatchScore)}٪
            </span>
          </div>

          {properties.slice(0, 3).map((prop) => (
            <div
              key={prop.id}
              className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2"
            >
              <div className="flex items-start gap-2.5">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{prop.title}</h5>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 shrink-0">
                      {toPersianDigits(prop.matchScore || 90)}٪
                    </span>
                  </div>
                  <div className="text-xs font-black text-teal-800 mt-0.5">{prop.priceText}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{prop.location}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-[10px] text-emerald-600 font-bold">
                  آماده هماهنگی بازدید
                </span>
                <button
                  onClick={() => handleShareProperty(prop)}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>معرفی ملک</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
