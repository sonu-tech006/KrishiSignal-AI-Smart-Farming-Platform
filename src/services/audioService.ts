import { Language } from '../types';

export class VoiceService {
  private static recognition: any = null;
  private static isListening: boolean = false;

  public static isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  public static isSpeechSynthesisSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }

  public static startListening(
    language: Language,
    onResult: (text: string) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ): void {
    if (!this.isSpeechRecognitionSupported()) {
      onError(new Error('Speech recognition is not supported in this browser.'));
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      onError(err);
    }
  }

  public static stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
      this.isListening = false;
    }
  }

  public static speak(text: string, language: Language, onEnd?: () => void): void {
    if (!this.isSpeechSynthesisSupported()) return;

    // Clean text of markdown, asterisks, bullet points for smoother speech
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/[*#_`]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95; // Slightly slower, clear conversational pace for farmers
    utterance.pitch = 1.0;

    // Try finding a matching native voice
    const voices = window.speechSynthesis.getVoices();
    const targetLangPrefix = language === 'hi' ? 'hi' : 'en';
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLangPrefix));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  public static stopSpeaking(): void {
    if (this.isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }
}
