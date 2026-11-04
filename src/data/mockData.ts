import { Farm, CropCycle, MandiRecord, AgriculturalProduct, GovernmentScheme, CommunityPost, FarmerProfile } from '../types';

export const UP_DISTRICTS: { name: string; nameHi: string; lat: number; lng: number }[] = [
  { name: 'Kanpur Nagar', nameHi: 'कानपुर नगर', lat: 26.4499, lng: 80.3319 },
  { name: 'Lucknow', nameHi: 'लखनऊ', lat: 26.8467, lng: 80.9462 },
  { name: 'Varanasi', nameHi: 'वाराणसी', lat: 25.3176, lng: 82.9739 },
  { name: 'Prayagraj', nameHi: 'प्रयागराज', lat: 25.4358, lng: 81.8463 },
  { name: 'Barabanki', nameHi: 'बाराबंकी', lat: 26.9275, lng: 81.1844 },
  { name: 'Meerut', nameHi: 'मेरठ', lat: 28.9845, lng: 77.7064 },
  { name: 'Bareilly', nameHi: 'बरेली', lat: 28.3670, lng: 79.4304 },
  { name: 'Gorakhpur', nameHi: 'गोरखपुर', lat: 26.7606, lng: 83.3732 },
  { name: 'Aligarh', nameHi: 'अलीगढ़', lat: 27.8974, lng: 78.0880 },
  { name: 'Mathura', nameHi: 'मथुरा', lat: 27.4924, lng: 77.6737 },
  { name: 'Ayodhya', nameHi: 'अयोध्या', lat: 26.7922, lng: 82.1998 },
  { name: 'Jhansi', nameHi: 'झांसी', lat: 25.4484, lng: 78.5685 }
];

export const DEMO_FARMERS: FarmerProfile[] = [
  {
    id: 'farmer-1',
    clerkUserId: 'user_2xyz_ramesh',
    displayName: 'Ramesh Kumar',
    email: 'ramesh.farmer@krishisignal.in',
    phone: '+91 98390 12345',
    state: 'Uttar Pradesh',
    district: 'Kanpur Nagar',
    preferredLanguage: 'en',
    createdAt: '2024-03-15T00:00:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'farmer-2',
    clerkUserId: 'user_3abc_sunita',
    displayName: 'Sunita Devi',
    email: 'sunita.devi@krishisignal.in',
    phone: '+91 94150 98765',
    state: 'Uttar Pradesh',
    district: 'Barabanki',
    preferredLanguage: 'en',
    createdAt: '2024-05-10T00:00:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
  }
];

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-1',
    ownerId: 'farmer-1',
    farmName: 'Ganga Khet — Kalyanpur',
    locationLabel: 'Kalyanpur, Kanpur Nagar, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Kanpur Nagar',
    village: 'Kalyanpur Khurd',
    coordinates: {
      lat: 26.4950,
      lng: 80.2680
    },
    landAreaAcres: 4.5,
    soilType: 'Alluvial (जलोढ़)',
    irrigationMethod: 'Tube-well (नलकूप)',
    waterAvailability: 'Abundant (प्रचुर)',
    soilTest: {
      testDate: '2024-09-12',
      nitrogen_kg_ha: 195, // Medium-Low
      phosphorus_kg_ha: 24, // Medium
      potassium_kg_ha: 260, // Adequate
      ph: 7.3, // Slightly alkaline, ideal for wheat
      organicCarbon_percent: 0.52,
      electricalConductivity_dSm: 0.38,
      recommendationSummary: 'Apply 120 kg N, 60 kg P2O5, 40 kg K2O per hectare for high yield wheat. Split urea in 3 doses.'
    },
    createdAt: '2024-04-01T00:00:00Z'
  },
  {
    id: 'farm-2',
    ownerId: 'farmer-1',
    farmName: 'Purwa Bagicha — Bithoor',
    locationLabel: 'Bithoor, Kanpur Nagar, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Kanpur Nagar',
    village: 'Bithoor Dehat',
    coordinates: {
      lat: 26.6180,
      lng: 80.2740
    },
    landAreaAcres: 2.8,
    soilType: 'Sandy Loam (बलुई दोमट)',
    irrigationMethod: 'Drip Irrigation (टपक सिंचाई)',
    waterAvailability: 'Moderate (मध्यम)',
    soilTest: {
      testDate: '2024-08-05',
      nitrogen_kg_ha: 160,
      phosphorus_kg_ha: 18,
      potassium_kg_ha: 210,
      ph: 6.9,
      organicCarbon_percent: 0.44,
      electricalConductivity_dSm: 0.25,
      recommendationSummary: 'Drip fertigation recommended. Add compost or FYM to improve moisture holding capacity.'
    },
    createdAt: '2024-06-15T00:00:00Z'
  }
];

