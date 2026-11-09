'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFitnessData } from '@/context/FitnessDataContext';
import { VoiceCommandResult } from '@/types';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  Globe,
  Check,
  RotateCcw,
  Utensils,
  Droplets,
  TrendingUp,
} from 'lucide-react';

export default function VoiceAssistantPage() {
  const { user } = useAuth();
  const { addMealLog, addWaterIntake, todayWaterMl, todayCaloriesConsumed } = useFitnessData();

  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'en' | 'te'>(user?.preferredLanguage === 'te' ? 'te' : 'en');
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const [commandResult, setCommandResult] = useState<VoiceCommandResult | null>(null);
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSpeech = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
      setSpeechSupported(hasSpeech);
    }
  }, []);

  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type or use the sample prompts below!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setCommandResult(null);
        setConfirmedSuccess(false);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceCommand(text, language);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const processVoiceCommand = async (text: string, lang: 'en' | 'te') => {
    setProcessing(true);
    try {
      const res = await fetch('/api/ai/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text, language: lang }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setCommandResult(data.result);
        speakResponse(lang === 'te' ? data.result.assistantReplyTelugu : data.result.assistantReply, lang);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const speakResponse = (text: string, lang: 'en' | 'te') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'te' ? 'te-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleConfirmAction = () => {
    if (!commandResult) return;

    if (commandResult.action === 'log_meal') {
      const meal = commandResult.parsedData;
      const totalCal = (meal.foodItems || []).reduce((acc, i) => acc + i.calories, 0);

      addMealLog({
        date: new Date().toISOString().split('T')[0],
        mealType: meal.mealType || 'breakfast',
        foodName: (meal.foodItems || []).map((i) => i.name).join(', ') || 'Voice Logged Meal',
        portionMultiplier: 1.0,
        calories: totalCal,
        protein: Math.round(totalCal * 0.05),
        carbs: Math.round(totalCal * 0.15),
        fat: Math.round(totalCal * 0.03),
        notes: 'Confirmed from voice assistant',
      });
      setConfirmedSuccess(true);
    } else if (commandResult.action === 'log_water') {
      const amount = commandResult.parsedData.waterAmountMl || 300;
      addWaterIntake(amount);
      setConfirmedSuccess(true);
    }
  };

  const sampleCommands = [
    {
      text: 'I ate two idlis and one bowl of sambar',
      lang: 'en',
      label: 'Log Breakfast (English)',
    },
    {
      text: 'ఈరోజు నేను ఎంత నీళ్లు తాగాను?',
      lang: 'te',
      label: 'Water Query (Telugu)',
    },
    {
      text: 'Suggest a vegetarian breakfast',
      lang: 'en',
      label: 'Diet Suggestion (English)',
    },
    {
      text: 'Show my weekly activity',
      lang: 'en',
      label: 'Weekly Summary (English)',
    },
    {
      text: 'నేను ఒక గ్లాసు నీళ్లు తాగాను',
      lang: 'te',
      label: 'Log Water (Telugu)',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Voice Fitness Assistant
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
              Multilingual (English &amp; తెలుగు)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hands-free nutrition and water logging with speech recognition and structured confirmation.
          </p>
        </div>

        {/* Language selector toggle */}
        <div className="flex items-center gap-2 bg-white dark:bg-navy-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs self-start sm:self-auto">
          <Globe className="w-3.5 h-3.5 text-brand-500 ml-2" />
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-xl font-bold transition-all ${
              language === 'en'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('te')}
            className={`px-3 py-1 rounded-xl font-bold transition-all ${
              language === 'te'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            తెలుగు (Telugu)
          </button>
        </div>
      </div>

      {/* Main Microphone Console Card */}
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
        {/* Pulsing Mic Button */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={isListening ? () => setIsListening(false) : startListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-500 text-white ring-8 ring-rose-500/20 scale-110 shadow-2xl shadow-rose-500/40'
                : 'bg-gradient-to-r from-brand-600 to-emerald-500 text-white hover:scale-105 shadow-xl shadow-brand-500/30'
            }`}
            aria-label={isListening ? 'Stop Listening' : 'Start Listening'}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 animate-pulse" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
            {isListening && (
              <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping pointer-events-none" />
            )}
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isListening
              ? language === 'te'
                ? 'వినబడుతోంది... మాట్లాడండి'
                : 'Listening... Speak now'
              : language === 'te'
              ? 'మైక్రోఫోన్ నొక్కండి'
              : 'Tap to Speak'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'te'
              ? 'ఉదాహరణ: "నేను రెండు ఇడ్లీలు మరియు సాంబార్ తిన్నాను"'
              : 'Example: "I ate two idlis and one bowl of sambar" or "How much water did I drink?"'}
          </p>
        </div>

        {/* Live / Last Transcript */}
        {transcript && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Captured Speech:
            </span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white italic">
              &quot;{transcript}&quot;
            </p>
          </div>
        )}

        {/* Processing Spinner */}
        {processing && (
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
            <span>Parsing speech and retrieving nutritional information...</span>
          </div>
        )}

        {/* Structured Result & Confirmation Box */}
        {commandResult && (
          <div className="p-5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-500/30 text-left space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider">
                VitaCoach Assistant Response
              </span>
              <button
                type="button"
                onClick={() =>
                  speakResponse(
                    language === 'te'
                      ? commandResult.assistantReplyTelugu || commandResult.assistantReply
                      : commandResult.assistantReply,
                    language
                  )
                }
                title="Play Audio"
                className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-500/20"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
              {language === 'te'
                ? commandResult.assistantReplyTelugu || commandResult.assistantReply
                : commandResult.assistantReply}
            </p>

            {/* If confirmation required for meal or water log */}
            {(commandResult.action === 'log_meal' || commandResult.action === 'log_water') && (
              <div className="pt-2 border-t border-brand-500/20">
                {confirmedSuccess ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Action successfully confirmed and recorded to your health diary!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleConfirmAction}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Confirm &amp; Record Entry</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCommandResult(null)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset Voice Command Triggers */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Try Example Voice Commands (Click to simulate speaking):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {sampleCommands.map((cmd, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setTranscript(cmd.text);
                setLanguage(cmd.lang as any);
                processVoiceCommand(cmd.text, cmd.lang as any);
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 text-left text-xs space-y-1 transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>{cmd.label}</span>
                <span className="uppercase text-brand-500">{cmd.lang}</span>
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                &quot;{cmd.text}&quot;
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
