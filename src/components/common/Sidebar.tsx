import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  CloudSun, 
  TrendingUp, 
  Droplets, 
  Package, 
  ScanLine, 
  BookOpen, 
  Map, 
  Landmark, 
  Users,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { currentTab, setCurrentTab, language, weather } = useApp();

  const NAV_ITEMS = [
    {
      id: 'dashboard',
      labelEn: 'Dashboard',
      labelHi: 'डैशबोर्ड',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'assistant',
      labelEn: 'KrishiMitra AI',
      labelHi: 'कृषि मित्र AI',
      icon: Bot,
      badge: 'Voice'
    },
    {
      id: 'weather',
      labelEn: 'Weather & Alerts',
      labelHi: 'मौसम व चेतावनी',
      icon: CloudSun,
      badge: weather?.warnings && weather.warnings.length > 0 ? `${weather.warnings.length} Alert` : null
    },
    {
      id: 'mandi',
      labelEn: 'Mandi Prices',
      labelHi: 'मंडी भाव',
      icon: TrendingUp,
      badge: 'Live'
    },
    {
      id: 'crops',
      labelEn: 'Crop & Irrigation',
      labelHi: 'फसल व सिंचाई',
      icon: Droplets,
      badge: null
    },
    {
      id: 'products',
      labelEn: 'Seeds & Products',
      labelHi: 'प्रमाणित बीज व उत्पाद',
      icon: Package,
      badge: 'Verified'
    },
    {
      id: 'health',
      labelEn: 'Crop Health AI',
      labelHi: 'रोग पहचान स्कैनर',
      icon: ScanLine,
      badge: null
    },
    {
      id: 'diary',
      labelEn: 'Farm Diary & Profit',
      labelHi: 'खेत डायरी व आय-व्यय',
      icon: BookOpen,
      badge: null
    },
    {
      id: 'map',
      labelEn: 'Geospatial Map',
      labelHi: 'नक्शा व मंडियां',
      icon: Map,
      badge: null
    },
    {
      id: 'schemes',
      labelEn: 'Govt Schemes',
      labelHi: 'सरकारी योजनाएं',
      icon: Landmark,
      badge: null
    },
    {
      id: 'community',
      labelEn: 'Farmer Community',
      labelHi: 'किसान चौपाल',
      icon: Users,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[57px] left-0 h-screen lg:h-[calc(100vh-57px)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between z-50 lg:z-30 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Mobile Header with close button */}
          <div className="flex items-center justify-between lg:hidden mb-4 pb-2 border-b border-slate-100">
            <span className="font-extrabold text-emerald-950 text-base">KrishiSignal Menu</span>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            {language === 'hi' ? 'मुख्य सेवाएं' : 'Main Navigation'}
          </p>

          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] pr-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50/70 hover:text-emerald-950 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-emerald-200' : 'text-slate-400 group-hover:text-emerald-600'
                    }`} />
                    <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-emerald-800 text-emerald-100'
                        : item.badge.includes('Alert')
                        ? 'bg-red-100 text-red-700 font-extrabold animate-pulse'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Trust & Compliance Badge */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-slate-800 rounded-xl p-3 border border-emerald-200/60 dark:border-emerald-800/40 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'hi' ? 'प्रमाणित स्रोत' : 'Verified Data Sources'}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              ICAR • IMD • Agmarknet • Open-Meteo • UPSSCA
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