export const INITIAL_CROPS: CropCycle[] = [
  {
    id: 'crop-1',
    ownerId: 'farmer-1',
    farmId: 'farm-1',
    cropName: 'Wheat (गेहूँ)',
    variety: 'HD-2967 (Pusa Yashasvi)',
    season: 'Rabi (रबी)',
    sowingDate: '2024-11-10',
    expectedHarvestDate: '2025-04-05',
    stage: 'Tillering (कल्ले फूटना)',
    currentStageDay: 42,
    totalDurationDays: 140,
    targetYieldQuintalPerAcre: 22,
    irrigationEventsCount: 2,
    lastIrrigationDate: '2024-12-05',
    status: 'active'
  },
  {
    id: 'crop-2',
    ownerId: 'farmer-1',
    farmId: 'farm-2',
    cropName: 'Mustard (सरसों)',
    variety: 'Pusa Bold (पूसा बोल्ड)',
    season: 'Rabi (रबी)',
    sowingDate: '2024-10-25',
    expectedHarvestDate: '2025-02-28',
    stage: 'Flowering & Anthesis (फूल आना)',
    currentStageDay: 58,
    totalDurationDays: 125,
    targetYieldQuintalPerAcre: 9,
    irrigationEventsCount: 1,
    lastIrrigationDate: '2024-11-28',
    status: 'active'
  }
];

export const VERIFIED_MANDI_DATA: MandiRecord[] = [
  {
    id: 'mandi-kanpur-wheat',
    commodity: 'Wheat (गेहूँ)',
    commodityHi: 'गेहूँ (Wheat)',
    marketName: 'Kanpur Mandi (नौबस्ता मंडी)',
    district: 'Kanpur Nagar',
    state: 'Uttar Pradesh',
    minPrice: 2275,
    maxPrice: 2460,
    modalPrice: 2380,
    unit: '₹/Quintal',
    priceDate: '2024-12-24',
    fetchedAt: '2024-12-24T06:30:00Z',
    coordinates: { lat: 26.4150, lng: 80.3380 },
    distanceKm: 8.5,
    trend: 'up',
    changePercent: +2.4
  },
  {
    id: 'mandi-kanpur-mustard',
    commodity: 'Mustard (सरसों)',
    commodityHi: 'सरसों (Mustard)',
    marketName: 'Kanpur Mandi (नौबस्ता मंडी)',
    district: 'Kanpur Nagar',
    state: 'Uttar Pradesh',
    minPrice: 5350,
    maxPrice: 5820,
    modalPrice: 5650,
    unit: '₹/Quintal',
    priceDate: '2024-12-24',
    fetchedAt: '2024-12-24T06:30:00Z',
    coordinates: { lat: 26.4150, lng: 80.3380 },
    distanceKm: 8.5,
    trend: 'stable',
    changePercent: +0.2
  },
  {
    id: 'mandi-lucknow-wheat',
    commodity: 'Wheat (गेहूँ)',
    commodityHi: 'गेहूँ (Wheat)',
    marketName: 'Lucknow Dubagga Mandi (दुबग्गा मंडी)',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    minPrice: 2290,
    maxPrice: 2485,
    modalPrice: 2410,
    unit: '₹/Quintal',
    priceDate: '2024-12-24',
    fetchedAt: '2024-12-24T06:45:00Z',
    coordinates: { lat: 26.8680, lng: 80.8710 },
    distanceKm: 78.0,
    trend: 'up',
    changePercent: +1.8
  },
  {
    id: 'mandi-barabanki-potato',
    commodity: 'Potato (आलू)',
    commodityHi: 'आलू (Potato)',
    marketName: 'Barabanki Mandi (नवीन मंडी बाराबंकी)',
    district: 'Barabanki',
    state: 'Uttar Pradesh',
    minPrice: 1100,
    maxPrice: 1450,
    modalPrice: 1280,
    unit: '₹/Quintal',
    priceDate: '2024-12-24',
    fetchedAt: '2024-12-24T07:10:00Z',
    coordinates: { lat: 26.9180, lng: 81.1920 },
    distanceKm: 105.0,
    trend: 'down',
    changePercent: -3.5
  },
  {
    id: 'mandi-varanasi-paddy',
    commodity: 'Paddy / Dhan (धान)',
    commodityHi: 'धान (Paddy Common)',
    marketName: 'Varanasi Pahariya Mandi (पहाड़िया मंडी)',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    minPrice: 2183, // MSP reference ₹2183
    maxPrice: 2350,
    modalPrice: 2260,
    unit: '₹/Quintal',
    priceDate: '2024-12-24',
    fetchedAt: '2024-12-24T07:00:00Z',
    coordinates: { lat: 25.3520, lng: 82.9980 },
    distanceKm: 310.0,
    trend: 'stable',
    changePercent: 0
  },
  {
    id: 'mandi-meerut-sugarcane',
    commodity: 'Sugarcane (गन्ना)',
    commodityHi: 'गन्ना (Sugarcane SAP)',
    marketName: 'Meerut Partapur (परतापुर मंडी)',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    minPrice: 370,
    maxPrice: 380,
    modalPrice: 375,
    unit: '₹/Quintal',
    priceDate: '2024-12-24',
    fetchedAt: '2024-12-24T08:00:00Z',
    coordinates: { lat: 28.9300, lng: 77.6350 },
    distanceKm: 420.0,
    trend: 'up',
    changePercent: +4.0
  }
];

