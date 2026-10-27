import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  ShieldAlert, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { askKrishiSignalAI, AssistantResponse } from '../../services/geminiService';
import { VoiceService } from '../../services/audioService';

interface ChatItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: string[];
  diagnosis?: AssistantResponse['diagnosis'];
  imagePreview?: string;
}

export const AssistantView: React.FC = () => {
  const { language, activeFarm, activeCrop, searchQuery, setSearchQuery } = useApp();

  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: language === 'hi' 
        ? `नमस्ते! मैं कृषि मित्र (KrishiMitra) हूँ — आपका एआई कृषि वैज्ञानिक।\n\nआप मुझसे मौसम, खाद की सही मात्रा, प्रमाणित बीज, मंडी भाव या पत्तियों के रोग के बारे में पूछ सकते हैं। आप बोलकर भी सवाल पूछ सकते हैं!`
        : `Namaste! I am KrishiMitra — your AI agronomist for ${activeFarm.farmName}.\n\nAsk me about weather forecasts, precise fertilizer dosages, certified wheat varieties, mandi prices, or upload crop leaf photos for disease diagnostics. Voice queries are supported!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['ICAR Indian Council of Agricultural Research', 'UP Agriculture Directorate Guidelines']
    }
  ]);

  const [inputText, setInputText] = useState(searchQuery || '');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim().length > 0) {
      handleSend(searchQuery);
      setSearchQuery('');
    }
  }, []);

  const SUGGESTIONS = language === 'hi' ? [
    'क्या अगले 48 घंटे में कानपुर में बारिश होगी?',
    'मेरी गेहूँ की फसल को पहली सिंचाई कब देनी चाहिए?',
    'उत्तर प्रदेश के लिए सबसे अच्छा गेहूँ का बीज कौन सा है?',
    'गेहूँ में पीला रतुआ रोग के लक्षण और दवा बताएं',
    'एक एकड़ गेहूँ में कितनी बोरी डीएपी और यूरिया डालना चाहिए?'
  ] : [
    'Will it rain in my district over the next 48 hours?',
    'When should I perform Crown Root Initiation (CRI) irrigation?',
    'Which certified wheat variety gives the highest yield in UP?',
    'What are the symptoms and cure for Yellow Rust of wheat?',
    'Calculate exact DAP and Urea dosage for 4.5 acres of wheat.'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text && !selectedImage) return;

    const userMessage: ChatItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text || (language === 'hi' ? 'इस पत्ती की बीमारी की जांच करें।' : 'Analyze this crop leaf for diseases.'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imagePreview: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askKrishiSignalAI(
        userMessage.text,
        language,
        activeFarm,
        activeCrop,
        selectedImage || undefined
      );

      const assistantMessage: ChatItem = {
        id: `assist-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources,
        suggestedActions: response.suggestedActions,
        diagnosis: response.diagnosis
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Automatically speak the first sentence in voice mode if wanted
      if (isListening) {
        handleSpeak(assistantMessage.id, assistantMessage.text);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      VoiceService.stopListening();
      setIsListening(false);
    } else {
      VoiceService.startListening(
        language,
        (transcript) => {
          setInputText(transcript);
          setIsListening(false);
          handleSend(transcript);
        },
        (error) => {
          console.warn('Speech recognition error:', error);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
      setIsListening(true);
    }
  };

  const handleSpeak = (id: string, text: string) => {
    if (isSpeakingId === id) {
      VoiceService.stopSpeaking();
      setIsSpeakingId(null);
    } else {
      setIsSpeakingId(id);
      VoiceService.speak(text, language, () => {
        setIsSpeakingId(null);
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Bar with Context */}
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-slate-900">
                {language === 'hi' ? 'कृषि मित्र (KrishiMitra AI)' : 'KrishiMitra Agronomy AI'}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Grounded Gemini 2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {activeFarm.farmName} • {activeCrop.cropName} ({activeCrop.stage})
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(messages.slice(0, 1))}
          className="text-slate-400 hover:text-slate-600 p-2 rounded-xl text-xs flex items-center gap-1"
          title="Clear chat history"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'hi' ? 'नया संवाद' : 'Reset'}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/15'
                  : 'bg-slate-100/90 text-slate-800 border border-slate-200/80'
              }`}
            >
              {/* Attached Image preview if any */}
              {msg.imagePreview && (
                <div className="mb-2 rounded-xl overflow-hidden max-h-48 border border-white/20">
                  <img src={msg.imagePreview} alt="Uploaded leaf" className="w-full object-cover" />
                </div>
              )}

              {/* Text content with simple formatting */}
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Crop Disease Diagnostics Card if present */}
              {msg.diagnosis && (
                <div className="mt-3 p-3.5 rounded-xl bg-white border border-amber-300 text-slate-800 shadow-sm space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      {language === 'hi' ? msg.diagnosis.diseaseNameHi : msg.diagnosis.diseaseNameEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {msg.diagnosis.confidencePercent}% Confidence
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="font-semibold text-slate-700">{language === 'hi' ? 'पहचान लक्षण:' : 'Visual Symptoms:'}</p>
                    <ul className="list-disc list-inside text-slate-600 pl-1 space-y-0.5">
                      {msg.diagnosis.symptoms.map((sym, idx) => (
                        <li key={idx}>{sym}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                    <strong>{language === 'hi' ? 'जैविक उपाय (Organic):' : 'Organic Control:'}</strong>{' '}
                    {language === 'hi' ? msg.diagnosis.organicTreatmentHi : msg.diagnosis.organicTreatmentEn}
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-950">
                    <strong>{language === 'hi' ? 'रासायनिक फफूंदनाशक (Chemical):' : 'Chemical Control:'}</strong>{' '}
                    {language === 'hi' ? msg.diagnosis.chemicalTreatmentHi : msg.diagnosis.chemicalTreatmentEn}
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    {msg.diagnosis.disclaimer}
                  </p>
                </div>
              )}

              {/* Audio Read-Aloud & Timestamp footer */}
              <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] text-slate-500">
                <span>{msg.timestamp}</span>

                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => handleSpeak(msg.id, msg.text)}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold px-2 py-0.5 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    {isSpeakingId === msg.id ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-amber-600" />
                        <span>{language === 'hi' ? 'रोकें' : 'Stop'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'hi' ? 'सुनें' : 'Listen'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sources Citation Pill */}
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center gap-1 text-[10px] text-slate-400 max-w-[80%] pl-1">
                <BookOpen className="w-3 h-3 text-slate-400" />
                <span>Verified Sources:</span>
                {msg.sources.map((s, idx) => (
                  <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 max-w-[200px] text-xs text-slate-500 animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>{language === 'hi' ? 'कृषि मित्र सोच रहा है...' : 'Consulting agronomy rules...'}</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Prompts Pills */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          {language === 'hi' ? 'पूछे जाने वाले सवाल:' : 'Suggested:'}
        </span>
        {SUGGESTIONS.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sug)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 text-xs font-medium transition-all shrink-0"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Bottom Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        {selectedImage && (
          <div className="mb-2 flex items-center gap-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span className="truncate flex-1 font-semibold">{language === 'hi' ? 'पत्ती की फोटो संलग्न है' : 'Leaf image attached'}</span>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-emerald-700 font-bold hover:text-red-600"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Image Upload Button */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-emerald-700 transition-colors"
            title="Upload Crop Leaf Image for Disease Scan"
          >
            <Upload className="w-4 h-4" />
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-red-500 text-white border-red-600 animate-pulse'
                : 'border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-emerald-700'
            }`}
            title={language === 'hi' ? 'माइक द्वारा बोलें' : 'Speak using microphone'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              isListening
                ? (language === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... speak now')
                : (language === 'hi' ? 'अपना कृषि सवाल यहाँ लिखें या बोलें...' : 'Type agricultural question or upload leaf image...')
            }
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={isLoading || (!inputText.trim() && !selectedImage)}
            className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white shadow-md shadow-emerald-700/20 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
