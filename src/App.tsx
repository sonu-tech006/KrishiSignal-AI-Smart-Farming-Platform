import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { AssistantView } from './components/assistant/AssistantView';
import { WeatherView } from './components/weather/WeatherView';
import { MandiView } from './components/mandi/MandiView';
import { CropIrrigationView } from './components/crops/CropIrrigationView';
import { ProductCatalogView } from './components/products/ProductCatalogView';
import { CropHealthView } from './components/health/CropHealthView';
import { FarmDiaryView } from './components/diary/FarmDiaryView';
import { FarmMapView } from './components/map/FarmMapView';
import { SchemesView } from './components/schemes/SchemesView';
import { CommunityView } from './components/community/CommunityView';
import { 
  LayoutDashboard, 
  Bot, 
  TrendingUp, 
  CloudSun, 
  ScanLine 
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentTab, setCurrentTab, isAuthenticated, language } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If viewing landing page or not authenticated, render Public Landing Page
  if (currentTab === 'landing' || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7]">
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col">
      {/* Top Header */}
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Main Body with Sidebar + Main Canvas */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar 
          mobileOpen={mobileMenuOpen} 
          onCloseMobile={() => setMobileMenuOpen(false)} 
        />

        {/* Dynamic Main Workspace View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 pb-20 lg:pb-8">
          {currentTab === 'dashboard' && <DashboardOverview />}
          {currentTab === 'assistant' && <AssistantView />}
          {currentTab === 'weather' && <WeatherView />}
          {currentTab === 'mandi' && <MandiView />}
          {currentTab === 'crops' && <CropIrrigationView />}
          {currentTab === 'products' && <ProductCatalogView />}
          {currentTab === 'health' && <CropHealthView />}
          {currentTab === 'diary' && <FarmDiaryView />}
          {currentTab === 'map' && <FarmMapView />}
          {currentTab === 'schemes' && <SchemesView />}
          {currentTab === 'community' && <CommunityView />}
        </main>
      </div>

      {/* Quick Mobile Bottom Bar for key agricultural tools */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 z-40 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            currentTab === 'dashboard' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{language === 'hi' ? 'डैशबोर्ड' : 'Home'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('assistant')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            currentTab === 'assistant' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>{language === 'hi' ? 'कृषि मित्र' : 'AI Help'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('health')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            currentTab === 'health' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <ScanLine className="w-4 h-4" />
          <span>{language === 'hi' ? 'रोग जांच' : 'Scan'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('weather')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            currentTab === 'weather' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          <span>{language === 'hi' ? 'मौसम' : 'Weather'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('mandi')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            currentTab === 'mandi' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{language === 'hi' ? 'मंडी भाव' : 'Mandi'}</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