export const AGRICULTURAL_PRODUCTS_CATALOG: AgriculturalProduct[] = [
  {
    id: 'prod-wheat-hd2967',
    productName: 'Certified Wheat Seed HD-2967',
    varietyName: 'HD-2967 (Pusa Yashasvi)',
    brand: 'National Seeds Corporation (NSC)',
    category: 'Seeds (बीज)',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    packageSize: '40 kg bag',
    mrp: 1650,
    discountedPrice: 1520,
    currency: 'INR',
    isCertified: true,
    certificationAuthority: 'UP State Seed Certification Agency (UPSSCA)',
    descriptionEn: 'High yielding semi-dwarf wheat variety notified by ICAR. Resistant to yellow rust and lodging. Ideal for timely sown irrigated conditions in the North-Western and North-Eastern Plains Zones.',
    descriptionHi: 'भारतीय कृषि अनुसंधान परिषद (ICAR) द्वारा अनुशंसित उच्च पैदावार वाली किस्म। पीला रतुआ (Yellow Rust) के प्रति सहनशील। उत्तर प्रदेश के सिंचित क्षेत्रों में समय पर बुवाई के लिए सर्वोत्तम।',
    agronomicSpecifications: {
      maturityDurationDays: 140,
      suitableSoil: 'Alluvial and Clay Loam soils',
      averageYieldQuintalPerAcre: 21.5,
      sowingWindow: '10 November - 25 November',
      resistanceToDiseases: ['Yellow Rust', 'Brown Rust', 'Powdery Mildew'],
      waterRequirement: '4 to 5 irrigations (CRI, Tillering, Jointing, Flowering, Milk)'
    },
    sellerUrl: 'https://indiaseeds.com',
    availability: 'In Stock',
    source: 'National Seeds Corporation Portal / ICAR Gazette',
    verifiedAt: '2024-11-01'
  },
  {
    id: 'prod-wheat-dbw187',
    productName: 'DBW-187 (Karan Vandana) Certified Wheat',
    varietyName: 'DBW-187 (Karan Vandana)',
    brand: 'ICAR-IIWBR / Tarai Seeds',
    category: 'Seeds (बीज)',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    packageSize: '40 kg bag',
    mrp: 1800,
    discountedPrice: 1640,
    currency: 'INR',
    isCertified: true,
    certificationAuthority: 'ICAR-Indian Institute of Wheat & Barley Research',
    descriptionEn: 'Notified bio-fortified variety rich in iron (43.1 ppm) and protein. Excellent heat tolerance during terminal grain-filling stage with exceptional chapati-making quality.',
    descriptionHi: 'आयरन और प्रोटीन से भरपूर जैव-सुदृढ़ किस्म। मार्च की शुरुआती गर्मी को सहने की विशेष क्षमता। पूर्वी व मध्य उत्तर प्रदेश के लिए अत्यंत उपयुक्त।',
    agronomicSpecifications: {
      maturityDurationDays: 135,
      suitableSoil: 'Loamy to Sandy Loam',
      averageYieldQuintalPerAcre: 24.0,
      sowingWindow: '05 November - 20 November',
      resistanceToDiseases: ['Wheat Blast resistant', 'Stripe Rust tolerance', 'Karnal Bunt tolerant'],
      waterRequirement: '4 irrigations'
    },
    sellerUrl: 'https://iiwbr.icar.gov.in',
    availability: 'In Stock',
    source: 'ICAR-IIWBR Karnal Variety Notification 2019',
    verifiedAt: '2024-10-15'
  },
  {
    id: 'prod-fertilizer-nanourea',
    productName: 'IFFCO Nano Urea (Liquid) 500ml',
    varietyName: 'IFFCO Nano Nitrogen 4% w/v',
    brand: 'IFFCO',
    category: 'Fertilizers (उर्वरक)',
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
    packageSize: '500 ml bottle (Equivalent to 1 bag 45kg urea)',
    mrp: 225,
    discountedPrice: 225,
    currency: 'INR',
    isCertified: true,
    certificationAuthority: 'Fertilizer Control Order (FCO) 1985 Approval',
    descriptionEn: 'Nanotechnology-based foliar spray providing targeted nitrogen to plants. Increases nutrient use efficiency up to 80%, reducing soil pollution and input costs.',
    descriptionHi: 'इफ्को द्वारा विकसित नैनो यूरिया। 500 मिलीलीटर की एक बोतल सामान्य 45 किग्रा यूरिया की बोरी के बराबर काम करती है। छिड़काव के बाद सीधे पत्तियों द्वारा अवशोषित।',
    agronomicSpecifications: {
      maturityDurationDays: 0,
      suitableSoil: 'All soils (Foliar Application)',
      averageYieldQuintalPerAcre: 0,
      sowingWindow: 'CRI Stage (30-35 DAS) & Pre-Flowering (60 DAS)',
      resistanceToDiseases: ['Reduces vegetative pest vulnerability caused by excess granular urea'],
      waterRequirement: '2 to 4 ml per litre of clean water'
    },
    sellerUrl: 'https://www.iffcobazar.in',
    availability: 'In Stock',
    source: 'IFFCO Official Catalog',
    verifiedAt: '2024-11-20'
  },
  {
    id: 'prod-fertilizer-dap',
    productName: 'IFFCO Di-Ammonium Phosphate (DAP 18:46:0)',
    varietyName: 'Phosphatic Fertilizer 18% N, 46% P2O5',
    brand: 'IFFCO / KRIBHCO',
    category: 'Fertilizers (उर्वरक)',
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
    packageSize: '50 kg bag',
    mrp: 1350,
    discountedPrice: 1350,
    currency: 'INR',
    isCertified: true,
    certificationAuthority: 'Govt. of India Subsidized MRP',
    descriptionEn: 'Standard basal fertilizer providing critical phosphorus for root proliferation and early vigor. Mandatory basal dressing at the time of sowing.',
    descriptionHi: 'बुवाई के समय प्रयोग किया जाने वाला प्राथमिक उर्वरक। जड़ों के फैलाव और शुरुआती कल्ले फूटने के लिए अनिवार्य फॉस्फोरस प्रदान करता है।',
    agronomicSpecifications: {
      maturityDurationDays: 0,
      suitableSoil: 'All Indian agricultural soils',
      averageYieldQuintalPerAcre: 0,
      sowingWindow: 'Basal application at sowing',
      resistanceToDiseases: [],
      waterRequirement: 'Apply with seed-cum-fertilizer drill 5cm below seed'
    },
    sellerUrl: 'https://kisan.gov.in',
    availability: 'In Stock',
    source: 'Department of Fertilizers, Ministry of Chemicals & Fertilizers',
    verifiedAt: '2024-11-05'
  },
  {
    id: 'prod-irrigation-dripkit',
    productName: 'Jain Solar-Powered Precision Drip Irrigation Kit (1 Acre)',
    varietyName: 'Inline Pressure Compensating (PC) Drip System',
    brand: 'Jain Irrigation Systems Ltd.',
    category: 'Tools & Irrigation (उपकरण व सिंचाई)',
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80',
    packageSize: 'Complete 1 Acre Package (Main line, submain, 16mm dripline with 40cm emitter spacing)',
    mrp: 32000,
    discountedPrice: 12800, // 60% UP govt subsidy under PMKSY
    currency: 'INR',
    isCertified: true,
    certificationAuthority: 'BIS Certification IS 13488 & PMKSY empanelled',
    descriptionEn: 'Saves 50-70% water compared to flood irrigation. Qualifies for up to 60% subsidy for small and marginal farmers in Uttar Pradesh under PM Krishi Sinchayee Yojana (PMKSY).',
    descriptionHi: 'परंपरागत खुले पानी की तुलना में 60-70% पानी की बचत। उत्तर प्रदेश में पीएमकेएसवाई (PMKSY) के तहत लघु एवं सीमांत किसानों को 60% तक का अनुदान उपलब्ध।',
    agronomicSpecifications: {
      maturityDurationDays: 0,
      suitableSoil: 'All soils, highly beneficial for undulating and sandy soils',
      averageYieldQuintalPerAcre: 0,
      sowingWindow: 'All seasons',
      resistanceToDiseases: ['Drastically curtails fungal root rot by preventing waterlogging'],
      waterRequirement: 'Low discharge 2.0 LPH emitters'
    },
    sellerUrl: 'https://jains.com',
    availability: 'In Stock',
    source: 'UP Department of Horticulture & Food Processing Subsidy Portal',
    verifiedAt: '2024-10-01'
  }
];

