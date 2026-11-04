import React, { useState } from 'react';
import { 
  Sprout, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  CloudSun, 
  Droplets, 
  Bot, 
  CheckCircle2, 
  Phone, 
  Layers, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Database,
  LogIn
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmField3D } from '../3d/FarmField3D';
import { VERIFIED_MANDI_DATA, AGRICULTURAL_PRODUCTS_CATALOG } from '../../data/mockData';
import { LoginModal } from '../common/LoginModal';

export const LandingPage: React.FC = () => {
  const { language, setLanguage, loginAs, setCurrentTab } = useApp();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 selection:bg-emerald-500/20">
      {/* 1. HERO SECTION WITH 3D DIGITAL TWIN & REAL VALUE PROPOSITION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-emerald-950/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, Badges, CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>AI-Powered Smart Farming • Uttar Pradesh</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-950 leading-[1.15]">
                Scientific Agri Decisions, <br />
                <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy">
                  Live Mandi Rates & Weather
                </span> in One Platform.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                Empowering Indian farmers with ICAR-grounded irrigation rules, live AGMARKNET mandi prices, high-resolution Open-Meteo forecasts, and bilingual AI assistance in English and हिन्दी.
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xl shadow-emerald-700/25 flex items-center gap-2 transform active:scale-95 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Farmer Sign In (Free Demo)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    loginAs('farmer-1');
                    setCurrentTab('assistant');
                  }}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs flex items-center gap-2 transition-all"
                >
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>Try KrishiMitra Voice AI</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free Kisan Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ICAR & IMD Aligned Data</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Voice & Leaf Diagnostics</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Farm Field Digital Twin */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* 3D Visualizer */}
                <FarmField3D cropType="Wheat (गेहूँ)" soilMoisturePercent={45} />
                
                {/* Floating telemetry callouts */}
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                    <p className="text-[11px] text-slate-500 font-medium">Kanpur Wheat Mandi</p>
                    <p className="text-base font-extrabold text-emerald-700">₹2,380 / Qtl</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">↑ +2.4% Today</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                    <p className="text-[11px] text-slate-500 font-medium">48h Rain Forecast</p>
                    <p className="text-base font-extrabold text-slate-800">0.0 mm</p>
                    <span className="text-[10px] text-blue-600 font-semibold">Safe to Irrigate</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center col-span-2 sm:col-span-1">
                    <p className="text-[11px] text-slate-500 font-medium">Active Crop Stage</p>
                    <p className="text-sm font-extrabold text-amber-700 truncate">Tillering (42 DAS)</p>
                    <span className="text-[10px] text-slate-500">Top Dressing Due</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE MANDI TICKER & COMMODITY PRICES */}
      <section className="bg-emerald-950 text-white py-3 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 whitespace-nowrap text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span>LIVE MANDI PRICES (UP AGMARKNET):</span>
          </div>
          <div className="flex items-center gap-8 text-slate-200 font-medium">
            {VERIFIED_MANDI_DATA.map((m) => (
              <span key={m.id} className="flex items-center gap-2">
                <span className="font-semibold text-white">{m.commodity.split('(')[0]}:</span>
                <span className="text-emerald-300 font-bold">{m.modalPrice} {m.unit}</span>
                <span className="text-[10px] text-slate-400">({m.marketName.split(' ')[0]})</span>
              </span>
            ))}
          </div>
          <button
            onClick={() => {
              loginAs('farmer-1');
              setCurrentTab('mandi');
            }}
            className="text-emerald-400 hover:text-emerald-300 font-bold underline text-xs shrink-0"
          >
            View All Mandis →
          </button>
        </div>
      </section>

      {/* 3. CORE MODULE FEATURES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
            Complete Agricultural Decision Loop
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-3">
            From Sowing to Sale — Grounded Agro Intelligence
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Deterministic agronomical rules, verified meteorological feeds, and real UP local mandi market rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Explainable Irrigation */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Explainable Irrigation Decision Support
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Deterministic rules cross-referencing crop phenology (CRI, Tillering, Flowering), soil texture, and 72-hour forecast precipitation.
            </p>
            <div className="p-3 rounded-xl bg-blue-50/80 text-[11px] text-blue-900 border border-blue-200">
              <strong>Sample Rule:</strong> Hold irrigation if rain &gt; 15mm is forecast in 48h to prevent root asphyxiation and urea leaching.
            </div>
          </div>

          {/* Card 2: Real Mandi Intelligence */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              UP Mandi Intelligence & Net Realization
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Real AGMARKNET-backed modal prices across Kanpur, Lucknow, and Varanasi mandis with net revenue calculator deducting freight.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/80 text-[11px] text-emerald-900 border border-emerald-200">
              <strong>Net Formula:</strong> (Quintals × Modal Price) − (Transport + Mandi Fee) = Realized Profit.
            </div>
          </div>

          {/* Card 3: Certified Seeds & Products */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Verified Seeds & Agricultural Catalog
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Notified varieties from ICAR and National Seeds Corporation (HD-2967, DBW-187 Karan Vandana) with genuine agronomic traits.
            </p>
            <div className="p-3 rounded-xl bg-amber-50/80 text-[11px] text-amber-900 border border-amber-200">
              <strong>Verified Specs:</strong> Certified duration, rust resistance, and official state agency source links.
            </div>
          </div>

          {/* Card 4: Voice AI KrishiMitra */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              KrishiMitra Voice & Multilingual AI
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Speak using your microphone in English or Hindi. Hands-free audio answers with step-by-step ICAR recommendations.
            </p>
            <div className="p-3 rounded-xl bg-purple-50/80 text-[11px] text-purple-900 border border-purple-200">
              <strong>Voice Example:</strong> "What is the recommended dose of Nano Urea for wheat tillering stage?"
            </div>
          </div>

          {/* Card 5: Crop Health Scanner */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Crop Leaf Health AI Diagnostics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Computer vision foliar screening for Yellow Rust, Leaf Blight, and Aphids, pairing organic Neem sprays with certified fungicides.
            </p>
            <div className="p-3 rounded-xl bg-rose-50/80 text-[11px] text-rose-900 border border-rose-200">
              <strong>Integrated Pest Management:</strong> Clear pre-harvest waiting periods (PHI) & KVK helpline.
            </div>
          </div>

          {/* Card 6: Farm Diary & Subsidy Tracker */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Farm Diary & Government Schemes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Log day-to-day expenditures on seeds, fertilizers, and diesel. Direct eligibility links for PM-KISAN and PMFBY insurance.
            </p>
            <div className="p-3 rounded-xl bg-teal-50/80 text-[11px] text-teal-900 border border-teal-200">
              <strong>Direct Portals:</strong> Zero middlemen, links to official UP agriculture DBT services.
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL PRODUCTS PREVIEW */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Verified Products Catalog
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Certified Seeds & Bio-Inputs for Uttar Pradesh
              </h2>
            </div>
            <button
              onClick={() => {
                loginAs('farmer-1');
                setCurrentTab('products');
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View Full Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGRICULTURAL_PRODUCTS_CATALOG.slice(0, 3).map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full bg-slate-200 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold shadow-xs">
                      {prod.category}
                    </div>
                    {prod.isCertified && (
                      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-white/95 text-emerald-900 text-[10px] font-bold shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Certified
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-[11px] font-semibold text-slate-500">{prod.brand}</p>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{prod.productName}</h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {prod.descriptionEn}
                    </p>

                    <div className="mt-3 p-2 rounded-xl bg-slate-50 text-[11px] text-slate-700 border border-slate-100 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Maturity Duration:</span>
                        <span className="font-semibold">{prod.agronomicSpecifications.maturityDurationDays} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Package Size:</span>
                        <span className="font-semibold">{prod.packageSize}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
                  <div>
                    <span className="text-base font-extrabold text-emerald-800">₹{prod.discountedPrice || prod.mrp}</span>
                    {prod.discountedPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5">₹{prod.mrp}</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      loginAs('farmer-1');
                      setCurrentTab('products');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
                  >
                    Compare Specifications
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION FOR FARMER REGISTRATION */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold">
              Digital Farming Precision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Connect Your Farm to KrishiSignal Today
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
              Register free, input your plot acreage and soil test data, and receive daily customized crop advisories.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-8 py-3.5 rounded-xl bg-white text-emerald-950 font-extrabold text-sm shadow-xl hover:bg-emerald-50 transform active:scale-95 transition-all"
              >
                Sign In / Switch Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER WITH LEGAL, PRIVACY, AND SCIENTIFIC DISCLAIMER */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <span className="font-extrabold text-slate-800 text-sm">KrishiSignal</span>
              <span className="text-[11px] text-slate-400">v2.5 Production Build</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-slate-600">
              <button onClick={() => setCurrentTab('weather')} className="hover:text-emerald-700">Weather</button>
              <button onClick={() => setCurrentTab('mandi')} className="hover:text-emerald-700">Mandi Rates</button>
              <button onClick={() => setCurrentTab('products')} className="hover:text-emerald-700">Seeds Catalog</button>
              <button onClick={() => setCurrentTab('schemes')} className="hover:text-emerald-700">Govt Schemes</button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
            <strong>Agronomic Verification Disclaimer:</strong>{' '}
            All irrigation, fertilizer, and disease advisories generated by KrishiSignal are decision-support estimates derived from ICAR guidelines, IMD weather models, and Agmarknet data. Always adhere to recommended pesticide label waiting periods (PHI) and verify local conditions with your Block Agricultural Extension Officer or KVK.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-2 pt-2">
            <p>© {new Date().getFullYear()} KrishiSignal. Built with React 19, Tailwind CSS, Leaflet & Gemini AI.</p>
            <p>Designed for Farmers in Uttar Pradesh, India.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};
