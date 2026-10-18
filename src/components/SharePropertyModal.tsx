import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare, Send, X, ExternalLink } from 'lucide-react';
import { PropertyMatch } from '../data/mockData';

interface SharePropertyModalProps {
  match: PropertyMatch;
  onClose: () => void;
  onSent?: (channel: string) => void;
}

export const SharePropertyModal: React.FC<SharePropertyModalProps> = ({
  match,
  onClose,
  onSent,
}) => {
  const [copied, setCopied] = useState(false);
  const [sentToast, setSentToast] = useState('');

  const shareText = `سلام خانم دکتر احمدی عزیز،\nفایل اختصاصی مناسب بودجه شما در سعادت‌آباد یافت شد:\n▫️ ${match.title}\n▫️ قیمت: ${match.priceText}\n▫️ ویژگی‌ها: ۳ خواب مستر، پارکینگ، آسانسور، تراس\n▫️ آدرس: ${match.address}\n\nجهت هماهنگی بازدید با من در تماس باشید.\nعلیرضا - مشاور املاکینو`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendVia = (channel: string) => {
    setSentToast(`فایل با موفقیت از طریق ${channel} ارسال شد.`);
    onSent?.(channel);
    setTimeout(() => {
      setSentToast('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800">
            <Share2 className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold">معرفی فایل به مشتری</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Client & Property info */}
        <div className="my-3 p-3 bg-teal-50/60 rounded-2xl border border-teal-100/60 flex items-center gap-3">
          <img
            src={match.image}
            alt={match.title}
            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-teal-200"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">{match.title}</h4>
            <div className="text-[11px] font-extrabold text-teal-800 mt-0.5">{match.priceText}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              ارسال به: <span className="font-bold text-slate-700">{match.clientName}</span>
            </div>
          </div>
        </div>

        {/* Channels */}
        <p className="text-xs text-slate-500 font-semibold mb-2">انتخاب بستر ارسال سریع:</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => handleSendVia('پیامک (SMS)')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/30 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <span>پیامک مستقیم</span>
          </button>

          <button
            onClick={() => handleSendVia('پیام‌رسان بله')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 text-emerald-600" />
            <span>پیام‌رسان بله</span>
          </button>

          <button
            onClick={() => handleSendVia('واتساپ')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-green-500 hover:bg-green-50/30 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 text-green-600" />
            <span>واتساپ</span>
          </button>

          <button
            onClick={() => handleSendVia('تلگرام')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/30 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 text-sky-500" />
            <span>تلگرام</span>
          </button>
        </div>

        {/* Copy text area */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed max-h-24 overflow-y-auto mb-3 whitespace-pre-line font-mono">
          {shareText}
        </div>

        {sentToast && (
          <div className="mb-3 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-bold">
            {sentToast}
          </div>
        )}

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'متن کپی شد' : 'کپی متن معرفی فایل'}</span>
        </button>
      </div>
    </div>
  );
};
