'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  Minimize2,
  RefreshCw,
} from 'lucide-react';

interface ChatItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const VitaCoachWidget: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: user?.preferredLanguage === 'te'
        ? `నమస్కారం ${user?.displayName?.split(' ')[0] || ''}! నేను మీ వీటాకోచ్ (VitaCoach) AI అసిస్టెంట్‌ని. పోషకాహారం, భారతీయ డైట్ ప్లాన్ లేదా వ్యాయామాలపై మీ సందేహాలు అడగండి.`
        : `Hi ${user?.displayName?.split(' ')[0] || 'there'}! I'm VitaCoach, your personal AI fitness & nutrition guide. How can I help your wellness routine today?`,
      time: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatItem = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const messageToSend = input.trim();
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          language: user?.preferredLanguage || 'en',
          userProfile: user,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatItem = {
        id: 'a-' + Date.now(),
        sender: 'assistant',
        text: data.reply || "I'm here to support your healthy lifestyle!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: 'I ran into a brief hiccup connecting to the server. Please feel free to ask again!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Suggest high-protein vegetarian snack',
    'How much water should I drink today?',
    'సూర్య నమస్కారాల ప్రయోజనాలు ఏమిటి?',
    'Healthier alternative for white rice',
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 lg:bottom-8 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-brand-600 to-emerald-500 text-white shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group"
          aria-label="Open VitaCoach AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse-subtle" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-brand-600" />
          </div>
          <span className="font-semibold text-sm pr-1 hidden sm:inline-block">
            Ask VitaCoach AI
          </span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh] bg-white dark:bg-navy-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-600 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight">VitaCoach AI</h3>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-medium">
                    Bilingual
                  </span>
                </div>
                <p className="text-[11px] text-brand-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" />
                  Active • English & తెలుగు
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'reset-' + Date.now(),
                      sender: 'assistant',
                      text: 'Conversation reset. What can I help you with now?',
                      time: 'Just now',
                    },
                  ])
                }
                title="Reset conversation"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Medical Notice Banner */}
          <div className="bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/20 px-3 py-1.5 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <span className="line-clamp-1">
              Educational wellness guide. Not a medical doctor or prescription service.
            </span>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-50/50 dark:bg-navy-900/30">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-600 to-emerald-500 text-white rounded-br-xs'
                      : 'bg-white dark:bg-navy-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs whitespace-pre-line'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-brand-100' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs italic py-1">
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
                <span>VitaCoach is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-navy-950 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInput(prompt);
                }}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything in English or తెలుగు..."
              className="flex-1 text-xs bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 text-white disabled:opacity-50 hover:from-brand-500 hover:to-emerald-400 transition-all shadow-md shadow-brand-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
