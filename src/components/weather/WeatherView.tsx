import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Compass, 
  Thermometer, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UP_DISTRICTS } from '../../data/mockData';

export const WeatherView: React.FC = () => {
  const { weather, isLoadingWeather, refreshWeather, language, activeFarm, activeCrop } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState(activeFarm.district);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distName = e.target.value;
    setSelectedDistrict(distName);
    const found = UP_DISTRICTS.find(d => d.name === distName);
    if (found) {
      refreshWeather(found.lat, found.lng);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP TITLE & LOCATION SELECTOR */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'कृषि मौसम व मौसम पूर्वानुमान' : 'Agricultural Weather & Forecast'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
              {weather.isLive ? 'Open-Meteo Live' : 'Cached Model'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'भारतीय मौसम विभाग (IMD) व ओपन-मीटियो उपग्रह मॉडल आधारित वास्तविक आंकड़े'
              : 'Grounded by WMO-compliant high-resolution agrometeorological models'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            >
              {UP_DISTRICTS.map(d => (
                <option key={d.name} value={d.name}>
                  {language === 'hi' ? d.nameHi : d.name} (UP)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => refreshWeather()}
            disabled={isLoadingWeather}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
            title="Refresh Weather Forecast"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingWeather ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. MAIN CURRENT WEATHER HERO CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hero Card */}
        <div className="lg:col-span-8 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                  {selectedDistrict}, Uttar Pradesh
                </span>
                <p className="text-xs text-emerald-100/70 mt-0.5 font-medium">
                  {language === 'hi' ? 'अंतिम अपडेट:' : 'Observation Time:'} {weather.current.time}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/15">
                {weather.current.weatherText}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-6">
              <div className="text-5xl sm:text-7xl font-extrabold tracking-tight">
                {weather.current.temp}°<span className="text-2xl sm:text-3xl text-emerald-300">C</span>
              </div>
              <div className="space-y-1 text-xs text-emerald-100">
                <p>Feels like: <strong>{weather.current.feelsLike}°C</strong></p>
                <p>Today's Range: <strong>{weather.current.tempMin}°C - {weather.current.tempMax}°C</strong></p>
                <p>Rain Probability: <strong>{weather.current.precipitationProbability}%</strong></p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] text-emerald-200 block">{language === 'hi' ? 'हवा की गति' : 'Wind Speed'}</span>
                <p className="text-lg font-bold mt-0.5">{weather.current.windSpeed} km/h</p>
                <span className="text-[10px] text-emerald-300">Calm to Moderate</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] text-emerald-200 block">{language === 'hi' ? 'आर्द्रता' : 'Humidity'}</span>
                <p className="text-lg font-bold mt-0.5">{weather.current.humidity}%</p>
                <span className="text-[10px] text-emerald-300">Optimal vegetative</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] text-emerald-200 block">{language === 'hi' ? 'मिट्टी तापमान (0cm)' : 'Topsoil Temp'}</span>
                <p className="text-lg font-bold mt-0.5">{weather.current.soilTemp0cm || 21}°C</p>
                <span className="text-[10px] text-emerald-300">Root Active</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] text-emerald-200 block">{language === 'hi' ? 'वर्षा (24h)' : 'Precipitation'}</span>
                <p className="text-lg font-bold mt-0.5">{weather.current.precipitation} mm</p>
                <span className="text-[10px] text-emerald-300">Dry spell</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Agricultural Spray & Risk Card */}
        <div className="lg:col-span-4 space-y-4">
          {/* Spray Feasibility */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                {language === 'hi' ? 'कीटनाशक व खाद छिड़काव सलाह' : 'Spray Feasibility Index'}
              </h4>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                weather.sprayFeasibility.status === 'FAVORABLE'
                  ? 'bg-emerald-100 text-emerald-800'
                  : weather.sprayFeasibility.status === 'MODERATE'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {weather.sprayFeasibility.status}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {language === 'hi' ? weather.sprayFeasibility.reasonHi : weather.sprayFeasibility.reasonEn}
            </p>

            <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 border border-slate-100 space-y-1">
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'सर्वोत्तम छिड़काव समय:' : 'Optimal Hours:'}</span>
                <span className="font-bold text-slate-800">8:00 AM - 11:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'हवा बहाव जोखिम:' : 'Droplet Drift:'}</span>
                <span className="font-bold text-emerald-600">Low (9 km/h)</span>
              </div>
            </div>
          </div>

          {/* Active Warnings */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {language === 'hi' ? 'मौसम आधारित फसल जोखिम' : 'Crop Weather Hazards'}
            </h4>

            {weather.warnings && weather.warnings.length > 0 ? (
              weather.warnings.map(w => (
                <div key={w.id} className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                  <p className="font-bold text-amber-900">
                    {language === 'hi' ? w.titleHi : w.titleEn}
                  </p>
                  <p className="text-[11px] text-amber-800 leading-tight">
                    {language === 'hi' ? w.descriptionHi : w.descriptionEn}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'फसल के लिए कोई गंभीर मौसमी खतरा नहीं है।' : 'No severe meteorological hazards in 72h window.'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. HOURLY FORECAST SLIDER (NEXT 12 HOURS) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{language === 'hi' ? 'आगामी 12 घंटे का प्रति घंटा मौसम व बारिश संभावना' : 'Next 12 Hours Hourly Temperature & Rain Probability'}</span>
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2 overflow-x-auto pb-1">
          {weather.hourly.map((h, i) => (
            <div key={i} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center min-w-[70px]">
              <span className="text-[11px] font-bold text-slate-500 block">{h.time}</span>
              <p className="text-sm font-extrabold text-slate-800 mt-1">{h.temp}°C</p>
              
              {/* Rain prob bar */}
              <div className="mt-2 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${Math.max(5, h.rainProb)}%` }}
                />
              </div>
              <span className="text-[10px] text-blue-600 font-semibold block mt-1">
                {h.rainProb}% Rain
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 5-DAY DAILY AGRICULTURAL OUTLOOK */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">
          {language === 'hi' ? '5 दिवसीय कृषि मौसम दृष्टिकोण (Daily Trend)' : '5-Day Agricultural Weather Outlook'}
        </h3>

        <div className="divide-y divide-slate-100">
          {weather.daily.map((d, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="w-24">
                <p className="font-bold text-slate-800">{d.dayName}</p>
                <p className="text-[10px] text-slate-400">{d.date}</p>
              </div>

              <div className="flex-1 flex items-center gap-3">
                <span className="text-slate-600 font-medium hidden sm:inline w-28 truncate">{d.condition}</span>
                <div className="flex-1 max-w-xs flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">{d.tempMin}°</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-amber-500 rounded-full"
                      style={{ width: `${Math.min(100, (d.tempMax / 35) * 100)}%` }}
                    />
                  </div>
                  <span className="text-slate-800 font-bold text-[11px]">{d.tempMax}°</span>
                </div>
              </div>

              <div className="text-right w-24">
                <span className={`font-semibold ${d.rainProb > 30 ? 'text-blue-600' : 'text-slate-500'}`}>
                  {d.rainProb}% Rain
                </span>
                <span className="text-[10px] text-slate-400 block">{d.precipitationSum} mm</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
