import React, { useState, useEffect } from 'react';
import { X, Mic, Sparkles, Check, RefreshCw, AudioWaveform as Waveform } from 'lucide-react';
import { ClientEntity } from '../types/client.types';

interface VoiceAddClientModalProps {
  onClose: () => void;
  onClientAdded: (client: Omit<ClientEntity, 'id'>) => void;
}

export const VoiceAddClientModal: React.FC<VoiceAddClientModalProps> = ({
  onClose,
  onClientAdded,
}) => {
  const [isRecording, setIsRecording] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [step, setStep] = useState<'listening' | 'processing' | 'extracted'>('listening');

  useEffect(() => {
    // Simulate speech-to-text recognition
    const t1 = setTimeout(() => {
      setTranscript('آقای دکتر کامرانی تماس گرفت، دنبال یه واحد ۳ خوابه توی سعادت‌آباد یا شهرک غربه...');
    }, 1200);

    const t2 = setTimeout(() => {
      setTranscript(
        'آقای دکتر کامرانی تماس گرفت، دنبال یه واحد ۳ خوابه توی سعادت‌آباد یا شهرک غربه، بودجه‌ش حدود ۲۸ تا ۳۰ میلیارده، طبقات ۴ به بالا با پارکینگ سندی اضافه می‌خواد. خیلی جدیه و آماده پرداخته.'
      );
      setStep('processing');
    }, 3000);

    const t3 = setTimeout(() => {
      setStep('extracted');
      setIsRecording(false);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleConfirm = () => {
    onClientAdded({
      name: 'دکتر کامرانی',
      initials: 'د‌ک',
      avatarColor: 'bg-teal-100 text-teal-800',
      category: 'خریدار مسکونی',
      phone: '۰۹۱۲۸۸۸۳۳۲۲',
      statusBadge: {
        text: 'مشتری داغ',
        iconType: 'flame',
        colorScheme: 'red',
      },
      statusCategory: 'hot',
      budgetDisplay: '۲۸ تا ۳۰ م.ت',
      preferredLocations: 'سعادت‌آباد، شهرک غرب',
      areaDisplay: '۱۵۰-۱۸۰ م',
      matchesCount: 4,
      bestMatchScore: 95,
      nextFollowUp: {
        text: 'امروز ۱۸:۰۰ - معرفی فایل‌های سعادت‌آباد',
        isOverdue: false,
        timeText: 'امروز ۱۸:۰۰',
      },
      preferredBedrooms: 3,
      notes: 'استخراج هوش مصنوعی از صدا: خریدار جدی ۳ خواب با پارکینگ اضافه، اولویت طبقات ۴ به بالا با نور مستقیم.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">ثبت نیاز متقاضی با صدا</h3>
              <p className="text-[11px] text-slate-400">هوش مصنوعی گفتار را به پرونده تبدیل می‌کند</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Voice Visualizer */}
        <div className="my-5 flex flex-col items-center justify-center py-6 bg-slate-50 rounded-2xl border border-slate-100">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 animate-pulse'
                : 'bg-teal-700 text-white'
            }`}
          >
            <Mic className="w-8 h-8" />
          </div>

          <p className="text-xs font-bold text-slate-700 mt-3">
            {step === 'listening' && 'در حال گوش دادن به مکالمه یا صدای شما...'}
            {step === 'processing' && 'هوش مصنوعی در حال تحلیل نیازمندی‌ها...'}
            {step === 'extracted' && 'نیازمندی‌های مشتری با موفقیت استخراج شد!'}
          </p>

          <p className="text-[11px] text-slate-400 mt-1 px-4 text-center">
            {isRecording
              ? 'بگویید: «آقای دکتر احمدی، خریدار ۳ خوابه در سعادت‌آباد با بودجه ۲۰ میلیارد»'
              : 'اطلاعات مشتری با موفقیت تشخیص داده شد.'}
          </p>
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-xs text-slate-700 mb-3 leading-relaxed">
            <span className="font-bold text-teal-800">متن پیاده‌شده: </span>
            {transcript}
          </div>
        )}

        {/* Extracted preview */}
        {step === 'extracted' && (
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs mb-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">نام متقاضی:</span>
              <span className="font-bold text-slate-900">دکتر کامرانی</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">بودجه تقریبی:</span>
              <span className="font-extrabold text-teal-800">۲۸ تا ۳۰ م.ت</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">محدوده درخواستی:</span>
              <span className="font-bold text-slate-800">سعادت‌آباد، شهرک غرب</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">نوع نیاز:</span>
              <span className="font-bold text-slate-800">۳ خواب، طبقات بالا، پارکینگ اضافه</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2">
          {step === 'extracted' ? (
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>تایید و ذخیره در پرونده مشتریان</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setStep('extracted');
                setIsRecording(false);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>اتمام ضبط و استخراج</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
