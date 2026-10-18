import React from 'react';
import { LayoutGrid, Building2, Users2, MoreHorizontal, Plus } from 'lucide-react';

export type NavTab = 'home' | 'properties' | 'clients' | 'more';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onQuickAdd: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  onQuickAdd,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Right Tab 1: خانه (Home) */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'home'
              ? 'text-teal-700 font-extrabold'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] mt-1">خانه</span>
        </button>

        {/* Right Tab 2: ملک‌ها (Properties) */}
        <button
          onClick={() => onTabChange('properties')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'properties'
              ? 'text-teal-700 font-extrabold'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Building2 className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] mt-1">ملک‌ها</span>
        </button>

        {/* Center Floating Action Button: + */}
        <div className="flex-1 flex items-center justify-center relative -top-3">
          <button
            onClick={onQuickAdd}
            className="w-13 h-13 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shadow-lg shadow-teal-700/35 border-4 border-white active:scale-95 transition-transform cursor-pointer"
            title="افزودن جدید (ملک، مشتری، بازدید)"
            aria-label="افزودن جدید"
          >
            <Plus className="w-7 h-7 stroke-[2.5]" />
          </button>
        </div>

        {/* Left Tab 2: مشتریان (Customers) */}
        <button
          onClick={() => onTabChange('clients')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'clients'
              ? 'text-teal-700 font-extrabold'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Users2 className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] mt-1">مشتریان</span>
        </button>

        {/* Left Tab 1: بیشتر (More) */}
        <button
          onClick={() => onTabChange('more')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'more'
              ? 'text-teal-700 font-extrabold'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <MoreHorizontal className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] mt-1">بیشتر</span>
        </button>
      </div>
    </nav>
  );
};
