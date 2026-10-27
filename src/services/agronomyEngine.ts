import { Farm, CropCycle, IrrigationRecommendation } from '../types';

export interface FertilizerDose {
  urea_kg: number;
  dap_kg: number;
  mop_potash_kg: number;
  zinc_kg?: number;
  schedule: {
    stage: string;
    stageHi: string;
    urea_kg: number;
    dap_kg: number;
    mop_kg: number;
    notes: string;
  }[];
}

export interface SeedRateResult {
  seedQuantityKg: number;
  spacingCm: string;
  recommendedDepthCm: string;
  seedTreatment: string;
  seedTreatmentHi: string;
}

export interface CropSuitabilityScore {
  cropName: string;
  cropNameHi: string;
  score: number; // 0 to 100
  reasonEn: string;
  reasonHi: string;
  recommendedVarieties: string[];
  expectedYieldQuintalAcre: number;
  estimatedNetProfitPerAcre: number;
}

/**
 * Deterministic Irrigation Decision Support System
 * Based on ICAR & State Agriculture University guidelines for Indo-Gangetic Plains.
 */
export function calculateIrrigationRecommendation(
  farm: Farm,
  crop: CropCycle,
  forecastRainNext72h_mm: number,
  maxTemp: number
): IrrigationRecommendation {
  const daysSinceLastIrrigation = crop.lastIrrigationDate 
    ? Math.max(0, Math.floor((new Date().getTime() - new Date(crop.lastIrrigationDate).getTime()) / (1000 * 3600 * 24)))
    : 20;

  let action: 'IRRIGATE_NOW' | 'DELAY_IRRIGATION' | 'MONITOR_RAIN' | 'DRAIN_EXCESS' = 'DELAY_IRRIGATION';
  let urgency: 'high' | 'medium' | 'low' = 'low';
  let explanationEn = '';
  let explanationHi = '';
  let statusLabelEn = 'Sufficient Moisture';
  let statusLabelHi = 'पर्याप्त नमी';

  // Rule 1: High rainfall expected in next 72 hours
  if (forecastRainNext72h_mm >= 15) {
    action = 'DELAY_IRRIGATION';
    urgency = 'high';
    statusLabelEn = 'Hold Irrigation — Rain Imminent';
    statusLabelHi = 'सिंचाई रोकें — बारिश का अनुमान';
    explanationEn = `Weather forecast indicates ${forecastRainNext72h_mm.toFixed(1)} mm rainfall in the next 72 hours. Irrigating now will lead to waterlogging, root asphyxiation, and leaching of valuable nitrogen fertilizers.`;
    explanationHi = `मौसम पूर्वानुमान के अनुसार अगले 72 घंटों में ${forecastRainNext72h_mm.toFixed(1)} मिमी वर्षा की प्रबल संभावना है। अभी सिंचाई करने से खेत में जलभराव होगा और यूरिया का रिसाव होगा।`;
  }
  // Rule 2: Critical Crown Root Initiation (CRI) stage for Wheat (21-25 days after sowing)
  else if (crop.cropName.toLowerCase().includes('wheat') && crop.stage.includes('CRI')) {
    action = 'IRRIGATE_NOW';
    urgency = 'high';
    statusLabelEn = 'Mandatory CRI Irrigation';
    statusLabelHi = 'अनिवार्य ताज जड़ (CRI) सिंचाई';
    explanationEn = 'Crown Root Initiation (CRI) is the single most critical moisture-sensitive stage in wheat. Delaying irrigation at this point causes permanent tillering reduction and up to 30% yield loss.';
    explanationHi = 'ताज जड़ (CRI) गेहूँ की सबसे संवेदनशील अवस्था है। इस समय सिंचाई में देरी से कल्ले कम फूटते हैं और पैदावार में 25-30% तक की भारी गिरावट आ सकती है।';
  }
  // Rule 3: Flowering / Pod formation stage
  else if (crop.stage.includes('Flowering') || crop.stage.includes('Booting')) {
    if (daysSinceLastIrrigation >= 18) {
      action = 'IRRIGATE_NOW';
      urgency = 'high';
      statusLabelEn = 'Flowering Moisture Vital';
      statusLabelHi = 'फूल आने पर सिंचाई जरूरी';
      explanationEn = `Crop is at flowering/heading stage and ${daysSinceLastIrrigation} days have elapsed since previous watering. Water stress during anthesis causes flower drop and unfilled grain heads.`;
      explanationHi = `फसल में फूल आ रहे हैं और पिछली सिंचाई को ${daysSinceLastIrrigation} दिन बीत चुके हैं। इस समय नमी की कमी से फूल झड़ जाते हैं और दाना हल्का रह जाता है।`;
    } else {
      action = 'DELAY_IRRIGATION';
      urgency = 'low';
      statusLabelEn = 'Adequate Soil Moisture';
      statusLabelHi = 'पर्याप्त नमी उपलब्ध';
      explanationEn = `Last irrigated ${daysSinceLastIrrigation} days ago. Soil moisture remains adequate for active flowering. Re-evaluate in 4 days.`;
      explanationHi = `पिछली सिंचाई ${daysSinceLastIrrigation} दिन पहले की गई थी। मिट्टी में पर्याप्त नमी उपलब्ध है। 4 दिन बाद पुनः निरीक्षण करें।`;
    }
  }
  // Rule 4: General interval based on soil type
  else {
    const thresholdDays = farm.soilType.includes('Sandy') ? 12 : 21;
    if (daysSinceLastIrrigation >= thresholdDays) {
      action = 'IRRIGATE_NOW';
      urgency = 'medium';
      statusLabelEn = 'Irrigation Recommended';
      statusLabelHi = 'हल्की सिंचाई की संस्तुति';
      explanationEn = `Based on ${farm.soilType} water retention capacity and ${daysSinceLastIrrigation} days since last watering, topsoil moisture is depleted. Apply 50-60mm light irrigation.`;
      explanationHi = `${farm.soilType} की जल धारण क्षमता तथा पिछली सिंचाई को ${daysSinceLastIrrigation} दिन होने के कारण उपसतह नमी कम हो गई है। 50-60 मिमी हल्की सिंचाई करें।`;
    } else {
      action = 'DELAY_IRRIGATION';
      urgency = 'low';
      statusLabelEn = 'Moisture Safe';
      statusLabelHi = 'नमी सुरक्षित';
      explanationEn = `Soil conditions are within safe moisture limits. No immediate watering required. Next assessment due in ${thresholdDays - daysSinceLastIrrigation} days.`;
      explanationHi = `खेत में नमी सुरक्षित स्तर पर है। तत्काल पानी की आवश्यकता नहीं है। अगले ${thresholdDays - daysSinceLastIrrigation} दिनों में पुनः समीक्षा होगी।`;
    }
  }

  return {
    id: `irr-rec-${Date.now()}`,
    farmId: farm.id,
    cropCycleId: crop.id,
    action,
    statusLabelEn,
    statusLabelHi,
    urgency,
    explanationEn,
    explanationHi,
    supportingData: {
      cropStage: crop.stage,
      daysSinceLastIrrigation,
      forecastRainNext72h_mm,
      soilMoistureEst_percent: farm.soilType.includes('Sandy') ? 35 : 48,
      temperature_max_c: maxTemp
    },
    sourceReference: 'ICAR Package of Practices & UP Agriculture Directorate Bulletin No. 14',
    generatedAt: new Date().toISOString(),
    isDeterministic: true
  };
}

