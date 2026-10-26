import React, { useState } from 'react';
import { Sparkles, User, Copy, Check, Info, ShieldCheck } from 'lucide-react';
import Badge from '../common/Badge';

/**
 * Lightweight rich markdown renderer for AI responses:
 * Handles tables, headers, lists, and bold text without heavy dependencies
 */
const renderFormattedContent = (content) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let inTable = false;
  let tableHeaders = [];
  let tableRows = [];

  const flushTable = () => {
    if (tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-3 overflow-x-auto rounded-lg border border-slate-700/80 bg-navy-950/70">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700 bg-navy-900/80 text-slate-300 font-semibold">
                {tableHeaders.map((th, i) => (
                  <th key={i} className="py-2 px-3">{th.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/40">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2 px-3">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    inTable = false;
    tableHeaders = [];
    tableRows = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for table line
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const parts = line.split('|').slice(1, -1);
      // Skip separator line e.g. |---|---|
      if (parts.every(p => p.trim().match(/^:?-+:?$/))) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeaders = parts;
      } else {
        tableRows.push(parts);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Markdown Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-sm font-bold text-white mt-3 mb-1.5 flex items-center gap-1.5 text-brand-purple-300">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-xs font-semibold text-slate-200 mt-2.5 mb-1">
          {line.replace('#### ', '')}
        </h4>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      // Bullet list item
      const itemText = line.replace(/^[-*]\s+/, '');
      elements.push(
        <li key={i} className="ml-4 list-disc text-xs text-slate-300 py-0.5 leading-relaxed">
          {parseInlineFormatting(itemText)}
        </li>
      );
    } else if (line.match(/^\d+\.\s+/)) {
      // Numbered list item
      const itemText = line.replace(/^\d+\.\s+/, '');
      elements.push(
        <div key={i} className="flex items-start gap-2 text-xs text-slate-300 py-0.5">
          <span className="font-semibold text-brand-purple-400 shrink-0 font-mono">
            {line.match(/^\d+\./)[0]}
          </span>
          <span className="leading-relaxed">{parseInlineFormatting(itemText)}</span>
        </div>
      );
    } else if (line.trim()) {
      elements.push(
        <p key={i} className="text-xs text-slate-300 leading-relaxed my-1">
          {parseInlineFormatting(line)}
        </p>
      );
    }
  }

  if (inTable) {
    flushTable();
  }

  return elements;
};

// Simple bold parser
const parseInlineFormatting = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const ChatMessage = ({ message, isDemo = false }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3.5 my-3 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      } animate-fade-in`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
          isUser
            ? 'bg-brand-blue-600 text-white shadow-glow-blue'
            : 'bg-gradient-to-tr from-brand-purple-600 to-indigo-600 text-white shadow-glow-purple'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-2xl rounded-2xl p-4 text-xs transition-all ${
          isUser
            ? 'bg-brand-blue-600/90 text-white rounded-tr-none shadow-md'
            : 'glass-card bg-navy-850/90 text-slate-200 border-slate-700/80 rounded-tl-none shadow-xl'
        }`}
      >
        {/* Header / Sub-details for AI */}
        {!isUser && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-purple-300">NEXORA Intelligence</span>
              {message.confidence && (
                <Badge variant="purple" size="sm">
                  {message.confidence}% Confidence
                </Badge>
              )}
              {message.isDemo && (
                <span className="text-[10px] text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  Simulated Demo Response
                </span>
              )}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              title="Copy response to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-[10px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[10px]">Copy</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Message Content */}
        {isUser ? (
          <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
        ) : (
          <div className="space-y-1">{renderFormattedContent(message.text)}</div>
        )}

        {/* Timestamp */}
        <div
          className={`text-[10px] mt-2 flex items-center gap-1 ${
            isUser ? 'text-blue-200 justify-end' : 'text-slate-400'
          }`}
        >
          <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
