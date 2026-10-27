import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Scale, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AGRICULTURAL_PRODUCTS_CATALOG } from '../../data/mockData';
import { AgriculturalProduct } from '../../types';

export const ProductCatalogView: React.FC = () => {
  const { language, savedProducts, toggleSaveProduct } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comparingIds, setComparingIds] = useState<string[]>(['prod-wheat-hd2967', 'prod-wheat-dbw187']);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const CATEGORIES = [
    'All',
    'Seeds (बीज)',
    'Fertilizers (उर्वरक)',
    'Tools & Irrigation (उपकरण व सिंचाई)'
  ];

  const filteredProducts = AGRICULTURAL_PRODUCTS_CATALOG.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = !searchQuery || 
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.varietyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleCompare = (id: string) => {
    if (comparingIds.includes(id)) {
      setComparingIds(comparingIds.filter(i => i !== id));
    } else {
      if (comparingIds.length >= 3) {
        alert('You can compare up to 3 products simultaneously.');
        return;
      }
      setComparingIds([...comparingIds, id]);
    }
  };

  const comparedProducts = AGRICULTURAL_PRODUCTS_CATALOG.filter(p => comparingIds.includes(p.id));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'प्रमाणित बीज व कृषि उत्पाद कैटलॉग' : 'Verified Agricultural Products & Seeds'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Official ICAR & NSC
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'केवल वास्तविक अधिसूचित किस्में और अनुमोदित इनपुट — कोई काल्पनिक या नकली ब्रांड नहीं'
              : 'Genuinely notified seed varieties, FCO approved fertilizers, and authorized subsidy kits'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'किस्म या ब्रांड खोजें (HD-2967, IFFCO)...' : 'Search variety (DBW-187, DAP)...'}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>
      </div>

      {/* 2. CATEGORY TABS & COMPARE FLOATING BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {comparingIds.length > 0 && (
          <button
            onClick={() => setShowComparisonModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200/80 text-emerald-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>{language === 'hi' ? `तुलना करें (${comparingIds.length})` : `Compare Products (${comparingIds.length})`}</span>
          </button>
        )}
      </div>

      {/* 3. PRODUCT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const isSaved = savedProducts.includes(prod.id);
          const isCompared = comparingIds.includes(prod.id);

          return (
            <div key={prod.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:border-emerald-400 transition-all flex flex-col justify-between">
              <div>
                {/* Image & Badges */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={prod.imageUrl}
                    alt={prod.productName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold">
                    {prod.category}
                  </div>
                  <button
                    onClick={() => toggleSaveProduct(prod.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:text-emerald-700"
                    title="Bookmark Product"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-600 fill-emerald-600" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {prod.brand}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {prod.productName}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'hi' ? prod.descriptionHi : prod.descriptionEn}
                  </p>

                  {/* Agronomic specs pillbox */}
                  {prod.agronomicSpecifications.maturityDurationDays > 0 && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'hi' ? 'परिपक्वता अवधि:' : 'Maturity:'}</span>
                        <span className="font-bold">{prod.agronomicSpecifications.maturityDurationDays} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'hi' ? 'औसत उपज:' : 'Yield Potential:'}</span>
                        <span className="font-bold text-emerald-700">{prod.agronomicSpecifications.averageYieldQuintalPerAcre} Qtl/Acre</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{language === 'hi' ? 'बुवाई समय:' : 'Sowing Window:'}</span>
                        <span className="font-semibold">{prod.agronomicSpecifications.sowingWindow}</span>
                      </div>
                    </div>
                  )}

                  {/* Certification Authority */}
                  {prod.certificationAuthority && (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/60 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{prod.certificationAuthority}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Actions Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <div>
                  <span className="text-lg font-black text-slate-900">
                    ₹{prod.discountedPrice || prod.mrp}
                  </span>
                  <span className="text-[10px] text-slate-400 block -mt-1 font-medium">
                    {prod.packageSize}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCompare(prod.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isCompared
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isCompared ? 'Added' : 'Compare'}
                  </button>

                  {prod.sellerUrl && (
                    <a
                      href={prod.sellerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Open Official Portal"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. SIDE-BY-SIDE COMPARISON MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'बीज व उत्पाद आमने-सामने तुलना' : 'Side-by-Side Product & Variety Comparison'}
                </h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparedProducts.map((cp) => (
                <div key={cp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <img src={cp.imageUrl} alt={cp.productName} className="w-full h-32 object-cover rounded-xl" />
                  <h4 className="font-extrabold text-sm text-slate-900">{cp.productName}</h4>
                  <p className="text-xs text-slate-500 font-semibold">{cp.brand}</p>
                  
                  <div className="divide-y divide-slate-200 text-xs">
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-500">Price / MRP:</span>
                      <span className="font-bold text-emerald-800">₹{cp.discountedPrice || cp.mrp}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-500">Maturity Days:</span>
                      <span className="font-bold">{cp.agronomicSpecifications.maturityDurationDays || 'N/A'}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-slate-500">Avg Yield:</span>
                      <span className="font-bold">{cp.agronomicSpecifications.averageYieldQuintalPerAcre} Qtl/Acre</span>
                    </div>
                    <div className="py-2">
                      <span className="text-slate-500 block mb-1">Disease Resistance:</span>
                      <div className="flex flex-wrap gap-1">
                        {cp.agronomicSpecifications.resistanceToDiseases.map((res, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-medium">
                            {res}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="py-2">
                      <span className="text-slate-500 block mb-1">Water Need:</span>
                      <span className="text-[11px] text-slate-700">{cp.agronomicSpecifications.waterRequirement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
