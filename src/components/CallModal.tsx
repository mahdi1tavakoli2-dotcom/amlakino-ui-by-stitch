import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, MessageSquare, Check } from 'lucide-react';
import { toPersianDigits } from '../utils/persianNumbers';

interface CallModalProps {
  contactName: string;
  phoneNumber: string;
  subtitle?: string;
  onClose: () => void;
  onCallSuccess?: (note: string) => void;
}

export const CallModal: React.FC<CallModalProps> = ({
  contactName,
  phoneNumber,
  subtitle,
  onClose,
  onCallSuccess,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [callNote, setCallNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    // Transition from 'calling' to 'connected' after 1.5 seconds
    const timer = setTimeout(() => {
      setCallStatus('connected');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (callStatus !== 'connected') return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return toPersianDigits(str);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    if (onCallSuccess && callNote) {
      onCallSuccess(callNote);
    }
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-teal-500/50 mx-auto flex items-center justify-center shadow-inner relative mb-4">
          <Phone className={`w-8 h-8 text-teal-400 ${callStatus === 'calling' ? 'animate-bounce' : ''}`} />
          {callStatus === 'connected' && (
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
          )}
        </div>

        {/* Contact Info */}
        <h3 className="text-xl font-black tracking-tight">{contactName}</h3>
        <p className="text-xs text-slate-400 mt-1 font-mono">{phoneNumber}</p>
        {subtitle && (
          <p className="text-xs text-teal-300/90 mt-2 bg-slate-800/80 px-3 py-1 rounded-full inline-block">
            {subtitle}
          </p>
        )}

        {/* Status / Timer */}
        <div className="mt-4 text-sm font-bold">
          {callStatus === 'calling' && (
            <span className="text-slate-400 animate-pulse">در حال برقراری تماس...</span>
          )}
          {callStatus === 'connected' && (
            <span className="text-emerald-400">{formatTimer(seconds)}</span>
          )}
          {callStatus === 'ended' && (
            <span className="text-rose-400">تماس پایان یافت</span>
          )}
        </div>

        {/* Note input toggle */}
        {showNoteInput ? (
          <div className="mt-4 text-right">
            <label className="text-[11px] text-slate-400 block mb-1">یادداشت نتیجه تماس:</label>
            <input
              type="text"
              value={callNote}
              onChange={(e) => setCallNote(e.target.value)}
              placeholder="مثلاً: هماهنگ شد، فردا ساعت ۴..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        ) : (
          <button
            onClick={() => setShowNoteInput(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ثبت یادداشت تماس</span>
          </button>
        )}

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="بی‌صدا"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 transition-transform cursor-pointer"
            title="قطع تماس"
          >
            <PhoneOff className="w-7 h-7" />
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isSpeaker ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="بلندگو"
          >
            {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
