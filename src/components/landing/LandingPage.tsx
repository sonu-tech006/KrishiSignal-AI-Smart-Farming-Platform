import React from 'react';
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
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmField3D } from '../3d/FarmField3D';
import { VERIFIED_MANDI_DATA, AGRICULTURAL_PRODUCTS_CATALOG } from '../../data/mockData';

export const LandingPage: React.FC = () => {
  const { language, setLanguage, loginAs, setCurrentTab } = useApp();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 selection:bg-emerald-500/20">
      {/* 1. HERO SECTION WITH 3D DIGITAL TWIN & REAL VALUE PROPOSITION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-emerald-950/10">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading, Badges, CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>{language === 'hi' ? 'उत्तर प्रदेश के 2.5 करोड़ किसानों के लिए' : 'Empowering Indian Farmers with Decision AI'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-950 leading-[1.15]">
                {language === 'hi' ? (
                  <>
                    सटीक मौसम, मंडी भाव और <br />
                    <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy">
                      वैज्ञानिक कृषि निर्णय
                    </span> एक ही मंच पर।
                  </>
                ) : (
                  <>
                    Scientific Agri Decisions, <br />
                    <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy">
                      Live Mandi Prices & Weather
                    </span> in One Platform.
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                {language === 'hi'
                  ? 'कृषि वैज्ञानिकों और वास्तविक मौसम आंकड़ों से संचालित। गेहूँ व अन्य फसलों में सिंचाई का सही समय, असली प्रमाणित बीज, बीमारी की पहचान और अपनी उपज का अधिकतम मूल्य पाएं।'
                  : 'Grounded by ICAR agronomic rules, Open-Meteo real-time meteorological forecasts, and Agmarknet verified mandi prices. Transparent, explainable, and built for Hindi-speaking growers.'}
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => loginAs('farmer-1')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xl shadow-emerald-700/25 flex items-center gap-2 transform active:scale-95 transition-all"
                >
                  <span>{language === 'hi' ? 'किसान डैशबोर्ड शुरू करें (फ्री)' : 'Open Farmer Dashboard (Free Demo)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    loginAs('farmer-1');
                    setCurrentTab('assistant');
                  }}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-sm flex items-center gap-2 transition-all"
                >
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? 'कृषि मित्र से बोलें (Voice AI)' : 'Try Voice AI Assistant'}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? '100% निशुल्क किसान सेवा' : 'No Paid Subscription'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? 'आईसीएमआर / आईसीएआर सत्यापित' : 'ICAR & IMD Aligned'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? 'शुद्ध हिन्दी और आवाज समर्थन' : 'Full Voice Support'}</span>
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
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-[11px] text-slate-500 font-medium">{language === 'hi' ? 'कानपुर मंडी गेहूँ' : 'Kanpur Wheat Mandi'}</p>
                    <p className="text-base font-extrabold text-emerald-700">₹2,380 / Qtl</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">↑ +2.4% Today</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-[11px] text-slate-500 font-medium">{language === 'hi' ? 'बारिश का अनुमान' : '48h Rainfall'}</p>
                    <p className="text-base font-extrabold text-slate-800">0.0 mm</p>
                    <span className="text-[10px] text-blue-600 font-semibold">{language === 'hi' ? 'सिंचाई के लिए सुरक्षित' : 'Safe to Irrigate'}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center col-span-2 sm:col-span-1">
                    <p className="text-[11px] text-slate-500 font-medium">{language === 'hi' ? 'फसल अवस्था' : 'Active Stage'}</p>
                    <p className="text-sm font-extrabold text-amber-700 truncate">Tillering (42 DAS)</p>
                    <span className="text-[10px] text-slate-500">{language === 'hi' ? 'कल्ले फूट रहे हैं' : 'Top Dressing Due'}</span>
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
            <span>{language === 'hi' ? 'लाइव मंडी भाव (UP AGMARKNET):' : 'LIVE MANDI PRICES (UP):'}</span>
          </div>
          <div className="flex items-center gap-8 text-slate-200 font-medium">
            {VERIFIED_MANDI_DATA.map((m) => (
              <span key={m.id} className="flex items-center gap-2">
                <span className="font-semibold text-white">{m.commodity}:</span>
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
            {language === 'hi' ? 'सभी मंडियां देखें →' : 'View All →'}
          </button>
        </div>
      </section>

      {/* 3. CORE MODULE FEATURES (HOW KRISHISIGNAL WORKS) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
            {language === 'hi' ? 'सम्पूर्ण कृषि निर्णय चक्र' : 'Complete Agricultural Decision Loop'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-3">
            {language === 'hi' ? 'बुवाई से लेकर बिक्री तक, किसान का सच्चा साथी' : 'From Sowing to Sale — Grounded Agro Intelligence'}
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            {language === 'hi'
              ? 'बिना किसी भ्रामक जानकारी के, केवल प्रमाणित वैज्ञानिक नियमों और आधिकारिक मौसम पूर्वानुमानों पर आधारित।'
              : 'Zero hallucinations. Transparent explanations, scientific ICAR rules, and real UP local mandi rates.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Explainable Irrigation */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'hi' ? 'वैज्ञानिक सिंचाई निर्णय प्रणाली' : 'Explainable Irrigation Decision Support'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {language === 'hi'
                ? 'फसल की अवस्था (CRI, कल्ले, फूल), मिट्टी की जल धारण क्षमता और 72 घंटे के बारिश पूर्वानुमान को मिलाकर सटीक निर्णय। पानी और बिजली की 40% तक बचत।'
                : 'Deterministic rules cross-referencing crop stage, soil moisture retention, and 72-hour forecast precipitation.'}
            </p>
            <div className="p-3 rounded-xl bg-blue-50/80 text-[11px] text-blue-900 border border-blue-200">
              <strong>{language === 'hi' ? 'उदाहरण नियम:' : 'Sample Rule:'}</strong> {language === 'hi' ? 'यदि 48 घंटे में 15 मिमी बारिश संभावित है, तो सिंचाई रोकें।' : 'Hold watering if rainfall > 15mm is forecast.'}
            </div>
          </div>

          {/* Card 2: Real Mandi Intelligence */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'hi' ? 'उत्तर प्रदेश मंडी भाव व शुद्ध लाभ' : 'UP Mandi Intelligence & Net Profit'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {language === 'hi'
                ? 'कानपुर, लखनऊ, वाराणसी, बाराबंकी की वास्तविक मंडियों का न्यूनतम, अधिकतम व मॉडल भाव। भाड़ा व पल्लेदारी काटकर शुद्ध आय कैलकुलेटर।'
                : 'Real AGMARKNET-backed modal prices across UP. Net revenue calculator factoring in transport and mandi fees.'}
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/80 text-[11px] text-emerald-900 border border-emerald-200">
              <strong>{language === 'hi' ? 'शुद्ध लाभ:' : 'Net Formula:'}</strong> (क्विंटल × मॉडल भाव) - (डीजल व परिवहन खर्च) = शुद्ध बचत।
            </div>
          </div>

          {/* Card 3: Certified Seeds & Products */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'hi' ? 'असली प्रमाणित बीज व उत्पाद कैटलॉग' : 'Verified Seeds & Agricultural Catalog'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {language === 'hi'
                ? 'राष्ट्रीय बीज निगम (NSC) और कृषि विश्वविद्यालयों द्वारा अधिसूचित किस्में जैसे HD-2967, DBW-187 (करण वंदना), इफ्को नैनो यूरिया के प्रमाणित विनिर्देश।'
                : 'Notified varieties with ICAR registration, maturity days, disease resistance, and official seller links.'}
            </p>
            <div className="p-3 rounded-xl bg-amber-50/80 text-[11px] text-amber-900 border border-amber-200">
              <strong>{language === 'hi' ? 'विश्वसनीयता:' : 'Trust:'}</strong> कोई काल्पनिक उत्पाद नाम नहीं, केवल सरकारी प्रमाणित किस्में।
            </div>
          </div>

          {/* Card 4: Voice AI KrishiMitra */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'hi' ? 'कृषि मित्र — आवाज व हिन्दी सहायक' : 'KrishiMitra Voice & Multilingual AI'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {language === 'hi'
                ? 'माइक दबाकर अपनी ही भाषा में बोलें। उत्तर बोलकर सुनाने की सुविधा। कृषि वैज्ञानिकों द्वारा सत्यापित संदर्भों के साथ आसान चरणबद्ध उत्तर।'
                : 'Talk in Hindi or English using Web Speech recognition and text-to-speech with grounded ICAR references.'}
            </p>
            <div className="p-3 rounded-xl bg-purple-50/80 text-[11px] text-purple-900 border border-purple-200">
              <strong>{language === 'hi' ? 'आवाज सहायता:' : 'Voice AI:'}</strong> "क्या मेरी गेहूँ की फसल में नैनो यूरिया छिड़कने का सही समय है?"
            </div>
          </div>

          {/* Card 5: Crop Health Scanner */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'hi' ? 'पत्ती रोग पहचान व जैविक उपचार' : 'Crop Leaf Health AI Diagnostics'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {language === 'hi'
                ? 'रोगग्रस्त पत्ती की फोटो अपलोड करें। पीला रतुआ, झुलसा और कीटों की प्रारंभिक जांच, साथ ही नीम तेल व अनुमोदित फफूंदनाशक की सटीक खुराक।'
                : 'Visual symptom screening for Yellow Rust, Leaf Blight, and Aphids with organic & chemical dosage guidance.'}
            </p>
            <div className="p-3 rounded-xl bg-rose-50/80 text-[11px] text-rose-900 border border-rose-200">
              <strong>{language === 'hi' ? 'सुरक्षा चेतावनी:' : 'Safety Notice:'}</strong> गंभीर प्रकोप होने पर नजदीकी केवीके (KVK) से संपर्क की सलाह।
            </div>
          </div>

          {/* Card 6: Farm Diary & Subsidy Tracker */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'hi' ? 'खेत डायरी व सरकारी योजनाएं' : 'Farm Activity Diary & PM Schemes'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {language === 'hi'
                ? 'बुवाई, खाद, कीटनाशक और मजदूरी का दैनिक ब्योरा। पीएम-किसान, फसल बीमा योजना (PMFBY), और मृदा स्वास्थ्य कार्ड के सीधे आधिकारिक लिंक।'
                : 'Track input costs, yields, and check eligibility for PM-KISAN, PMFBY, and UP state subsidy programs.'}
            </p>
            <div className="p-3 rounded-xl bg-teal-50/80 text-[11px] text-teal-900 border border-teal-200">
              <strong>{language === 'hi' ? 'पारदर्शिता:' : 'Transparency:'}</strong> सीधे आधिकारिक पोर्टल लिंक, कोई बिचौलिया नहीं।
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
                {language === 'hi' ? 'सत्यापित कृषि उत्पाद कैटलॉग' : 'Verified Products Catalog'}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {language === 'hi' ? 'उत्तर प्रदेश के लिए शीर्ष प्रमाणित किस्में व खाद' : 'Certified Seeds & Bio-Inputs for UP'}
              </h2>
            </div>
            <button
              onClick={() => {
                loginAs('farmer-1');
                setCurrentTab('products');
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>{language === 'hi' ? 'सम्पूर्ण कैटलॉग देखें' : 'View Full Catalog'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGRICULTURAL_PRODUCTS_CATALOG.slice(0, 3).map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full bg-slate-200 overflow-hidden">
                    <img
                      src={prod.imageUrl}
                      alt={prod.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold shadow">
                      {prod.category}
                    </div>
                    {prod.isCertified && (
                      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-white/95 text-emerald-900 text-[10px] font-bold shadow flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Certified
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-[11px] font-semibold text-slate-500">{prod.brand}</p>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{prod.productName}</h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {language === 'hi' ? prod.descriptionHi : prod.descriptionEn}
                    </p>

                    <div className="mt-3 p-2 rounded-xl bg-slate-50 text-[11px] text-slate-700 border border-slate-100 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{language === 'hi' ? 'अवधि:' : 'Duration:'}</span>
                        <span className="font-semibold">{prod.agronomicSpecifications.maturityDurationDays} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{language === 'hi' ? 'पैकेज साइज:' : 'Package:'}</span>
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
                    {language === 'hi' ? 'तुलना करें' : 'Compare'}
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
              {language === 'hi' ? 'डिजिटल कृषि क्रांति' : 'Next-Generation Digital Farming'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              {language === 'hi' ? 'आज ही अपने खेत को KrishiSignal से जोड़ें' : 'Connect Your Farm to KrishiSignal Today'}
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
              {language === 'hi'
                ? 'निःशुल्क पंजीकरण करें, अपनी जमीन व मिट्टी का ब्योरा दर्ज करें, और प्रतिदिन सुबह फसल व मंडी सलाह पाएं।'
                : 'Free instant access. Add multiple farm plots, analyze soil tests, track your crop cycle and boost yields.'}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => loginAs('farmer-1')}
                className="px-8 py-3.5 rounded-xl bg-white text-emerald-950 font-extrabold text-sm shadow-xl hover:bg-emerald-50 transform active:scale-95 transition-all"
              >
                {language === 'hi' ? 'तुरंत शुरू करें (रमेश कुमार डेमो खाता)' : 'Launch Free Demo Profile'}
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
              <span className="font-extrabold text-slate-800 text-sm">KrishiSignal UP</span>
              <span className="text-[11px] text-slate-400">v2.5 Production Build</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-slate-600">
              <button onClick={() => setCurrentTab('weather')} className="hover:text-emerald-700">मौसम</button>
              <button onClick={() => setCurrentTab('mandi')} className="hover:text-emerald-700">मंडी भाव</button>
              <button onClick={() => setCurrentTab('products')} className="hover:text-emerald-700">बीज कैटलॉग</button>
              <button onClick={() => setCurrentTab('schemes')} className="hover:text-emerald-700">सरकारी योजनाएं</button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
            <strong>{language === 'hi' ? 'वैधानिक कृषि अस्वीकरण (Agronomic Disclaimer):' : 'Agronomic Verification Disclaimer:'}</strong>{' '}
            {language === 'hi'
              ? 'कृषि सिग्नल पर प्रदान की गई मौसम, सिंचाई, खाद व रोग संबंधी सलाह भारतीय कृषि अनुसंधान परिषद (ICAR), राज्य कृषि विश्वविद्यालयों तथा ओपन-मीटियो के आंकड़ों पर आधारित है। रासायनिक कीटनाशकों के अत्यधिक प्रयोग से बचें तथा बड़े क्षेत्रीय प्रकोप की स्थिति में नजदीकी कृषि विज्ञान केंद्र (KVK) से व्यक्तिगत परामर्श अवश्य लें।'
              : 'All irrigation, fertilizer, and disease advisories generated by KrishiSignal are decision-support estimates derived from ICAR guidelines, IMD weather models, and Agmarknet data. Always adhere to recommended pesticide label waiting periods (PHI) and verify local conditions with your Block Agricultural Extension Officer.'}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 gap-2 pt-2">
            <p>© {new Date().getFullYear()} KrishiSignal. Built with React 19, Tailwind CSS, Leaflet & Gemini AI.</p>
            <p>Designed for Farmers in Uttar Pradesh, India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
