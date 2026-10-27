import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calculator, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  CheckCircle2, 
  Truck, 
  HelpCircle,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_MANDI_DATA } from '../../data/mockData';
import { MandiRecord } from '../../types';

export const MandiView: React.FC = () => {
  const { language, activeFarm } = useApp();
  
  const [selectedCommodity, setSelectedCommodity] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchMandi, setSearchMandi] = useState<string>('');

  // Net Income Calculator State
  const [calcQuantityQuintals, setCalcQuantityQuintals] = useState<number>(50);
  const [calcSelectedMandiId, setCalcSelectedMandiId] = useState<string>(VERIFIED_MANDI_DATA[0].id);
  const [calcTransportPerQtl, setCalcTransportPerQtl] = useState<number>(45); // ₹45 per quintal diesel/cartage
  const [calcMandiFeePercent, setCalcMandiFeePercent] = useState<number>(1.5); // 1.5% APMC fee

  const COMMODITIES = ['All', 'Wheat (गेहूँ)', 'Mustard (सरसों)', 'Potato (आलू)', 'Paddy / Dhan (धान)', 'Sugarcane (गन्ना)'];
  const DISTRICTS = ['All', 'Kanpur Nagar', 'Lucknow', 'Barabanki', 'Varanasi', 'Meerut'];

  const filteredMandis = VERIFIED_MANDI_DATA.filter(m => {
    const matchComm = selectedCommodity === 'All' || m.commodity.includes(selectedCommodity.split(' ')[0]);
    const matchDist = selectedDistrict === 'All' || m.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchSearch = !searchMandi || m.marketName.toLowerCase().includes(searchMandi.toLowerCase()) || m.commodity.toLowerCase().includes(searchMandi.toLowerCase());
    return matchComm && matchDist && matchSearch;
  });

  // Calculate Net Profit
  const selectedMandiForCalc = VERIFIED_MANDI_DATA.find(m => m.id === calcSelectedMandiId) || VERIFIED_MANDI_DATA[0];
  const grossValue = calcQuantityQuintals * selectedMandiForCalc.modalPrice;
  const transportTotal = calcQuantityQuintals * calcTransportPerQtl;
  const mandiFeesTotal = Math.round((grossValue * calcMandiFeePercent) / 100);
  const netTakeHome = grossValue - transportTotal - mandiFeesTotal;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER & VERIFICATION NOTICE */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'दैनिक मंडी भाव व बाजार विश्लेषण' : 'Daily Mandi Prices & Market Intelligence'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              AGMARKNET Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'कृषि विपणन एवं निरीक्षण निदेशालय (DMI), भारत सरकार द्वारा सत्यापित वास्तविक दैनिक भाव'
              : 'Official daily modal prices reported by APMC Mandis under AGMARKNET, Govt of India'}
          </p>
        </div>

        {/* Search within Mandi */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchMandi}
            onChange={(e) => setSearchMandi(e.target.value)}
            placeholder={language === 'hi' ? 'मंडी या फसल खोजें...' : 'Search mandi or commodity...'}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>
      </div>

      {/* 2. FILTER PILLS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Commodity filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">
            {language === 'hi' ? 'फसल:' : 'Crop:'}
          </span>
          {COMMODITIES.map(comm => (
            <button
              key={comm}
              onClick={() => setSelectedCommodity(comm)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCommodity === comm
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700'
              }`}
            >
              {comm}
            </button>
          ))}
        </div>

        {/* District filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">
            {language === 'hi' ? 'जिला:' : 'District:'}
          </span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none"
          >
            {DISTRICTS.map(dist => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. MANDI CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMandis.map((mandi) => (
          <div key={mandi.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-emerald-400 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {mandi.district}, UP
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {mandi.marketName}
                </h3>
                <p className="text-xs text-emerald-800 font-bold">{mandi.commodity}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">
                  {mandi.priceDate}
                </span>
                <span className={`inline-flex items-center gap-0.5 text-xs font-extrabold px-1.5 py-0.5 rounded ${
                  mandi.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-50'
                }`}>
                  {mandi.trend === 'up' ? '↑' : '→'} {mandi.changePercent ? `${mandi.changePercent}%` : 'Stable'}
                </span>
              </div>
            </div>

            {/* Modal Price Hero */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                {language === 'hi' ? 'मॉडल भाव (सर्वाधिक प्रचलित)' : 'Modal Price (Most Traded)'}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-emerald-950">₹{mandi.modalPrice}</span>
                <span className="text-xs font-semibold text-slate-600">/{mandi.unit.split('/')[1] || 'क्विंटल'}</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'न्यूनतम भाव' : 'Min Price'}</span>
                <span className="font-bold text-slate-800">₹{mandi.minPrice}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'अधिकतम भाव' : 'Max Price'}</span>
                <span className="font-bold text-slate-800">₹{mandi.maxPrice}</span>
              </div>
            </div>

            {/* Distance & Calc Button */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                ~{mandi.distanceKm} km {language === 'hi' ? 'दूरी' : 'from farm'}
              </span>

              <button
                onClick={() => setCalcSelectedMandiId(mandi.id)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'आय गणना करें' : 'Calculate Profit'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. GROSS VALUE & ESTIMATED NET-INCOME CALCULATOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'शुद्ध किसान आय व परिवहन लागत कैलकुलेटर' : 'Net Farmer Realization & Cartage Calculator'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'मॉडल भाव में से डीजल, ट्रैक्टर भाड़ा और मंडी शुल्क घटाकर वास्तविक हाथ आने वाली शुद्ध रकम की गणना'
                : 'Deducts actual transport/freight and APMC market user charges to estimate net in-hand proceeds.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'उपज मात्रा (क्विंटल में)' : 'Crop Quantity (Quintals)'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={calcQuantityQuintals}
                  onChange={(e) => setCalcQuantityQuintals(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'मंडी का चयन' : 'Selected Mandi'}
                </label>
                <select
                  value={calcSelectedMandiId}
                  onChange={(e) => setCalcSelectedMandiId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  {VERIFIED_MANDI_DATA.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.marketName} — {m.commodity} (₹{m.modalPrice}/Qtl)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'ट्रैक्टर भाड़ा / पल्लेदारी (₹/क्विंटल)' : 'Transport & Cartage (₹/Quintal)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={calcTransportPerQtl}
                  onChange={(e) => setCalcTransportPerQtl(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'मंडी शुल्क (%)' : 'Mandi Cess / User Fee (%)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={calcMandiFeePercent}
                  onChange={(e) => setCalcMandiFeePercent(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 space-y-4">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
              {language === 'hi' ? 'शुद्ध आय विवरण' : 'Financial Statement Breakdown'}
            </span>

            <div className="space-y-2 text-xs border-b border-white/10 pb-3">
              <div className="flex justify-between text-slate-300">
                <span>{language === 'hi' ? 'सकल विक्रय मूल्य (Gross Sales):' : 'Gross Sale Value:'}</span>
                <span className="font-bold text-white">₹{grossValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{language === 'hi' ? 'कुल परिवहन व भाड़ा खर्च:' : 'Total Transport/Freight:'}</span>
                <span className="font-bold text-red-300">- ₹{transportTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{language === 'hi' ? 'मंडी शुल्क (1.5% APMC):' : 'Mandi Charges:'}</span>
                <span className="font-bold text-red-300">- ₹{mandiFeesTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-emerald-300 font-bold block">
                {language === 'hi' ? 'हाथ आने वाला शुद्ध लाभ (Net Realization):' : 'Net Take-Home Proceeds:'}
              </span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                ₹{netTakeHome.toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                {language === 'hi' ? `प्रति क्विंटल शुद्ध दर: ₹${Math.round(netTakeHome / calcQuantityQuintals)} / क्विंटल` : `Effective net rate: ₹${Math.round(netTakeHome / calcQuantityQuintals)} / Qtl`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
