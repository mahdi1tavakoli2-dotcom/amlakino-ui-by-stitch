import React from 'react';
import { Search, Bell, MoreVertical } from 'lucide-react';

interface TopHeaderProps {
  currentRoute?: 'home' | 'properties' | 'clients' | 'more';
  unreadCount?: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentRoute = 'home',
  unreadCount = 3,
  onOpenNotifications,
  onOpenSearch,
  onOpenMenu,
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-xs sticky top-0 z-30 border-b border-slate-100">
      {currentRoute === 'properties' ? (
        <>
          {/* Properties Route Header: Exactly like the screenshot */}
          {/* Right in RTL: ملک‌ها / ۱۲۴ فایل فعال */}
          <div className="flex flex-col text-right">
            <h1 className="text-lg font-black text-slate-900 tracking-tight">ملک‌ها</h1>
            <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
              ۱۲۴ فایل فعال
            </span>
          </div>

          {/* Left in RTL: Menu + Search icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenMenu}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="منوی بیشتر"
              title="منو"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="جستجو"
              title="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : currentRoute === 'clients' ? (
        <>
          {/* Clients Route Header: Exactly like the screenshot */}
          {/* Right in RTL: متقاضیان / ۱۸ پرونده فعال */}
          <div className="flex flex-col text-right">
            <h1 className="text-lg font-black text-slate-900 tracking-tight">متقاضیان</h1>
            <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
              ۱۸ پرونده فعال
            </span>
          </div>

          {/* Left in RTL: Menu + Search icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenMenu}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="منوی بیشتر"
              title="منو"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="جستجو"
              title="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Default Home / General Header */}
          {/* Right in RTL: Avatar / Brand info */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white inline-block"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {currentRoute === 'more'
                    ? 'پروفایل و تنظیمات'
                    : 'سلام، علیرضا'}
                </h1>
                <span className="text-[10px] text-slate-400 font-medium">املاکینو</span>
              </div>
              <span className="text-xs text-slate-500 font-normal">
                {currentRoute === 'more'
                  ? 'مشاور ارشد'
                  : 'امروز چه کاری داریم؟'}
              </span>
            </div>
          </div>

          {/* Left in RTL: Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="جستجو"
              title="جستجو"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenNotifications}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
              aria-label="اعلان‌ها"
              title="اعلان‌ها"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-white">
                  ۳
                </span>
              )}
            </button>

            <button
              onClick={onOpenMenu}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="منوی بیشتر"
              title="منو"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </header>
  );
};
