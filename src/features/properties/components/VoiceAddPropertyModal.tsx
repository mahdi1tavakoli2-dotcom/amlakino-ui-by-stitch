import React, { useState, useEffect } from 'react';
import { X, Mic, Sparkles, Check, Play, RefreshCw, Volume2 } from 'lucide-react';
import { propertyRepository } from '../api/property.repository';

interface VoiceAddPropertyModalProps {
  onClose: () => void;
  onAdded: (title: string) => void;
}

export const VoiceAddPropertyModal: React.FC<VoiceAddPropertyModalProps> = ({
  onClose,
  onAdded,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    title: string;
    location: string;
    area: number;
    bedrooms: number;
    price: string;
  } | null>(null);

  const sampleSpeech =
    'سلام، یک واحد ۱۴۵ متری در سعادت‌آباد خیابان صراف‌های شمالی، ۳ خوابه طبقه ۴ با پارکینگ سندی، انباری و آسانسور دارم، قیمت ۲۴ میلیارد تومان اعلامی مالک.';

  const startVoiceSimulation = () => {
    setIsRecording(true);
    setTranscript('');
    setExtractedData(null);

    // Simulate speech-to-text typing
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 6;
      if (currentIndex >= sampleSpeech.length) {
        setTranscript(sampleSpeech);
        clearInterval(interval);
        setIsRecording(false);
        setIsAnalyzing(true);

        // Simulate AI information extraction
        setTimeout(() => {
          setIsAnalyzing(false);
          setExtractedData({
            title: 'آپارتمان ۱۴۵ متری، ۳ خواب - صراف‌های شمالی',
            location: 'سعادت‌آباد، صراف‌های شمالی',
            area: 145,
            bedrooms: 3,
            price: '۲۴ میلیارد تومان',
          });
        }, 1200);
      } else {
        setTranscript(sampleSpeech.slice(0, currentIndex));
      }
    }, 120);
  };

  const handleConfirmAdd = async () => {
    if (!extractedData) return;
    await propertyRepository.create({
      title: extractedData.title,
      location: extractedData.location,
      priceText: extractedData.price,
      areaSqm: extractedData.area,
      bedrooms: extractedData.bedrooms,
      listingType: 'sale',
    });
    onAdded(extractedData.title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                ثبت ملک با ویس و هوش مصنوعی
              </h3>
              <p className="text-[11px] text-teal-700 font-medium">استخراج خودکار اطلاعات از صدا</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Voice recording visualizer */}
        <div className="my-4 text-center">
          <div className="relative inline-flex items-center justify-center">
            {isRecording && (
              <span className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-teal-400 opacity-60" />
            )}
            <button
              onClick={startVoiceSimulation}
              disabled={isRecording}
              className={`w-18 h-18 rounded-full flex items-center justify-center transition-all shadow-lg cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/30 active:scale-95'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
          </div>

          <p className="text-xs font-bold text-slate-700 mt-3">
            {isRecording
              ? 'در حال گوش دادن به صحبت مالک...'
              : isAnalyzing
              ? 'دستیار در حال استخراج متراژ و قیمت...'
              : 'برای شروع صحبت یا ویس نمونه دکمه بالا را بزنید'}
          </p>
        </div>

        {/* Live speech transcription text box */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs min-h-[60px] max-h-24 overflow-y-auto leading-relaxed text-slate-700 mb-3">
          {transcript || (
            <span className="text-slate-400 text-[11px]">
              متن صوت شما به صورت همزمان اینجا نمایش داده می‌شود...
            </span>
          )}
        </div>

        {/* Extracted fields */}
        {extractedData && (
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl mb-4 text-xs space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>اطلاعات استخراج شده توسط AI:</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-500">عنوان:</span>
              <span className="font-bold">{extractedData.title}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-500">منطقه:</span>
              <span className="font-bold">{extractedData.location}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-500">متراژ و خواب:</span>
              <span className="font-bold">{extractedData.area} متر • {extractedData.bedrooms} خواب</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="text-slate-500">قیمت اعلامی:</span>
              <span className="font-extrabold text-teal-800">{extractedData.price}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={startVoiceSimulation}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>ویس مجدد</span>
          </button>

          <button
            onClick={handleConfirmAdd}
            disabled={!extractedData}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              extractedData
                ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>ثبت نهایی فایل</span>
          </button>
        </div>
      </div>
    </div>
  );
};
