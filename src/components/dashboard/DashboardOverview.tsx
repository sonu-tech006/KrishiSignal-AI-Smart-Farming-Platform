import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  CloudSun, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  Bot, 
  ScanLine, 
  Plus, 
  MapPin, 
  Calendar,
  Layers,
  Thermometer,
  Wind,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmField3D } from '../3d/FarmField3D';
import { CropInspector3D } from '../3d/CropInspector3D';
import { calculateIrrigationRecommendation, calculateFertilizerPlan } from '../../services/agronomyEngine';
import { VERIFIED_MANDI_DATA } from '../../data/mockData';

export const DashboardOverview: React.FC = () => {
  const { 
    user, 
    activeFarm, 
    activeCrop, 
    weather, 
    language, 
    setCurrentTab, 
    farms,
    addFarm 
  } = useApp();

  const [showAddFarmModal, setShowAddFarmModal] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');
  const [newFarmDistrict, setNewFarmDistrict] = useState('Kanpur Nagar');
  const [newFarmArea, setNewFarmArea] = useState(3.0);
  const [newFarmSoil, setNewFarmSoil] = useState<any>('Alluvial (जलोढ़)');
  const [newFarmIrrigation, setNewFarmIrrigation] = useState<any>('Tube-well (नलकूप)');

  // Calculate real-time irrigation decision
  const irrigationRec = calculateIrrigationRecommendation(
    activeFarm,
    activeCrop,
    weather?.daily?.[0]?.precipitationSum ?? 0,
    weather?.current?.tempMax ?? 26
  );

  // Calculate fertilizer plan
  const fertPlan = calculateFertilizerPlan(activeCrop.cropName, activeFarm.landAreaAcres, activeFarm.soilTest);

  // Local mandi match
  const localMandi = VERIFIED_MANDI_DATA.find(m => m.district.toLowerCase() === activeFarm.district.toLowerCase()) || VERIFIED_MANDI_DATA[0];

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmName.trim()) return;
    addFarm({
      farmName: newFarmName,
      locationLabel: `${newFarmDistrict}, Uttar Pradesh`,
      state: 'Uttar Pradesh',
      district: newFarmDistrict,
      village: 'Gram Panchayat Central',
      coordinates: { lat: 26.50, lng: 80.30 },
      landAreaAcres: Number(newFarmArea),
      soilType: newFarmSoil,
      irrigationMethod: newFarmIrrigation,
      waterAvailability: 'Abundant (प्रचुर)',
      soilTest: {
        testDate: new Date().toISOString().split('T')[0],
        nitrogen_kg_ha: 180,
        phosphorus_kg_ha: 22,
        potassium_kg_ha: 240,
        ph: 7.2,
        organicCarbon_percent: 0.5
      }
    });
    setShowAddFarmModal(false);
    setNewFarmName('');
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP WELCOME & FARM STATUS BANNER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'hi' ? `राम राम, ${user.displayName.split(' ')[0]} जी` : `Welcome, ${user.displayName.split(' ')[0]}`}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              {language === 'hi' ? 'सत्यापित किसान' : 'Verified Farmer'}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{activeFarm.farmName}</span> • <span>{activeFarm.village}, {activeFarm.district} ({activeFarm.landAreaAcres} एकड़)</span>
          </p>
        </div>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentTab('assistant')}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all"
          >
            <Bot className="w-4 h-4 text-emerald-200" />
            <span>{language === 'hi' ? 'कृषि मित्र से पूछें' : 'Ask KrishiMitra'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('health')}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <ScanLine className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'रोग पहचान स्कैनर' : 'Scan Crop Leaf'}</span>
          </button>

          <button
            onClick={() => setShowAddFarmModal(true)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">{language === 'hi' ? 'नया खेत' : 'Add Farm'}</span>
          </button>
        </div>
      </div>

      {/* 2. ACTIVE WEATHER WARNING BANNER (IF ANY) */}
      {weather?.warnings && weather.warnings.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-sm animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold">
                {language === 'hi' ? weather.warnings[0].titleHi : weather.warnings[0].titleEn}
              </h4>
              <span className="text-[10px] bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-bold">
                {weather.warnings[0].source}
              </span>
            </div>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              {language === 'hi' ? weather.warnings[0].descriptionHi : weather.warnings[0].descriptionEn}
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('weather')}
            className="text-xs font-bold text-amber-900 underline shrink-0 hover:text-amber-700"
          >
            {language === 'hi' ? 'विस्तार देखें' : 'Details'}
          </button>
        </div>
      )}

      {/* 3. 3D DIGITAL TWIN + TELEMETRY ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3D Smart Farm Canvas */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'खेत का 3D डिजिटल मॉडल (Digital Twin)' : 'Field 3D Digital Twin & Live State'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {activeFarm.farmName} • {activeFarm.soilType}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {weather.isLive ? 'Live Sensor Sync' : 'Simulated Model'}
            </span>
          </div>

          {/* Three.js 3D Scene */}
          <FarmField3D
            isRaining={weather.current.isRain}
            cropType={activeCrop.cropName}
            soilMoisturePercent={weather.current.soilMoisturePercent || 42}
            compact={false}
          />

          {/* Quick Telemetry Row Under 3D Canvas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{language === 'hi' ? 'तापमान' : 'Temperature'}</span>
              <p className="text-base font-extrabold text-slate-800 mt-0.5">{weather.current.temp}°C</p>
              <span className="text-[10px] text-slate-500">Max {weather.current.tempMax}° / Min {weather.current.tempMin}°</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{language === 'hi' ? 'हवा की गति' : 'Wind Speed'}</span>
              <p className="text-base font-extrabold text-slate-800 mt-0.5">{weather.current.windSpeed} km/h</p>
              <span className="text-[10px] text-emerald-600 font-semibold">{weather.sprayFeasibility.status === 'FAVORABLE' ? 'Safe to Spray' : 'Drift Risk'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{language === 'hi' ? 'नमी (आर्द्रता)' : 'Air Humidity'}</span>
              <p className="text-base font-extrabold text-slate-800 mt-0.5">{weather.current.humidity}%</p>
              <span className="text-[10px] text-slate-500">{language === 'hi' ? 'सामान्य सीमा' : 'Normal range'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{language === 'hi' ? 'मिट्टी का pH' : 'Soil pH'}</span>
              <p className="text-base font-extrabold text-emerald-700 mt-0.5">{activeFarm.soilTest?.ph || 7.2}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">{language === 'hi' ? 'गेहूँ हेतु आदर्श' : 'Ideal for Wheat'}</span>
            </div>
          </div>
        </div>

        {/* Right: Real-time Decision & Action Cards */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Card A: Explainable Irrigation Decision */}
          <div className={`p-5 rounded-3xl border shadow-sm ${
            irrigationRec.action === 'IRRIGATE_NOW'
              ? 'bg-blue-50/90 border-blue-300'
              : irrigationRec.action === 'DELAY_IRRIGATION'
              ? 'bg-emerald-50/90 border-emerald-300'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Droplets className={`w-4 h-4 ${irrigationRec.action === 'IRRIGATE_NOW' ? 'text-blue-600' : 'text-emerald-600'}`} />
                <span className="text-xs font-bold text-slate-800">{language === 'hi' ? 'सिंचाई निर्णय' : 'Irrigation Advisory'}</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                irrigationRec.urgency === 'high' ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-800'
              }`}>
                {irrigationRec.urgency.toUpperCase()}
              </span>
            </div>

            <h4 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? irrigationRec.statusLabelHi : irrigationRec.statusLabelEn}
            </h4>
            
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {language === 'hi' ? irrigationRec.explanationHi : irrigationRec.explanationEn}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>{language === 'hi' ? 'पिछला पानी:' : 'Last Watered:'} {irrigationRec.supportingData.daysSinceLastIrrigation} {language === 'hi' ? 'दिन पूर्व' : 'days ago'}</span>
              <button
                onClick={() => setCurrentTab('crops')}
                className="font-bold text-emerald-800 hover:underline"
              >
                {language === 'hi' ? 'विस्तार →' : 'Plan Details →'}
              </button>
            </div>
          </div>

          {/* Card B: Mandi Modal Price Snippet */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">{language === 'hi' ? 'ताजा मंडी भाव' : 'Live Mandi Rate'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Agmarknet Verified</span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">{localMandi.marketName}</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-emerald-700">₹{localMandi.modalPrice}</span>
                <span className="text-xs font-semibold text-slate-500">/{localMandi.unit.split('/')[1] || 'क्विंटल'}</span>
                <span className="text-xs font-bold text-emerald-600 ml-auto">+2.4%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Min: ₹{localMandi.minPrice} • Max: ₹{localMandi.maxPrice}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'अनुमानित कुल पैदावार:' : 'Expected Yield:'}</span>
                <span className="font-bold">~99 क्विंटल (4.5 एकड़)</span>
              </div>
              <div className="flex justify-between mt-1 text-emerald-800 font-bold">
                <span>{language === 'hi' ? 'सकल विक्रय मूल्य:' : 'Gross Value:'}</span>
                <span>₹2,35,620</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('mandi')}
              className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold text-center transition-colors"
            >
              {language === 'hi' ? 'मंडी तुलना व भाड़ा कैलकुलेटर' : 'Compare Mandis & Net Income'}
            </button>
          </div>

          {/* Card C: 3D Plant Anatomy Preview */}
          <CropInspector3D
            cropName={activeCrop.cropName}
            stageName={`${activeCrop.stage} (${activeCrop.currentStageDay} DAS)`}
            diseaseSpotActive={false}
          />

        </div>
      </div>

      {/* 4. ACTIVE CROP CALENDAR & STAGE PROGRESS BAR */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'वर्तमान फसल विकास चक्र' : 'Active Crop Growth Cycle'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {activeCrop.cropName} ({activeCrop.variety}) • {language === 'hi' ? 'बुवाई तिथि:' : 'Sown on:'} {activeCrop.sowingDate}
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            {language === 'hi' ? 'वर्तमान अवस्था: कल्ले फूटना (Tillering)' : 'Current: Tillering (42 DAS)'}
          </span>
        </div>

        {/* Growth Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>{language === 'hi' ? 'प्रगति:' : 'Progress:'} Day {activeCrop.currentStageDay} of {activeCrop.totalDurationDays}</span>
            <span>{Math.round((activeCrop.currentStageDay / activeCrop.totalDurationDays) * 100)}% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((activeCrop.currentStageDay / activeCrop.totalDurationDays) * 100)}%` }}
            />
          </div>
        </div>

        {/* Key Stages Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-center">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <span className="text-[10px] text-emerald-600 font-bold block">0-10 DAS</span>
            <p className="font-bold text-emerald-950 mt-0.5">{language === 'hi' ? 'अंकुरण' : 'Germination'}</p>
            <span className="text-[10px] text-emerald-700 font-semibold">✓ Completed</span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <span className="text-[10px] text-emerald-600 font-bold block">21-25 DAS</span>
            <p className="font-bold text-emerald-950 mt-0.5">CRI Stage</p>
            <span className="text-[10px] text-emerald-700 font-semibold">✓ Irrigated</span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs ring-2 ring-emerald-500 shadow-md">
            <span className="text-[10px] text-emerald-200 block">40-45 DAS</span>
            <p className="mt-0.5">{language === 'hi' ? 'कल्ले फूटना' : 'Tillering'}</p>
            <span className="text-[10px] text-emerald-100 font-bold">● Active Now</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
            <span className="text-[10px] text-slate-400 font-bold block">65-75 DAS</span>
            <p className="font-bold text-slate-700 mt-0.5">{language === 'hi' ? 'गांठ बनना' : 'Jointing'}</p>
            <span className="text-[10px] text-slate-400">Upcoming</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-bold block">120-140 DAS</span>
            <p className="font-bold text-slate-700 mt-0.5">{language === 'hi' ? 'पकाव व कटाई' : 'Harvest'}</p>
            <span className="text-[10px] text-slate-400">Target 22 Qtl/Acre</span>
          </div>
        </div>
      </div>

      {/* 5. ADD FARM MODAL */}
      {showAddFarmModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? 'नया खेत जोड़ें' : 'Add New Farm Plot'}
              </h3>
              <button 
                onClick={() => setShowAddFarmModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFarm} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'खेत का नाम' : 'Farm Name'}
                </label>
                <input
                  type="text"
                  required
                  value={newFarmName}
                  onChange={(e) => setNewFarmName(e.target.value)}
                  placeholder="e.g. Purwa Khet, Kalyanpur"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'hi' ? 'जिला (UP)' : 'District'}
                  </label>
                  <select
                    value={newFarmDistrict}
                    onChange={(e) => setNewFarmDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  >
                    <option value="Kanpur Nagar">Kanpur Nagar</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Barabanki">Barabanki</option>
                    <option value="Meerut">Meerut</option>
                    <option value="Prayagraj">Prayagraj</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'hi' ? 'रकबा (एकड़)' : 'Area (Acres)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={newFarmArea}
                    onChange={(e) => setNewFarmArea(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'मिट्टी का प्रकार' : 'Soil Type'}
                </label>
                <select
                  value={newFarmSoil}
                  onChange={(e) => setNewFarmSoil(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="Alluvial (जलोढ़)">Alluvial (जलोढ़)</option>
                  <option value="Sandy Loam (बलुई दोमट)">Sandy Loam (बलुई दोमट)</option>
                  <option value="Clay Loam (मटियार दोमट)">Clay Loam (मटियार दोमट)</option>
                  <option value="Black Cotton (काली मिट्टी)">Black Cotton (काली मिट्टी)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'hi' ? 'सिंचाई साधन' : 'Irrigation Source'}
                </label>
                <select
                  value={newFarmIrrigation}
                  onChange={(e) => setNewFarmIrrigation(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                >
                  <option value="Tube-well (नलकूप)">Tube-well (नलकूप)</option>
                  <option value="Canal (नहर)">Canal (नहर)</option>
                  <option value="Drip Irrigation (टपक सिंचाई)">Drip Irrigation (टपक सिंचाई)</option>
                  <option value="Sprinkler (फव्वारा)">Sprinkler (फव्वारा)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddFarmModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 font-semibold hover:bg-slate-50"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  {language === 'hi' ? 'खेत सुरक्षित करें' : 'Save Farm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
