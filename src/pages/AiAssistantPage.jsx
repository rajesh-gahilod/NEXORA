import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import aiService from '../services/aiService';
import ChatMessage from '../components/ai/ChatMessage';
import PromptSuggestions from '../components/ai/PromptSuggestions';
import TypingIndicator from '../components/ai/TypingIndicator';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  Sparkles,
  Send,
  Trash2,
  Cpu,
  ShieldCheck,
  Bot,
  Zap,
  Info
} from 'lucide-react';

export const AiAssistantPage = ({ initialPrompt = null }) => {
  const { isDemoMode } = useAuth();
  const { addToast } = useNotification();

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `### Welcome to NEXORA Neural Business Assistant

I have synchronized real-time enterprise telemetry from your **Java Spring Boot backend** and **MySQL analytics warehouse**.

#### How I Can Assist:
- **Revenue Diagnostics**: Identify drivers for monthly expansions and variance contractions.
- **Customer Cohorts**: Assess retention, churn risk scores, and Enterprise upgrade likelihoods.
- **Strategic Forecasting**: Synthesize multi-variable projections for executive board presentations.

Select one of the suggested prompts below or ask any custom question regarding your business performance.`,
      timestamp: new Date().toISOString(),
      confidence: 99.1,
      isDemo: isDemoMode
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await aiService.sendMessage(query, messages);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: result.reply,
        timestamp: result.timestamp,
        confidence: result.confidence,
        isDemo: result.isDemo
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      addToast({
        title: 'Query Failed',
        message: err.message || 'Unable to communicate with AI provider API.',
        type: 'error'
      });
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `⚠️ **API Error**: Could not complete query through configured AI endpoint. ${err.message}`,
          timestamp: new Date().toISOString(),
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Conversation history cleared. Ready for your next business analytics query.',
        timestamp: new Date().toISOString(),
        confidence: 100,
        isDemo: isDemoMode
      }
    ]);
    addToast({
      title: 'Chat Cleared',
      message: 'Conversation history reset',
      type: 'info'
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[580px]">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-purple-400" />
              NEXORA AI Business Assistant
            </h2>
            <Badge variant="purple" showDot size="sm">
              LLM Telemetry Active
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Contextual business intelligence grounded in your authorized live metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isDemoMode && (
            <span className="hidden md:inline-flex text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full items-center gap-1.5 font-medium">
              <Info className="w-3 h-3" /> Simulated AI Analysis
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={handleClearChat}
            title="Clear Chat History"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} isDemo={isDemoMode} />
        ))}

        {loading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Area: Suggestions + Input Form */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 shrink-0 space-y-3">
        {messages.length <= 2 && (
          <PromptSuggestions onSelectPrompt={(p) => handleSendMessage(p)} />
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ask anything about your revenue, customer churn, products, or forecast..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="w-full pl-4 pr-12 py-3 bg-navy-850 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple-500 focus:ring-1 focus:ring-brand-purple-500 shadow-inner disabled:opacity-50"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono">
                Press Enter
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="ai"
            size="md"
            disabled={!input.trim() || loading}
            isLoading={loading}
            icon={Send}
            className="px-5 py-3"
          >
            <span className="hidden sm:inline">Ask AI</span>
          </Button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Enterprise Zero Data Retention • End-to-End Encrypted
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            Model: NEXORA-Enterprise-v2
          </span>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;
