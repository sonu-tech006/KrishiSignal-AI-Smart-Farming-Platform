import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import { MapPin, Navigation, Layers, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_MANDI_DATA } from '../../data/mockData';

export const FarmMapView: React.FC = () => {
  const { activeFarm, farms, language } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [filterLayer, setFilterLayer] = useState<'all' | 'farms' | 'mandis' | 'kvk'>('all');
  const [selectedPinInfo, setSelectedPinInfo] = useState<{
    title: string;
    type: string;
    details: string;
    lat: number;
    lng: number;
  } | null>({
    title: activeFarm.farmName,
    type: 'Farmer Field',
    details: `${activeFarm.district} • ${activeFarm.landAreaAcres} Acres • ${activeFarm.soilType}`,
    lat: activeFarm.coordinates.lat,
    lng: activeFarm.coordinates.lng
  });

  // KVK Centers in UP
  const KVK_CENTERS = [
    { name: 'KVK Kalyanpur (CSAU)', district: 'Kanpur Nagar', lat: 26.5050, lng: 80.2450, service: 'Soil Testing & Seed distribution' },
    { name: 'KVK Barabanki', district: 'Barabanki', lat: 26.9350, lng: 81.2050, service: 'Crop advisory & Kisan Mela' },
    { name: 'KVK Varanasi (BHU)', district: 'Varanasi', lat: 25.2670, lng: 82.9910, service: 'Vegetable & Pulse research' }
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create map centered on active farm
    const map = L.map(mapContainerRef.current, {
      center: [activeFarm.coordinates.lat, activeFarm.coordinates.lng],
      zoom: 11,
      zoomControl: true
    });
    mapInstanceRef.current = map;

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    // Custom Icon Creators
    const createCustomIcon = (bgColor: string, text: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color: ${bgColor}; color: white; padding: 4px 8px; border-radius: 9999px; font-weight: bold; font-size: 11px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); border: 2px solid white; display: flex; align-items: center; gap: 4px; white-space: nowrap;">
          <span>${text}</span>
        </div>`,
        iconSize: [80, 28],
        iconAnchor: [40, 14]
      });
    };

    // 1. Plot Farms
    if (filterLayer === 'all' || filterLayer === 'farms') {
      farms.forEach((f) => {
        const marker = L.marker([f.coordinates.lat, f.coordinates.lng], {
          icon: createCustomIcon('#059669', `🌾 ${f.farmName.split('—')[0]}`)
        }).addTo(map);

        marker.on('click', () => {
          setSelectedPinInfo({
            title: f.farmName,
            type: 'Farmer Registered Field',
            details: `${f.village}, ${f.district} (${f.landAreaAcres} Acres, ${f.irrigationMethod})`,
            lat: f.coordinates.lat,
            lng: f.coordinates.lng
          });
        });
      });
    }

    // 2. Plot Mandis
    if (filterLayer === 'all' || filterLayer === 'mandis') {
      VERIFIED_MANDI_DATA.forEach((m) => {
        const marker = L.marker([m.coordinates.lat, m.coordinates.lng], {
          icon: createCustomIcon('#0284c7', `🏪 ${m.marketName.split(' ')[0]} ₹${m.modalPrice}`)
        }).addTo(map);

        marker.on('click', () => {
          setSelectedPinInfo({
            title: m.marketName,
            type: 'APMC Authorized Mandi',
            details: `${m.commodity}: Modal ₹${m.modalPrice}/Qtl (Range: ₹${m.minPrice} - ₹${m.maxPrice})`,
            lat: m.coordinates.lat,
            lng: m.coordinates.lng
          });
        });
      });
    }

    // 3. Plot KVKs
    if (filterLayer === 'all' || filterLayer === 'kvk') {
      KVK_CENTERS.forEach((k) => {
        const marker = L.marker([k.lat, k.lng], {
          icon: createCustomIcon('#d97706', `🔬 ${k.name.split(' ')[0]}`)
        }).addTo(map);

        marker.on('click', () => {
          setSelectedPinInfo({
            title: k.name,
            type: 'Krishi Vigyan Kendra (KVK)',
            details: `${k.service} • ${k.district}`,
            lat: k.lat,
            lng: k.lng
          });
        });
      });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [filterLayer, activeFarm.id]);

  const recenterOnFarm = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([activeFarm.coordinates.lat, activeFarm.coordinates.lng], 12);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP TITLE */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'खेत, नजदीकी मंडी व कृषि विज्ञान केंद्र (KVK) नक्शा' : 'Geospatial Field, Mandis & KVK Map'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              OpenStreetMap Leaflet
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'खेत की भौगोलिक स्थिति, नजदीकी मंडियों की दूरी और कृषि सहायता केंद्रों का स्पष्ट दृश्य'
              : 'Interactive GIS spatial view of your farm plots, neighboring APMC markets, and ICAR KVKs'}
          </p>
        </div>

        {/* Filter Layer Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setFilterLayer('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterLayer === 'all' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            {language === 'hi' ? 'सभी पिन' : 'All Pins'}
          </button>
          <button
            onClick={() => setFilterLayer('farms')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterLayer === 'farms' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            {language === 'hi' ? 'खेत (Farms)' : 'Farms'}
          </button>
          <button
            onClick={() => setFilterLayer('mandis')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterLayer === 'mandis' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            {language === 'hi' ? 'मंडियां (Mandis)' : 'Mandis'}
          </button>
          <button
            onClick={() => setFilterLayer('kvk')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterLayer === 'kvk' ? 'bg-white text-emerald-900 shadow-sm font-bold' : 'text-slate-600'
            }`}
          >
            {language === 'hi' ? 'केवीके (KVK)' : 'KVK Labs'}
          </button>
        </div>
      </div>

      {/* 2. MAP CONTAINER */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
        <div ref={mapContainerRef} className="w-full h-[480px] sm:h-[550px] z-10" />

        {/* Floating Recenter Button */}
        <button
          onClick={recenterOnFarm}
          className="absolute bottom-5 right-5 z-20 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-800 text-xs font-bold shadow-lg border border-slate-200 flex items-center gap-1.5 backdrop-blur-md transition-all"
        >
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span>{language === 'hi' ? 'मेरे खेत पर जाएं' : 'Recenter Farm'}</span>
        </button>

        {/* Floating Selected Pin Info Card */}
        {selectedPinInfo && (
          <div className="absolute top-4 left-4 z-20 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 text-xs animate-in fade-in">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              {selectedPinInfo.type}
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedPinInfo.title}</h4>
            <p className="text-slate-600 mt-1">{selectedPinInfo.details}</p>
            <span className="text-[10px] text-slate-400 block mt-2">
              GPS: {selectedPinInfo.lat.toFixed(4)}°N, {selectedPinInfo.lng.toFixed(4)}°E
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
