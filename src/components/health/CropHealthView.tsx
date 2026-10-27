import React, { useState, useRef } from 'react';
import { 
  ScanLine, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Droplets, 
  Info,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { askKrishiSignalAI, AssistantResponse } from '../../services/geminiService';
import { CropInspector3D } from '../3d/CropInspector3D';

export const CropHealthView: React.FC = () => {
  const { language, activeFarm, activeCrop } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<AssistantResponse['diagnosis']>({
    diseaseNameEn: 'Yellow Rust / Stripe Rust (Puccinia striiformis)',
    diseaseNameHi: 'पीला रतुआ (स्ट्राइप रस्ट)',
    confidencePercent: 94,
    severity: 'Moderate',
    symptoms: [
      'Parallel rows of yellowish-orange pustules on leaf blades',
      'Powdery chlorotic stripes that rub off on fingers',
      'Flag leaf photosynthetic capacity reduced by 25%'
    ],
    organicTreatmentEn: 'Spray 5% Neem Seed Kernel Extract (NSKE) or bio-fungicide Trichoderma harzianum @ 10g/L at initial stage.',
    organicTreatmentHi: 'प्रारंभिक अवस्था में 5% नीम तेल (NSKE) या ट्राइकोडर्मा हरजियानम 10 ग्राम प्रति लीटर पानी का छिड़काव करें।',
    chemicalTreatmentEn: 'Foliar spray of Propiconazole 25% EC (Tilt) @ 1 ml per litre or Tebuconazole 25.9% EC @ 1.25 ml/L using 200 liters water/acre.',
    chemicalTreatmentHi: 'प्रोपिकोनाज़ोल 25% EC (टिल्ट) 1 मिली प्रति लीटर या टेबुकोनाज़ोल 1.25 मिली/लीटर का 200 लीटर पानी में घोल बनाकर प्रति एकड़ छिड़काव करें।',
    disclaimer: 'AI diagnostic screening is an agricultural decision-support tool. Verify critical outbreaks with your District Agricultural Extension Officer or KVK agronomist.'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        triggerAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = async (imageBase64: string) => {
    setIsAnalyzing(true);
    try {
      const resp = await askKrishiSignalAI(
        'Analyze this crop leaf for fungal diseases, nutrient deficiencies or insect pest attacks.',
        language,
        activeFarm,
        activeCrop,
        imageBase64
      );
      if (resp.diagnosis) {
        setDiagnosisResult(resp.diagnosis);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {language === 'hi' ? 'एआई फसल रोग व कीट पहचान स्कैनर' : 'AI Crop Leaf Disease & Pest Scanner'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
              Computer Vision
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'रोगग्रस्त पत्ती की फोटो लें और तत्काल वैज्ञानिक निदान, जैविक व रासायनिक उपचार प्राप्त करें'
              : 'Screen foliar symptoms instantly using trained agricultural pathology patterns'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center gap-2 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>{language === 'hi' ? 'पत्ती की फोटो अपलोड करें' : 'Upload Leaf Photo'}</span>
          </button>
        </div>
      </div>

      {/* 2. SCANNER WORKSPACE: IMAGE + 3D PLANT ANATOMY + DIAGNOSTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Uploaded Photo & 3D Interactive Model */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                {language === 'hi' ? 'विश्लेषण की जा रही पत्ती' : 'Analyzed Foliar Sample'}
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                {language === 'hi' ? 'फोटो बदलें' : 'Change Photo'}
              </button>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              {previewImage ? (
                <img src={previewImage} alt="Crop Leaf" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <ScanLine className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs">No image loaded</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white text-xs font-bold space-y-2">
                  <Sparkles className="w-6 h-6 text-emerald-400 animate-spin" />
                  <span>{language === 'hi' ? 'एआई पत्ती का स्कैन कर रहा है...' : 'Scanning fungal patterns...'}</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              {language === 'hi' ? 'अच्छी रोशनी में पत्ती के ऊपर से साफ फोटो लें।' : 'Ensure clear focus in natural sunlight for best accuracy.'}
            </p>
          </div>

          {/* 3D Anatomical Viewer */}
          <CropInspector3D
            diseaseSpotActive={true}
            cropName={activeCrop.cropName}
            stageName={`${activeCrop.stage} (Yellow Rust Hotspot)`}
          />
        </div>

        {/* Right: Detailed Diagnostic Results */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {diagnosisResult ? (
            <>
              {/* Diagnosis Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {language === 'hi' ? 'रोग निदान' : 'Fungal Infection Detected'}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    {language === 'hi' ? diagnosisResult.diseaseNameHi : diagnosisResult.diseaseNameEn}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Confidence</span>
                    <span className="text-base font-black text-emerald-700">{diagnosisResult.confidencePercent}%</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                    diagnosisResult.severity === 'Severe'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {diagnosisResult.severity} Severity
                  </span>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  {language === 'hi' ? 'प्रमुख दृश्य लक्षण (Visual Symptoms):' : 'Key Visual Symptoms:'}
                </h4>
                <div className="space-y-1.5">
                  {diagnosisResult.symptoms.map((sym, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organic Solution */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {language === 'hi' ? 'जैविक व पर्यावरण-अनुकूल नियंत्रण (Organic Treatment):' : 'Organic & Cultural Treatment:'}
                </span>
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  {language === 'hi' ? diagnosisResult.organicTreatmentHi : diagnosisResult.organicTreatmentEn}
                </p>
              </div>

              {/* Chemical Fungicide */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1.5">
                <span className="text-xs font-extrabold text-blue-950 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  {language === 'hi' ? 'रासायनिक फफूंदनाशक व सटीक खुराक (Chemical Treatment):' : 'Chemical Fungicide & Dosage:'}
                </span>
                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  {language === 'hi' ? diagnosisResult.chemicalTreatmentHi : diagnosisResult.chemicalTreatmentEn}
                </p>
                <p className="text-[10px] text-blue-700 font-semibold mt-1">
                  Waiting Period (PHI): 30 days before harvest. Use flat fan nozzle.
                </p>
              </div>

              {/* Expert Help & Disclaimer */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{language === 'hi' ? 'कृषि वैज्ञानिक परामर्श' : 'Agronomist Consultation'}</span>
                </div>
                <p className="text-[11px] text-amber-900/90 leading-relaxed">
                  {diagnosisResult.disclaimer}
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <a
                    href="tel:18001801551"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-sm hover:bg-amber-700 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'किसान कॉल सेंटर (1800-180-1551)' : 'Kisan Call Center Toll-Free'}</span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-slate-400">
              <ScanLine className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold">Upload a photo to see diagnostic breakdown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
