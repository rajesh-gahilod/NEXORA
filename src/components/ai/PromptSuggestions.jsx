import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AI_SUGGESTED_PROMPTS } from '../../data/mockData';

export const PromptSuggestions = ({ onSelectPrompt }) => {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-brand-purple-400" />
        Suggested Executive Prompts
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {AI_SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="flex items-center justify-between p-3 rounded-xl bg-navy-850 hover:bg-navy-800 border border-slate-700/80 hover:border-brand-purple-500/40 text-left text-xs text-slate-300 hover:text-white transition-all group shadow-sm"
          >
            <span className="truncate pr-2">{prompt}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-purple-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
