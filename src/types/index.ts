export type Language = 'en' | 'hi';

export interface FarmerProfile {
  id: string;
  clerkUserId: string;
  displayName: string;
  phone?: string;
  email: string;
  state: string;
  district: string;
  preferredLanguage: Language;
  createdAt: string;
  avatarUrl?: string;
}

export interface SoilTestRecord {
  testDate: string;
  nitrogen_kg_ha: number; // e.g. 180 (low/medium/high)
  phosphorus_kg_ha: number; // e.g. 22
  potassium_kg_ha: number; // e.g. 210
  ph: number; // e.g. 7.2
  organicCarbon_percent: number; // e.g. 0.45%
  electricalConductivity_dSm?: number;
  recommendationSummary?: string;
}

export interface Farm {
  id: string;
  ownerId: string;
  farmName: string;
  locationLabel: string;
  state: string;
  district: string;
  village: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  landAreaAcres: number;
  soilType: 'Alluvial (जलोढ़)' | 'Black Cotton (काली मिट्टी)' | 'Sandy Loam (बलुई दोमट)' | 'Clay Loam (मटियार दोमट)' | 'Red Soil (लाल मिट्टी)';
  irrigationMethod: 'Tube-well (नलकूप)' | 'Canal (नहर)' | 'Drip Irrigation (टपक सिंचाई)' | 'Sprinkler (फव्वारा)' | 'Rainfed (वर्षा आधारित)';
  waterAvailability: 'Abundant (प्रचुर)' | 'Moderate (मध्यम)' | 'Scarce (कम)';
  soilTest?: SoilTestRecord;
  createdAt: string;
}

export type CropStage = 
  | 'Pre-Sowing (बुवाई पूर्व)' 
  | 'Sowing & Germination (बुवाई व अंकुरण)' 
  | 'Crown Root Initiation - CRI (ताज जड़ बनना)' 
  | 'Tillering (कल्ले फूटना)' 
  | 'Jointing & Stem Elongation (गांठ बनना)' 
  | 'Booting & Heading (बाली निकलना)' 
  | 'Flowering & Anthesis (फूल आना)' 
  | 'Milk & Dough Stage (दूधिया व दाना भराव)' 
  | 'Maturity & Ripening (पकाव)' 
  | 'Harvesting (कटाई)';

export interface CropCycle {
  id: string;
  ownerId: string;
  farmId: string;
  cropName: string;
  variety: string;
  season: 'Rabi (रबी)' | 'Kharif (खरीफ)' | 'Zaid (जायद)';
  sowingDate: string;
  expectedHarvestDate: string;
  stage: CropStage;
  currentStageDay: number;
  totalDurationDays: number;
  targetYieldQuintalPerAcre: number;
  irrigationEventsCount: number;
  lastIrrigationDate?: string;
  status: 'active' | 'harvested' | 'failed';
}

export interface WeatherCondition {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  precipitationProbability: number;
  weatherCode: number;
  weatherText: string;
  isRain: boolean;
  uvIndex?: number;
  soilTemp0cm?: number;
  soilMoisturePercent?: number;
  time: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rainProb: number;
  precipitation: number;
  weatherCode: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  precipitationSum: number;
  weatherCode: number;
  condition: string;
}

export interface WeatherWarning {
  id: string;
  severity: 'info' | 'warning' | 'severe';
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  validUntil: string;
  source: 'IMD Advisory' | 'Open-Meteo High Wind Alert' | 'Krishi Agrometeorological Advisory';
}

export interface MandiRecord {
  id: string;
  commodity: string;
  commodityHi: string;
  marketName: string;
  district: string;
  state: string;
  minPrice: number; // ₹/quintal
  maxPrice: number;
  modalPrice: number;
  unit: string; // 'Rs/Quintal'
  priceDate: string;
  fetchedAt: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
  trend: 'up' | 'down' | 'stable';
  changePercent?: number;
}

export interface AgriculturalProduct {
  id: string;
  productName: string;
  varietyName: string;
  brand: string;
  category: 'Seeds (बीज)' | 'Fertilizers (उर्वरक)' | 'Soil Amendments (मृदा सुधारक)' | 'Crop Protection (कीट व रोगनाशक)' | 'Tools & Irrigation (उपकरण व सिंचाई)';
  imageUrl: string;
  packageSize: string;
  mrp: number;
  discountedPrice?: number;
  currency: 'INR';
  isCertified: boolean;
  certificationAuthority?: string;
  descriptionEn: string;
  descriptionHi: string;
  agronomicSpecifications: {
    maturityDurationDays: number;
    suitableSoil: string;
    averageYieldQuintalPerAcre: number;
    sowingWindow: string;
    resistanceToDiseases: string[];
    waterRequirement: string;
  };
  sellerUrl?: string;
  availability: 'In Stock' | 'Limited Stock' | 'Seasonal Pre-Booking';
  source: string;
  verifiedAt: string;
}

export interface IrrigationRecommendation {
  id: string;
  farmId: string;
  cropCycleId: string;
  action: 'IRRIGATE_NOW' | 'DELAY_IRRIGATION' | 'MONITOR_RAIN' | 'DRAIN_EXCESS';
  statusLabelEn: string;
  statusLabelHi: string;
  urgency: 'high' | 'medium' | 'low';
  explanationEn: string;
  explanationHi: string;
  supportingData: {
    cropStage: string;
    daysSinceLastIrrigation: number;
    forecastRainNext72h_mm: number;
    soilMoistureEst_percent: number;
    temperature_max_c: number;
  };
  sourceReference: string;
  generatedAt: string;
  isDeterministic: boolean;
}

export interface FarmActivity {
  id: string;
  farmId: string;
  cropCycleId?: string;
  activityType: 'Sowing' | 'Irrigation' | 'Fertilizer Application' | 'Pest Spray' | 'Weeding' | 'Harvesting' | 'Tillage';
  activityDate: string;
  description: string;
  cost: number;
  quantity?: number;
  unit?: string;
  notes?: string;
}

export interface ExpenseRecord {
  id: string;
  farmId: string;
  cropCycleId?: string;
  category: 'Seeds' | 'Fertilizers' | 'Pesticides' | 'Labor' | 'Diesel & Machinery' | 'Electricity & Water' | 'Post-Harvest & Transport' | 'Other';
  title: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface GovernmentScheme {
  id: string;
  titleEn: string;
  titleHi: string;
  department: string;
  benefitEn: string;
  benefitHi: string;
  eligibilityEn: string[];
  eligibilityHi: string[];
  officialPortalUrl: string;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorLocation: string;
  title: string;
  content: string;
  category: 'Crop Disease' | 'Mandi Prices' | 'Fertilizer Query' | 'Organic Farming' | 'Machinery';
  upvotes: number;
  repliesCount: number;
  createdAt: string;
  isVerifiedAgronomistReply?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  intent?: string;
  sources?: string[];
  voiceAudioAvailable?: boolean;
}
