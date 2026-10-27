import React, { useState } from 'react';
import { 
  Droplets, 
  Sprout, 
  Calculator, 
  FlaskConical, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  calculateIrrigationRecommendation, 
  calculateFertilizerPlan, 
  calculateSeedRate, 
  evaluateCropSuitability 
} from '../../services/agronomyEngine';

export const CropIrrigationView: React.FC = () => {
  const { activeFarm, activeCrop, weather, language } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'irrigation' | 'fertilizer' | 'crops' | 'seedrate' | 'soil'>('irrigation');

  // Input states for dynamic testing
  const [simulatedRain, setSimulatedRain] = useState<number>(weather?.daily?.[0]?.precipitationSum || 0);
  const [customAcreage, setCustomAcreage] = useState<number>(activeFarm.landAreaAcres);
  const [selectedSeason, setSelectedSeason] = useState<'Rabi' | 'Kharif'>('Rabi');

  // Decisions
  const irrigationRec = calculateIrrigationRecommendation(
    activeFarm,
    activeCrop,
    simulatedRain,
    weather?.current?.tempMax || 26
  );

  const fertPlan = calculateFertilizerPlan(activeCrop.cropName, customAcreage, activeFarm.soilTest);
  const seedRateResult = calculateSeedRate(activeCrop.cropName, customAcreage);
  const suitabilityScores = evaluateCropSuitability(activeFarm, selectedSeason);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER & SUB-NAVIGATION */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'फसल, सिंचाई व पोषण बुद्धिमत्ता' : 'Crop, Irrigation & Nutrient Intelligence'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              ICAR Grounded
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'पारदर्शी वैज्ञानिक नियम — कोई काल्पनिक या असत्यापित सलाह नहीं'
              : 'Deterministic, testable agronomic decision engines based on ICAR guidelines'}
          </p>
        </div>

        {/* Sub-tabs Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('irrigation')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'irrigation' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'सिंचाई निर्णय' : 'Irrigation DSS'}
          </button>
          <button
            onClick={() => setActiveSubTab('fertilizer')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'fertilizer' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'खाद कैलकुलेटर' : 'Fertilizer Plan'}
          </button>
          <button
            onClick={() => setActiveSubTab('crops')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'crops' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'फसल सिफारिश' : 'Crop Ranking'}
          </button>
          <button
            onClick={() => setActiveSubTab('seedrate')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'seedrate' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'बीज दर' : 'Seed Rate'}
          </button>
          <button
            onClick={() => setActiveSubTab('soil')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeSubTab === 'soil' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'hi' ? 'मृदा स्वास्थ्य' : 'Soil Health'}
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB CONTENT 1: IRRIGATION DECISION */}
      {activeSubTab === 'irrigation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Decision Banner */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {language === 'hi' ? 'सिंचाई निर्धारण व व्याख्या' : 'Irrigation Determination & Justification'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeFarm.farmName} • {activeCrop.cropName} ({activeCrop.stage})
                  </p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                irrigationRec.action === 'IRRIGATE_NOW'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-emerald-100 text-emerald-900'
              }`}>
                {language === 'hi' ? irrigationRec.statusLabelHi : irrigationRec.statusLabelEn}
              </span>
            </div>

            {/* Scientific Explanation Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {language === 'hi' ? 'पारदर्शी व्याख्या (Transparent Why):' : 'Scientific Explanation:'}
              </span>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {language === 'hi' ? irrigationRec.explanationHi : irrigationRec.explanationEn}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{irrigationRec.sourceReference}</span>
              </div>
            </div>

            {/* Inputs Snapshot Used by Algorithm */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {language === 'hi' ? 'निर्णय में प्रयुक्त प्रमुख इनपुट:' : 'Input Parameters Evaluated:'}
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'फसल अवस्था' : 'Crop Stage'}</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{activeCrop.stage.split('(')[0]}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'पिछली सिंचाई' : 'Last Watering'}</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{irrigationRec.supportingData.daysSinceLastIrrigation} {language === 'hi' ? 'दिन पूर्व' : 'days ago'}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? '72h वर्षा पूर्वानुमान' : '72h Forecast Rain'}</span>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">{simulatedRain} mm</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'मिट्टी प्रकार' : 'Soil Texture'}</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{activeFarm.soilType.split('(')[0]}</p>
                </div>
              </div>
            </div>

            {/* Simulation Slider for testing weather impact */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-2">
              <div className="flex justify-between font-bold text-blue-900">
                <span>{language === 'hi' ? 'सिम्युलेशन: आगामी 72 घंटे में बारिश बदलें' : 'Simulate: Test with Forecast Rainfall:'}</span>
                <span>{simulatedRain} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={simulatedRain}
                onChange={(e) => setSimulatedRain(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-blue-700">
                {language === 'hi' ? 'स्लाइडर को 15 मिमी से ऊपर ले जाएं और देखें कि एल्गोरिदम कैसे सिंचाई को तत्काल टालने की सलाह देता है।' : 'Slide above 15mm to observe how the rule engine prevents waterlogging.'}
              </p>
            </div>
          </div>

          {/* Right: Wheat 5-Stage Irrigation Calendar Reference */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">
              {language === 'hi' ? 'गेहूँ के 5 अनिवार्य सिंचाई चरण (ICAR)' : 'Critical 5-Stage Irrigation Calendar'}
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">1. Crown Root (CRI) • 20-25 DAS</span>
                <p className="font-bold text-emerald-950 mt-0.5">ताज जड़ अवस्था (अनिवार्य)</p>
                <p className="text-[11px] text-slate-600 mt-1">Single most critical stage. Yield drops 30% if skipped.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">2. Tillering • 40-45 DAS</span>
                <p className="font-bold text-slate-800 mt-0.5">कल्ले फूटते समय</p>
                <p className="text-[11px] text-slate-500 mt-1">Crucial for secondary shoot development.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">3. Late Jointing • 65-70 DAS</span>
                <p className="font-bold text-slate-800 mt-0.5">गांठ बनते समय</p>
                <p className="text-[11px] text-slate-500 mt-1">Prevents early head abortion.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">4. Flowering • 85-90 DAS</span>
                <p className="font-bold text-slate-800 mt-0.5">फूल खिलते समय</p>
                <p className="text-[11px] text-slate-500 mt-1">Water stress causes sterile spikelets.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">5. Milk & Dough • 105-115 DAS</span>
                <p className="font-bold text-slate-800 mt-0.5">दूधिया व दाना भराव</p>
                <p className="text-[11px] text-slate-500 mt-1">Ensures plump, heavy wheat grain.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUB-TAB CONTENT 2: FERTILIZER PLAN */}
      {activeSubTab === 'fertilizer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'hi' ? 'संतुलित उर्वरक व पोषक तत्व योजना' : 'Balanced Fertilizer & Nutrient Plan'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'मृदा स्वास्थ्य कार्ड NPK मानों पर आधारित सटीक खुराक' : 'Calculated for your farm acreage and soil test parameters'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">{language === 'hi' ? 'रकबा (एकड़):' : 'Acreage:'}</span>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={customAcreage}
                onChange={(e) => setCustomAcreage(Math.max(0.5, Number(e.target.value)))}
                className="w-24 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-center"
              />
            </div>
          </div>

          {/* Doses Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase block">IFFCO DAP (18:46:0)</span>
              <p className="text-2xl font-black text-emerald-950 mt-1">{fertPlan.dap_kg} kg</p>
              <span className="text-[11px] text-emerald-700">~{Math.ceil(fertPlan.dap_kg / 50)} Bags (50kg)</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-xs font-bold text-blue-800 uppercase block">Urea (46% N)</span>
              <p className="text-2xl font-black text-blue-950 mt-1">{fertPlan.urea_kg} kg</p>
              <span className="text-[11px] text-blue-700">~{Math.ceil(fertPlan.urea_kg / 45)} Bags (45kg)</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-xs font-bold text-amber-800 uppercase block">MOP Potash (60% K2O)</span>
              <p className="text-2xl font-black text-amber-950 mt-1">{fertPlan.mop_potash_kg} kg</p>
              <span className="text-[11px] text-amber-700">~{Math.ceil(fertPlan.mop_potash_kg / 50)} Bags (50kg)</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
              <span className="text-xs font-bold text-purple-800 uppercase block">Zinc Sulphate (21%)</span>
              <p className="text-2xl font-black text-purple-950 mt-1">{fertPlan.zinc_kg} kg</p>
              <span className="text-[11px] text-purple-700">Basal Application</span>
            </div>
          </div>

          {/* Application Split Schedule */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              {language === 'hi' ? 'विभाजित छिड़काव समय सारणी (Application Splits):' : 'Application Split Schedule:'}
            </h4>

            <div className="space-y-3">
              {fertPlan.schedule.map((sch, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-extrabold text-slate-800 text-sm block">
                      {language === 'hi' ? sch.stageHi : sch.stage}
                    </span>
                    <p className="text-slate-500 text-[11px] mt-0.5">{sch.notes}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {sch.dap_kg > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold">
                        DAP: {sch.dap_kg} kg
                      </span>
                    )}
                    {sch.urea_kg > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-bold">
                        Urea: {sch.urea_kg} kg
                      </span>
                    )}
                    {sch.mop_kg > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold">
                        MOP: {sch.mop_kg} kg
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SUB-TAB CONTENT 3: CROP SUITABILITY RANKINGS */}
      {activeSubTab === 'crops' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'hi' ? 'खेत व मिट्टी के अनुसार सर्वोत्तम फसल रैंकिंग' : 'Crop Suitability & Profit Ranking'}
              </h3>
              <p className="text-xs text-slate-500">
                {activeFarm.soilType} • {activeFarm.irrigationMethod} • {activeFarm.district}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedSeason('Rabi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSeason === 'Rabi' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Rabi (रबी)
              </button>
              <button
                onClick={() => setSelectedSeason('Kharif')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSeason === 'Kharif' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Kharif (खरीफ)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {suitabilityScores.map((crop, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        {language === 'hi' ? crop.cropNameHi : crop.cropName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {language === 'hi' ? crop.reasonHi : crop.reasonEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'अनुमानित शुद्ध बचत' : 'Est. Net Profit'}</span>
                      <span className="text-base font-black text-emerald-700">₹{crop.estimatedNetProfitPerAcre.toLocaleString()}/Acre</span>
                    </div>
                    <div className="w-16">
                      <span className="text-[10px] text-slate-400 block">Match</span>
                      <span className="text-sm font-extrabold text-slate-900">{crop.score}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-slate-600">{language === 'hi' ? 'अनुशंसित किस्में:' : 'Recommended Varieties:'}</span>
                    {crop.recommendedVarieties.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-emerald-900 font-semibold border border-slate-200">
                        {v}
                      </span>
                    ))}
                  </div>

                  <span className="text-slate-600 font-medium">
                    {language === 'hi' ? 'औसत पैदावार:' : 'Avg Yield:'} <strong>{crop.expectedYieldQuintalAcre} Qtl/Acre</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SUB-TAB CONTENT 4: SEED RATE & SOWING CALCULATOR */}
      {activeSubTab === 'seedrate' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'बीज दर व बीजोपचार कैलकुलेटर' : 'Seed Rate & Seed Treatment Protocol'}
            </h3>
            <p className="text-xs text-slate-500">
              {activeCrop.cropName} • {customAcreage} {language === 'hi' ? 'एकड़ हेतु गणना' : 'Acres calculation'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-800 uppercase block">{language === 'hi' ? 'कुल बीज आवश्यकता' : 'Required Seed Quantity'}</span>
              <p className="text-3xl font-black text-emerald-950 mt-1">{seedRateResult.seedQuantityKg} kg</p>
              <span className="text-xs text-emerald-700">~{Math.ceil(seedRateResult.seedQuantityKg / 40)} Bags (40kg bag)</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-600 uppercase block">{language === 'hi' ? 'कतार से कतार दूरी' : 'Row Spacing'}</span>
              <p className="text-lg font-extrabold text-slate-800 mt-2">{seedRateResult.spacingCm}</p>
              <span className="text-xs text-slate-500">Use seed drill</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-600 uppercase block">{language === 'hi' ? 'बुवाई की गहराई' : 'Sowing Depth'}</span>
              <p className="text-lg font-extrabold text-slate-800 mt-2">{seedRateResult.recommendedDepthCm}</p>
              <span className="text-xs text-slate-500">Moist soil furrow</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-extrabold text-amber-900 block">{language === 'hi' ? 'अनिवार्य बीजोपचार (Seed Treatment):' : 'Mandatory Seed Treatment Protocol:'}</span>
            <p className="leading-relaxed">
              {language === 'hi' ? seedRateResult.seedTreatmentHi : seedRateResult.seedTreatment}
            </p>
          </div>
        </div>
      )}

      {/* 2. SUB-TAB CONTENT 5: SOIL HEALTH */}
      {activeSubTab === 'soil' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'hi' ? 'मृदा स्वास्थ्य विश्लेषण (Soil Health Card Report)' : 'Soil Health Card Diagnostic Report'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'जांच तिथि:' : 'Test Date:'} {activeFarm.soilTest?.testDate || '2024-09-12'} • {activeFarm.farmName}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              KVK Certified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Nitrogen (N)</span>
                <span className="text-amber-600 font-extrabold">Medium-Low</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{activeFarm.soilTest?.nitrogen_kg_ha || 195} <span className="text-xs text-slate-400 font-normal">kg/ha</span></p>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-amber-500 rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Phosphorus (P)</span>
                <span className="text-emerald-600 font-extrabold">Adequate</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{activeFarm.soilTest?.phosphorus_kg_ha || 24} <span className="text-xs text-slate-400 font-normal">kg/ha</span></p>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Potassium (K)</span>
                <span className="text-emerald-600 font-extrabold">High</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{activeFarm.soilTest?.potassium_kg_ha || 260} <span className="text-xs text-slate-400 font-normal">kg/ha</span></p>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Soil pH</span>
                <span className="text-emerald-600 font-extrabold">Optimal</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{activeFarm.soilTest?.ph || 7.3}</p>
              <p className="text-[11px] text-slate-500">Slightly alkaline, excellent for cereal grain absorption.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Organic Carbon (OC)</span>
                <span className="text-amber-600 font-extrabold">Moderate</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{activeFarm.soilTest?.organicCarbon_percent || 0.52}%</p>
              <p className="text-[11px] text-slate-500">Add FYM or green manure (Dhaincha) during summer.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
