import React, { useState } from 'react';
import { TopHeader } from '../../components/TopHeader';
import { BottomNavBar } from '../../components/BottomNavBar';
import { useRouter } from '../router/RouterContext';
import { useModals } from '../context/ModalContext';
import { Smartphone, Monitor } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  unreadCount?: number;
}

export const AppShell: React.FC<AppShellProps> = ({ children, unreadCount = 3 }) => {
  const { currentRoute, navigate } = useRouter();
  const { openQuickAdd, openNotifications, openSearch } = useModals();
  const [framedView, setFramedView] = useState(true);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-200/80 flex flex-col items-center justify-start py-0 sm:py-6 text-slate-800 antialiased selection:bg-teal-600 selection:text-white"
    >
      {/* Top Floating View Controls */}
      <div className="w-full max-w-md px-4 py-2 hidden sm:flex items-center justify-between text-xs text-slate-600">
        <span className="font-bold flex items-center gap-1.5 text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          داشبورد مشاور املاکینو
        </span>
        <button
          onClick={() => setFramedView(!framedView)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200/80 hover:bg-white text-[11px] font-semibold text-slate-700 shadow-xs transition-all cursor-pointer"
          title="تغییر حالت نمایش فریم موبایل"
        >
          {framedView ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-teal-600" />
              <span>تمام‌صفحه</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-teal-600" />
              <span>فریم موبایل</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container / Mobile Frame */}
      <div
        className={`w-full bg-[#f8fafc] min-h-screen relative overflow-hidden transition-all duration-300 ${
          framedView
            ? 'max-w-[430px] sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800/90 sm:min-h-[890px] sm:my-auto'
            : 'max-w-md shadow-lg'
        }`}
      >
        {/* Mobile Camera Notch */}
        {framedView && (
          <div className="hidden sm:flex justify-center pt-2 pb-1 bg-white relative z-40">
            <div className="w-24 h-4 bg-slate-900 rounded-full" />
          </div>
        )}

        {/* Top Header */}
        {currentRoute !== 'property-details' && (
          <TopHeader
            currentRoute={currentRoute}
            unreadCount={unreadCount}
            onOpenNotifications={openNotifications}
            onOpenSearch={openSearch}
            onOpenMenu={() => navigate('more')}
          />
        )}

        {/* Content Area */}
        <div className="min-h-[calc(100vh-120px)] sm:min-h-[750px]">
          {children}
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={currentRoute === 'property-details' ? 'properties' : currentRoute}
          onTabChange={(tab) => navigate(tab)}
          onQuickAdd={openQuickAdd}
        />
      </div>
    </div>
  );
};