/**
 * Fertilizer Dosing Calculator based on Soil Test & Crop
 */
export function calculateFertilizerPlan(cropName: string, landAreaAcres: number, soilTest?: Farm['soilTest']): FertilizerDose {
  // Standard recommended dose for Wheat in UP: 120:60:40 kg/ha N:P:K (1 ha = 2.47 acres)
  // Per acre: ~48 kg N, 24 kg P2O5, 16 kg K2O
  let factor = 1.0;
  if (soilTest) {
    if (soilTest.nitrogen_kg_ha < 200) factor *= 1.15; // Low N, boost 15%
    if (soilTest.nitrogen_kg_ha > 350) factor *= 0.85; // High N, reduce 15%
  }

  const dapPerAcre = Math.round(52 * factor); // provides ~24kg P2O5 and 9kg N
  const totalUreaPerAcre = Math.round((48 - 9) * 2.17 * factor); // ~85 kg urea
  const mopPerAcre = Math.round(27 * factor); // ~16kg K2O

  const totalDap = dapPerAcre * landAreaAcres;
  const totalUrea = totalUreaPerAcre * landAreaAcres;
  const totalMop = mopPerAcre * landAreaAcres;

  return {
    urea_kg: Math.round(totalUrea),
    dap_kg: Math.round(totalDap),
    mop_potash_kg: Math.round(totalMop),
    zinc_kg: Math.round(10 * landAreaAcres), // 10 kg zinc sulphate 21% or 5 kg 33%
    schedule: [
      {
        stage: 'Basal Dressing (At Sowing)',
        stageHi: 'बुवाई के समय (आधार खाद)',
        dap_kg: Math.round(totalDap),
        urea_kg: Math.round(totalUrea * 0.33),
        mop_kg: Math.round(totalMop),
        notes: 'Drill DAP, Potash and 1/3rd Urea 5cm below seed furrow.'
      },
      {
        stage: 'First Top Dressing (CRI Stage / 21-25 DAS)',
        stageHi: 'पहला छिड़काव (CRI अवस्था / 21-25 दिन)',
        dap_kg: 0,
        urea_kg: Math.round(totalUrea * 0.33),
        mop_kg: 0,
        notes: 'Broadcast after 1st irrigation when soil comes in workable condition.'
      },
      {
        stage: 'Second Top Dressing (Jointing Stage / 45-50 DAS)',
        stageHi: 'दूसरा छिड़काव (गांठ बनने पर / 45-50 दिन)',
        dap_kg: 0,
        urea_kg: Math.round(totalUrea * 0.34),
        mop_kg: 0,
        notes: 'Final nitrogen dose before boot stage. Alternative: use 500ml IFFCO Nano Urea foliar spray.'
      }
    ]
  };
}

