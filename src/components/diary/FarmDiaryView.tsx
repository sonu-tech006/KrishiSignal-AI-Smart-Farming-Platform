import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FarmActivity, ExpenseRecord } from '../../types';

export const FarmDiaryView: React.FC = () => {
  const { activities, addActivity, expenses, addExpense, activeFarm, activeCrop, language } = useApp();

  const [activeTab, setActiveTab] = useState<'activities' | 'expenses'>('activities');
  
  // New Activity Form State
  const [showActModal, setShowActModal] = useState(false);
  const [actType, setActType] = useState<FarmActivity['activityType']>('Irrigation');
  const [actDate, setActDate] = useState(new Date().toISOString().split('T')[0]);
  const [actDesc, setActDesc] = useState('');
  const [actCost, setActCost] = useState(0);

  // New Expense Form State
  const [showExpModal, setShowExpModal] = useState(false);
  const [expCategory, setExpCategory] = useState<ExpenseRecord['category']>('Fertilizers');
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState(0);
  const [expDate, setExpDate] = useState(new Date().toISOString().split('T')[0]);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const expectedYield = 99; // quintals for 4.5 acres
  const expectedRevenue = expectedYield * 2380; // ₹2380/qtl
  const estimatedNetProfit = expectedRevenue - totalExpense;

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actDesc.trim()) return;
    addActivity({
      farmId: activeFarm.id,
      activityType: actType,
      activityDate: actDate,
      description: actDesc,
      cost: Number(actCost)
    });
    setShowActModal(false);
    setActDesc('');
    setActCost(0);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || expAmount <= 0) return;
    addExpense({
      farmId: activeFarm.id,
      category: expCategory,
      title: expTitle,
      amount: Number(expAmount),
      date: expDate
    });
    setShowExpModal(false);
    setExpTitle('');
    setExpAmount(0);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Farm Activity Diary & Expense Ledger
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              {activeFarm.farmName}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Log field operations from sowing to harvest and maintain accurate profit and loss balances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowActModal(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log Activity</span>
          </button>

          <button
            onClick={() => setShowExpModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Expense</span>
          </button>
        </div>
      </div>

      {/* 2. PROFIT & LOSS FINANCIAL SNAPSHOT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Input Costs (To Date)
          </span>
          <p className="text-2xl sm:text-3xl font-black text-rose-600 mt-1">
            ₹{totalExpense.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-500 block mt-1">
            ₹{Math.round(totalExpense / activeFarm.landAreaAcres)} per acre average
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Projected Gross Harvest Value
          </span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            ₹{expectedRevenue.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            Based on 99 Quintals @ ₹2,380/Qtl (Kanpur Mandi)
          </span>
        </div>

        <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-5 rounded-3xl shadow-lg">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
            Estimated Net Farm Profit
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
            ₹{estimatedNetProfit.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-200 block mt-1">
            Net Return on Input Investment: {Math.round((estimatedNetProfit / totalExpense) * 100)}%
          </span>
        </div>
      </div>

      {/* 3. TABS: ACTIVITIES VS EXPENSES */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'activities' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Farm Activity Logs ({activities.length})
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'expenses' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Detailed Expense Items ({expenses.length})
          </button>
        </div>

        {activeTab === 'activities' ? (
          <div className="space-y-3">
            {activities.map((act) => (
              <div key={act.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold shrink-0">
                    {act.activityType}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{act.description}</h4>
                    {act.notes && <p className="text-slate-500 text-[11px] mt-0.5">{act.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  <span className="text-slate-500 font-medium">{act.activityDate}</span>
                  {act.cost > 0 && (
                    <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      ₹{act.cost}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {expenses.map((exp) => (
              <div key={exp.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {exp.category}
                  </span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{exp.title}</p>
                  <span className="text-slate-400 text-[11px]">{exp.date}</span>
                </div>

                <span className="font-extrabold text-base text-rose-600">
                  ₹{exp.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. ACTIVITY MODAL (WITH ACCESSIBLE CLOSE (X) BUTTON & BACKDROP) */}
      {showActModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowActModal(false)} 
          />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Log Agricultural Activity
              </h3>
              <button
                type="button"
                onClick={() => setShowActModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Activity Type</label>
                <select
                  value={actType}
                  onChange={(e) => setActType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                >
                  <option value="Irrigation">Irrigation (सिंचाई)</option>
                  <option value="Fertilizer Application">Fertilizer Application (खाद छिड़काव)</option>
                  <option value="Pest Spray">Pest Spray (कीटनाशक छिड़काव)</option>
                  <option value="Weeding">Weeding / Interculture (निराई-गुड़ाई)</option>
                  <option value="Sowing">Sowing (बुवाई)</option>
                  <option value="Harvesting">Harvesting (कटाई)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  placeholder="e.g. Applied 1st top dressing urea (45kg)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={actDate}
                    onChange={(e) => setActDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Cost / Labor (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={actCost}
                    onChange={(e) => setActCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowActModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EXPENSE MODAL (WITH ACCESSIBLE CLOSE (X) BUTTON & BACKDROP) */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowExpModal(false)} 
          />
          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Record Input Expense
              </h3>
              <button
                type="button"
                onClick={() => setShowExpModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Expense Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                >
                  <option value="Fertilizers">Fertilizers (उर्वरक)</option>
                  <option value="Seeds">Seeds (बीज)</option>
                  <option value="Pesticides">Pesticides (कीटनाशक)</option>
                  <option value="Diesel & Machinery">Diesel & Machinery (डीजल व ट्रैक्टर)</option>
                  <option value="Labor">Labor (मजदूरी)</option>
                  <option value="Electricity & Water">Electricity & Water (बिजली व पानी)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Expense Title</label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="e.g. 2 Bottles of IFFCO Nano Urea"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={expAmount}
                    onChange={(e) => setExpAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExpModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
