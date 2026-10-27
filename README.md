# KrishiSignal — AI-Powered Smart Farming and Agricultural Decision Support Platform

KrishiSignal is an agricultural decision-support web platform engineered for Indian farmers (with initial optimization for Uttar Pradesh). It combines real-time meteorological forecasting, verified Agmarknet mandi intelligence, ICAR-grounded irrigation rules, and bilingual voice-enabled Google Gemini AI.

---

## 🌟 Key Architecture & Features

### 1. 🌾 Interactive 3D Farm Digital Twin
- **WebGL / Three.js 3D Agricultural Canvas**: Renders farm topography, wheat/mustard crops, wind sway animation, and real-time micro-climate atmosphere (sunlight vs rain particle precipitation system).
- **3D Plant Anatomy Inspector**: Allows zoom and rotational inspection of crown roots, stem tillers, and yellow rust spore pustules.

### 2. 🌦️ Verified Weather & Meteorological Advisories
- **Open-Meteo & IMD Alignment**: Fetches live high-resolution hourly and 5-day forecasts for any Uttar Pradesh district (Kanpur, Lucknow, Varanasi, Prayagraj, etc.).
- **Agricultural Spray Feasibility Index**: Calculates optimal spraying windows based on wind velocity (< 12 km/h) and droplet drift risk.
- **Meteorological Warning System**: Automatic triggers for frost, heatwave, and unseasonal rainfall.

### 3. 💧 Deterministic Irrigation Decision Support System (DSS)
- **Zero Hallucination Rules**: Cross-evaluates crop phenological stage (Crown Root Initiation, Tillering, Jointing, Flowering, Milk Stage), 72-hour forecast rainfall, and soil water retention.
- **Explainable Advisory**: Explains *why* an irrigation should be held or scheduled immediately with ICAR references.

### 4. 📈 Mandi Intelligence & Net Realization Calculator
- **AGMARKNET Modal Rates**: Real-time mandi prices across major UP APMC markets (Kanpur Naubasta, Lucknow Dubagga, Barabanki, Varanasi Pahariya).
- **Net In-Hand Calculator**: Deducts transport/diesel freight and mandi user cess to calculate net farmer take-home profit.

### 5. 🤖 KrishiMitra Voice AI Assistant
- **Bilingual (हिन्दी & English)**: Powered by Gemini 2.5 Flash with fallback to offline agronomic knowledge base.
- **Speech-to-Text & Text-to-Speech**: Browser Web Speech API integration for hands-free audio interaction in the field.
- **Computer Vision Leaf Scanner**: Identifies Yellow Rust, Leaf Blight, and nutritional deficiencies with organic (Neem, Trichoderma) and approved chemical solutions.

### 6. 🗺️ Geospatial GIS Mapping
- Interactive Leaflet & OpenStreetMap layers plotting registered farm boundaries, nearby APMC mandis, and Krishi Vigyan Kendras (KVKs).

---

## 🚀 Quickstart & Local Execution

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/krishisignal.git
cd krishisignal

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 📄 License & Agronomic Disclaimer
KrishiSignal is developed for educational and agricultural decision support. Always cross-verify chemical pesticide dosages and field outbreaks with your nearest Krishi Vigyan Kendra (KVK) or Block Agricultural Officer.