/**
 * Seed Rate & Sowing Calculation
 */
export function calculateSeedRate(cropName: string, landAreaAcres: number): SeedRateResult {
  const isWheat = cropName.toLowerCase().includes('wheat');
  const isMustard = cropName.toLowerCase().includes('mustard');

  if (isMustard) {
    return {
      seedQuantityKg: Number((1.8 * landAreaAcres).toFixed(1)),
      spacingCm: 'Row-to-row 30-45 cm, plant-to-plant 10-15 cm',
      recommendedDepthCm: '2.5 to 3.0 cm',
      seedTreatment: 'Treat with Trichoderma viride @ 6g/kg seed or Carbendazim @ 2g/kg against damping-off.',
      seedTreatmentHi: 'ट्राइकोडर्मा विरिडी 6 ग्राम प्रति किग्रा बीज अथवा कार्बेन्डाजिम 2 ग्राम प्रति किग्रा से बीजोपचार करें।'
    };
  }

  // Default Wheat
  return {
    seedQuantityKg: Math.round(40 * landAreaAcres), // 100 kg/ha = 40 kg/acre
    spacingCm: 'Row spacing 20-22.5 cm using Seed Drill',
    recommendedDepthCm: '4.0 to 5.0 cm (Moist soil layer)',
    seedTreatment: 'Treat with Carboxin + Thiram (Vitavax Power) @ 2.5g/kg seed against loose smut.',
    seedTreatmentHi: 'विटावैक्स पावर (कार्बोक्सिन + थीरम) 2.5 ग्राम प्रति किग्रा बीज से बीजोपचार अवश्य करें।'
  };
}

