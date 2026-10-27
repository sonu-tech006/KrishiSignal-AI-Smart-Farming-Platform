import React, { useState } from 'react';
import { 
  Landmark, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GOVERNMENT_SCHEMES_DATA } from '../../data/mockData';

export const SchemesView: React.FC = () => {
  const { language } = useApp();
  const [searchScheme, setSearchScheme] = useState('');

  const filteredSchemes = GOVERNMENT_SCHEMES_DATA.filter(s => 
    !searchScheme || 
    s.titleEn.toLowerCase().includes(searchScheme.toLowerCase()) ||
    s.titleHi.includes(searchScheme) ||
    s.tags.some(t => t.toLowerCase().includes(searchScheme.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'प्रमुख सरकारी कृषि योजनाएं व अनुदान' : 'Government Agricultural Schemes & Subsidies'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Official Portals
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'बिना किसी बिचौलिये के, सीधे भारत सरकार व उत्तर प्रदेश कृषि विभाग के आधिकारिक पोर्टल से जुड़ें'
              : 'Direct verified guidelines, eligibility criteria, and application links for DBT welfare schemes'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchScheme}
            onChange={(e) => setSearchScheme(e.target.value)}
            placeholder={language === 'hi' ? 'योजना खोजें (PM Kisan, बीमा)...' : 'Search schemes...'}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* 2. SCHEMES CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {scheme.department.split(',')[0]}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1.5">
                    {language === 'hi' ? scheme.titleHi : scheme.titleEn}
                  </h3>
                </div>
              </div>

              {/* Benefit Callout */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                  {language === 'hi' ? 'वित्तीय लाभ (Benefit):' : 'Key Benefit:'}
                </span>
                <p className="font-semibold text-emerald-950 leading-relaxed">
                  {language === 'hi' ? scheme.benefitHi : scheme.benefitEn}
                </p>
              </div>

              {/* Eligibility Checklist */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 block">
                  {language === 'hi' ? 'पात्रता शर्तें (Eligibility Criteria):' : 'Eligibility Checklist:'}
                </span>
                <div className="space-y-1">
                  {(language === 'hi' ? scheme.eligibilityHi : scheme.eligibilityEn).map((el, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action & Direct Portal Link */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {scheme.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all"
              >
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल' : 'Apply on Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
