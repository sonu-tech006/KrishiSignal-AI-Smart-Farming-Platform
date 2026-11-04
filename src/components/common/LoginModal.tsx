import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  Sprout, 
  Check, 
  Phone, 
  Lock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_FARMERS } from '../../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAs, user, isAuthenticated, setCurrentTab } = useApp();
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>(DEMO_FARMERS[0].id);
  const [phoneNumber, setPhoneNumber] = useState('9839012345');
  const [otp, setOtp] = useState('1234');
  const [activeMode, setActiveMode] = useState<'demo' | 'otp'>('demo');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = (farmerId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      loginAs(farmerId);
      setIsLoading(false);
      setSuccessMsg(true);
      setTimeout(() => {
        onClose();
        setCurrentTab('dashboard');
      }, 500);
    }, 400);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAs(selectedFarmerId);
      setIsLoading(false);
      setSuccessMsg(true);
      setTimeout(() => {
        onClose();
        setCurrentTab('dashboard');
      }, 500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95">
        {/* Top Header with Close Button */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Farmer Sign In</h3>
              <p className="text-xs text-emerald-100">KrishiSignal Agricultural Portal</p>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Access real-time Mandi rates, smart irrigation schedules, and weather telemetry.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-slate-100 p-2 gap-2 bg-slate-50">
          <button
            onClick={() => setActiveMode('demo')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'demo'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Instant Profiles (Demo)
          </button>
          <button
            onClick={() => setActiveMode('otp')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'otp'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Kisan Mobile OTP
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {successMsg ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-slate-800">Successfully Logged In!</p>
              <p className="text-xs text-slate-500">Redirecting to your farm dashboard...</p>
            </div>
          ) : activeMode === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">
                Choose a pre-configured verified farmer account with real field telemetry:
              </p>

              {DEMO_FARMERS.map((farmer) => {
                const isCurrent = isAuthenticated && user.id === farmer.id;
                return (
                  <div
                    key={farmer.id}
                    onClick={() => handleDemoLogin(farmer.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={farmer.avatarUrl}
                        alt={farmer.displayName}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-slate-900">{farmer.displayName}</p>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-200 text-emerald-900">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">{farmer.district}, Uttar Pradesh</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm">
                      {isCurrent ? 'Continue' : 'Switch'}
                    </button>
                  </div>
                );
              })}

              <div className="pt-2 text-center">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Secured with Clerk & Encrypted Sessions
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (मोबाइल नंबर)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile"
                    className="w-full pl-12 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    4-Digit OTP (ओटीपी)
                  </label>
                  <span className="text-[10px] text-emerald-600 font-semibold cursor-pointer">
                    Resend OTP
                  </span>
                </div>
                <input
                  type="password"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Demo OTP: 1234"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs tracking-widest text-center font-bold focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <span>Verify & Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Need assistance?</span>
          <a href="tel:18001801551" className="text-emerald-700 font-bold hover:underline">
            Toll-Free: 1800-180-1551
          </a>
        </div>
      </div>
    </div>
  );
};