export const GOVERNMENT_SCHEMES_DATA: GovernmentScheme[] = [
  {
    id: 'scheme-pm-kisan',
    titleEn: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    titleHi: 'प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN)',
    department: 'Ministry of Agriculture and Farmers Welfare, Govt of India',
    benefitEn: 'Direct income support of ₹6,000 per year in three equal instalments of ₹2,000 directly transferred into Aadhaar-seeded bank accounts.',
    benefitHi: 'प्रति वर्ष ₹6,000 की प्रत्यक्ष आर्थिक सहायता। ₹2,000 की तीन समान किस्तों में सीधे आधार-लिंक्ड बैंक खाते में अंतरण।',
    eligibilityEn: [
      'All landholding farmer families with cultivable land in their names.',
      'Aadhaar e-KYC must be completed.',
      'Land records (Khatauni / e-Khasra) must be linked with land seeding.'
    ],
    eligibilityHi: [
      'वे सभी किसान परिवार जिनके नाम पर कृषि योग्य भूमि दर्ज है।',
      'आधार ई-केवाईसी (e-KYC) पूर्ण होना अनिवार्य है।',
      'भूलेख खतौनी का पोर्टल पर लैंड सीडिंग (Land Seeding) होना आवश्यक है।'
    ],
    officialPortalUrl: 'https://pmkisan.gov.in',
    tags: ['Income Support', 'Central Govt', 'Direct Benefit Transfer (DBT)']
  },
  {
    id: 'scheme-pmfby',
    titleEn: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    titleHi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    department: 'Ministry of Agriculture & UP Agriculture Department',
    benefitEn: 'Comprehensive insurance cover against crop failure due to non-preventable natural risks (drought, flood, pests, unseasonal hailstorm). Only 1.5% premium for Rabi crops and 2.0% for Kharif crops.',
    benefitHi: 'प्राकृतिक आपदाओं (ओलावृष्टि, सूखा, अतिवृष्टि, कीट) से फसल हानि पर वित्तीय सुरक्षा। रबी फसलों के लिए मात्र 1.5% तथा खरीफ के लिए केवल 2% प्रीमियम।',
    eligibilityEn: [
      'All farmers growing notified crops in notified areas (both loanee and non-loanee).',
      'Sowing certificate or declaration signed by Lekhpal/Gram Pradhan.'
    ],
    eligibilityHi: [
      'अधिसूचित क्षेत्र में अधिसूचित फसल उगाने वाले सभी किसान।',
      'पटवारी/लेखपाल द्वारा प्रमाणित बुवाई प्रमाण-पत्र।'
    ],
    officialPortalUrl: 'https://pmfby.gov.in',
    tags: ['Crop Insurance', 'Risk Mitigation', 'Subsidized Premium']
  },
  {
    id: 'scheme-soil-health-card',
    titleEn: 'Soil Health Card Scheme',
    titleHi: 'मृदा स्वास्थ्य कार्ड योजना (Soil Health Card)',
    department: 'Department of Agriculture, Cooperation & Farmers Welfare',
    benefitEn: 'Free soil testing every 2 years reporting 12 parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with tailored crop-wise fertilizer dosage recommendations.',
    benefitHi: 'हर 2 साल में निःशुल्क मिट्टी जांच। 12 प्रमुख पोषक तत्वों की जांच और फसलवार संतुलित खाद व उर्वरक की लिखित सिफारिश।',
    eligibilityEn: ['Open to all registered farmers with agricultural landholding.'],
    eligibilityHi: ['सभी किसान जिनके पास कृषि योग्य भूमि है, नजदीकी ब्लॉक कृषि कार्यालय या केवीके (KVK) से संपर्क कर सकते हैं।'],
    officialPortalUrl: 'https://soilhealth.dac.gov.in',
    tags: ['Soil Nutrition', 'Fertilizer Optimization', 'Free Testing']
  },
  {
    id: 'scheme-up-kisan-karj-rahat',
    titleEn: 'UP Kisan Karj Rahat Yojana (Kisan Rin Mochan)',
    titleHi: 'उत्तर प्रदेश किसान ऋण मोचन योजना',
    department: 'Revenue & Institutional Finance Dept, Uttar Pradesh',
    benefitEn: 'Waiver of institutional agricultural crop loans up to ₹1,00,000 for small and marginal farmers.',
    benefitHi: 'उत्तर प्रदेश के लघु एवं सीमांत किसानों के 1 लाख रुपये तक के फसली कृषि ऋण की माफी।',
    eligibilityEn: [
      'Resident farmer of Uttar Pradesh.',
      'Small farmer (land up to 2 hectares) or marginal farmer (land up to 1 hectare).'
    ],
    eligibilityHi: [
      'उत्तर प्रदेश का मूल निवासी किसान।',
      'सीमांत किसान (1 हेक्टेयर तक) या लघु किसान (2 हेक्टेयर तक भूमि)।'
    ],
    officialPortalUrl: 'http://upkisankarjrahat.upsdc.gov.in',
    tags: ['Debt Relief', 'Uttar Pradesh State', 'Small Farmers']
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Surendra Yadav (कानपुर देहात)',
    authorLocation: 'Akbarpur, Kanpur Dehat',
    title: 'गेहूँ की पत्तियों पर पीले रंग की धारियां दिख रही हैं, क्या यह पीला रतुआ है?',
    content: 'मेरी HD-2967 फसल में 35वें दिन पत्तियों की ऊपरी सतह पर हल्दी जैसा पीला पाउडर जैसा दिख रहा है। क्या मुझे प्रोपिकोनाज़ोल का छिड़काव करना चाहिए या कोई जैविक उपाय है?',
    category: 'Crop Disease',
    upvotes: 24,
    repliesCount: 6,
    createdAt: '2024-12-22T10:15:00Z',
    isVerifiedAgronomistReply: true
  },
  {
    id: 'post-2',
    authorName: 'Manoj Singh (बाराबंकी)',
    authorLocation: 'Haidergarh, Barabanki',
    title: 'क्या इस बार आलू की खुदाई जल्दी करना फायदेमंद रहेगा?',
    content: 'नवीन मंडी में अभी नया आलू ₹1300/क्विंटल बिक रहा है। क्या 10 जनवरी के बाद आवक बढ़ने से भाव गिरेगा?',
    category: 'Mandi Prices',
    upvotes: 38,
    repliesCount: 12,
    createdAt: '2024-12-23T14:40:00Z',
    isVerifiedAgronomistReply: false
  },
  {
    id: 'post-3',
    authorName: 'Dr. R.P. Mishra (कृषि वैज्ञानिक, KVK कानपुर)',
    authorLocation: 'KVK Kalyanpur',
    title: 'पछुआ हवा और पाले से सरसों की फसल को बचाने के उपाय',
    content: 'तापमान 6°C से नीचे जाने पर सरसों में शाम के समय हल्की सिंचाई करें या खेत की मेड़ों पर धुआं करें। 0.1% गंधक (Sulphur 80% WDG) 2 ग्राम प्रति लीटर पानी का छिड़काव अत्यधिक लाभकारी है।',
    category: 'Crop Disease',
    upvotes: 89,
    repliesCount: 15,
    createdAt: '2024-12-24T08:00:00Z',
    isVerifiedAgronomistReply: true
  }
];
