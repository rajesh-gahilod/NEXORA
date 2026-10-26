import React from 'react';
import { Sparkles } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-navy-850/90 border border-brand-purple-500/20 max-w-xl animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-purple-600 to-brand-blue-500 flex items-center justify-center shrink-0 shadow-glow-purple">
        <Sparkles className="w-4 h-4 text-white animate-spin" />
      </div>
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-brand-purple-300 font-medium">
          <span>NEXORA Neural Engine</span>
          <span className="text-[10px] text-slate-500">• Synthesizing business telemetry...</span>
        </div>
        <div className="flex items-center gap-1 py-1">
          <span className="w-2 h-2 rounded-full bg-brand-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-brand-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-brand-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
