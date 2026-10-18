import React, { useState } from 'react';
import { Clock, Check, X } from 'lucide-react';
import { UrgentTask } from '../data/mockData';

interface SnoozeModalProps {
  task: UrgentTask;
  onClose: () => void;
  onConfirmSnooze: (taskId: string, durationText: string) => void;
}

export const SnoozeModal: React.FC<SnoozeModalProps> = ({
  task,
  onClose,
  onConfirmSnooze,
}) => {
  const [selectedOption, setSelectedOption] = useState('۱ ساعت بعد (ساعت ۱۲:۳۰)');

  const snoozeOptions = [
    { id: '1h', title: '۱ ساعت دیگر', time: 'ساعت ۱۲:۳۰ امروز' },
    { id: 'afternoon', title: 'بعدازظهر امروز', time: 'ساعت ۱۶:۰۰' },
    { id: 'tomorrow', title: 'فردا صبح', time: 'ساعت ۱۰:۰۰ فردا' },
    { id: 'custom', title: 'انتهای وقت اداری', time: 'ساعت ۱۸:۳۰' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-right animate-scale-up">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800">
            <Clock className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold">به تعویق انداختن پیگیری</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Task target */}
        <div className="my-3 p-3 bg-slate-50 rounded-2xl text-xs text-slate-600">
          <span className="font-bold text-slate-800">مخاطب:</span> {task.name}
          <div className="text-[11px] text-slate-400 mt-1">{task.summary}</div>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-5">
          {snoozeOptions.map((opt) => (
            <label
              key={opt.id}
              onClick={() => setSelectedOption(`${opt.title} (${opt.time})`)}
              className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedOption.startsWith(opt.title)
                  ? 'border-teal-600 bg-teal-50/50 text-teal-900 font-bold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex flex-col">
                <span>{opt.title}</span>
                <span className="text-[11px] text-slate-400 font-normal">{opt.time}</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedOption.startsWith(opt.title)
                    ? 'border-teal-600 bg-teal-600 text-white'
                    : 'border-slate-300'
                }`}
              >
                {selectedOption.startsWith(opt.title) && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={() => onConfirmSnooze(task.id, selectedOption)}
            className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            تأیید و ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};