/**
 * Crop Suitability Recommendation Engine
 */
export function evaluateCropSuitability(farm: Farm, season: 'Rabi' | 'Kharif' | 'Zaid'): CropSuitabilityScore[] {
  if (season === 'Rabi') {
    return [
      {
        cropName: 'Wheat (गेहूँ)',
        cropNameHi: 'गेहूँ',
        score: farm.soilType.includes('Alluvial') ? 96 : 88,
        reasonEn: 'Optimal climate, fertile Gangetic alluvial soil, and assured tube-well irrigation support maximum yield.',
        reasonHi: 'जलोढ़ दोमट मिट्टी और नलकूप सिंचाई की उपलब्धता के कारण सर्वोत्तम उत्पादन की संभावना।',
        recommendedVarieties: ['HD-2967', 'DBW-187 (Karan Vandana)', 'PBW-502', 'HD-3086'],
        expectedYieldQuintalAcre: 22,
        estimatedNetProfitPerAcre: 32000
      },
      {
        cropName: 'Yellow Mustard (सरसों)',
        cropNameHi: 'सरसों',
        score: farm.soilType.includes('Sandy') ? 94 : 85,
        reasonEn: 'Low water requirement (only 2 irrigations), excellent market prices in UP mandis (₹5,600/qtl), fits sandy loam well.',
        reasonHi: 'कम पानी की जरूरत (मात्र 2 सिंचाई), मंडियों में ऊंचे भाव (₹5,600/क्विंटल) और कम लागत।',
        recommendedVarieties: ['Pusa Bold', 'Varuna (T-59)', 'NRCHB-101'],
        expectedYieldQuintalAcre: 9,
        estimatedNetProfitPerAcre: 36000
      },
      {
        cropName: 'Potato (आलू)',
        cropNameHi: 'आलू',
        score: farm.soilType.includes('Sandy') ? 92 : 78,
        reasonEn: 'High cash crop potential. Thrives in friable well-drained soils with frequent light irrigation.',
        reasonHi: 'उचित जल निकासी वाली भुरभुरी बलुई दोमट मिट्टी में उच्च लाभ देने वाली नकदी फसल।',
        recommendedVarieties: ['Kufri Bahar (3797)', 'Kufri Khyati', 'Kufri Pukhraj'],
        expectedYieldQuintalAcre: 110,
        estimatedNetProfitPerAcre: 48000
      }
    ];
  } else {
    return [
      {
        cropName: 'Paddy / Rice (धान)',
        cropNameHi: 'धान',
        score: farm.waterAvailability === 'Abundant (प्रचुर)' ? 95 : 72,
        reasonEn: 'High rainfall and heavy clay/alluvial soil provide ideal puddling condition.',
        reasonHi: 'प्रचुर जल उपलब्धता और जलोढ़ मिट्टी धान के लिए सर्वोत्तम है।',
        recommendedVarieties: ['PR-126', 'Pusa Basmati 1509', 'Sarjoo-52'],
        expectedYieldQuintalAcre: 26,
        estimatedNetProfitPerAcre: 28000
      },
      {
        cropName: 'Sugarcane (गन्ना)',
        cropNameHi: 'गन्ना',
        score: 89,
        reasonEn: 'Steady cash crop with local sugar mills procurement network across UP.',
        reasonHi: 'स्थानीय चीनी मिलों की खरीद गारंटी के साथ सुरक्षित नकदी फसल।',
        recommendedVarieties: ['Co-0238', 'Co-0118', 'Co-15023'],
        expectedYieldQuintalAcre: 380,
        estimatedNetProfitPerAcre: 62000
      }
    ];
  }
}
