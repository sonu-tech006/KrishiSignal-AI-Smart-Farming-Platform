import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  CloudSun, 
  Search, 
  Languages, 
  User, 
  Bell, 
  ChevronDown, 
  WifiOff, 
  Plus, 
  Sparkles,
  LogOut,
  Check,
  X,
  LogIn
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_FARMERS } from '../../data/mockData';
import { LoginModal } from './LoginModal';

export const Header: React.FC<{ onOpenMobileMenu?: () => void }> = ({ onOpenMobileMenu }) => {
  const { 
    user, 
    isAuthenticated, 
    language, 
    setLanguage, 
    activeFarm, 
    setActiveFarm, 
    farms, 
    weather, 
    isOffline, 
    logout, 
    loginAs,
    setCurrentTab,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [showFarmMenu, setShowFarmMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentTab('assistant');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-950/10 px-4 sm:px-6 py-2.5 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={onOpenMobileMenu}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            <div 
              onClick={() => setCurrentTab(isAuthenticated ? 'dashboard' : 'landing')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-emerald-950">
                    Krishi<span className="text-emerald-600">Signal</span>
                  </span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Smart Agri
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block -mt-0.5 font-medium">
                  Agricultural Decision Support System
                </p>
              </div>
            </div>
          </div>

          {/* Center: Global Search Bar */}
          {isAuthenticated && (
            <form 
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center flex-1 max-w-md mx-2 relative"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask KrishiSignal: rain forecast, wheat seeds, mandi rate..."
                className="w-full pl-9 pr-20 py-2 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
              >
                <Sparkles className="w-3 h-3 text-emerald-200" />
                Ask
              </button>
            </form>
          )}

          {/* Right Actions: Farm Switcher, Weather Chip, Language, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Offline Indicator */}
            {isOffline && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-300 animate-pulse">
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Offline Mode</span>
              </div>
            )}

            {/* Farm Switcher Dropdown */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowFarmMenu(!showFarmMenu);
                    setShowUserMenu(false);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200 text-xs font-medium transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="max-w-[110px] sm:max-w-[140px] truncate font-semibold">
                    {activeFarm.farmName.split('(')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-emerald-600 shrink-0" />
                </button>

                {showFarmMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowFarmMenu(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 mb-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Select Active Farm
                        </span>
                        <button
                          onClick={() => setShowFarmMenu(false)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        {farms.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => {
                              setActiveFarm(f);
                              setShowFarmMenu(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                              f.id === activeFarm.id
                                ? 'bg-emerald-50 text-emerald-900 font-semibold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <p className="truncate font-semibold">{f.farmName}</p>
                              <p className="text-[10px] text-slate-400">{f.district} • {f.landAreaAcres} Acres</p>
                            </div>
                            {f.id === activeFarm.id && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 mt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setShowFarmMenu(false);
                            setCurrentTab('dashboard');
                          }}
                          className="w-full py-1.5 px-3 rounded-lg text-xs text-emerald-700 hover:bg-emerald-50 font-semibold flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          + Add New Farm
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Quick Weather Chip */}
            {isAuthenticated && weather && (
              <div 
                onClick={() => setCurrentTab('weather')}
                className="cursor-pointer hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                title="Click to view full weather radar & advisory"
              >
                <CloudSun className="w-4 h-4 text-amber-500" />
                <span>{weather.current.temp}°C</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {weather.current.precipitationProbability}% Rain
                </span>
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-bold text-slate-800 transition-all"
              title="Toggle Hindi / English"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'English' : 'हिन्दी'}</span>
            </button>

            {/* Notification Bell */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowFarmMenu(false);
                    setShowUserMenu(false);
                  }}
                  className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  {weather?.warnings && weather.warnings.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </button>

                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
                        <span>Agro-Weather Alerts</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">IMD & Local</span>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                        {weather?.warnings && weather.warnings.length > 0 ? (
                          weather.warnings.map((w) => (
                            <div key={w.id} className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                              <p className="font-bold text-amber-900">{w.titleEn}</p>
                              <p className="text-[11px] text-amber-800 mt-0.5">{w.descriptionEn}</p>
                              <span className="text-[9px] text-amber-600 mt-1 inline-block font-medium">
                                Source: {w.source} • {w.validUntil}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-500 py-3 text-center">
                            No active meteorological alerts. Weather is calm.
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Farmer User Profile / Demo Switcher */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowFarmMenu(false);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-emerald-500/30 transition-all"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=128&q=80'}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-500"
                  />
                </button>

                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-slate-100 flex items-start justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-800">{user.displayName}</p>
                          <p className="text-[11px] text-slate-500">{user.email}</p>
                          <span className="mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {user.district}, UP (Authenticated)
                          </span>
                        </div>
                        <button
                          onClick={() => setShowUserMenu(false)}
                          className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="py-1">
                        <p className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                          Switch Farmer Profile
                        </p>
                        {DEMO_FARMERS.map((df) => (
                          <button
                            key={df.id}
                            onClick={() => {
                              loginAs(df.id);
                              setShowUserMenu(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                              df.id === user.id ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{df.displayName}</span>
                            {df.id === user.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                          </button>
                        ))}
                      </div>

                      <div className="pt-1 mt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl font-medium flex items-center gap-1.5"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Farmer Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};
