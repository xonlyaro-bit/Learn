import React, { useState, useMemo } from 'react';
import { Globe, Volume2, Bookmark, Check, Sparkles, X } from 'lucide-react';
import { cleanWord, translateText, speakEnglish } from '../services/translator';
import { isWordSaved, getSavedWordEntry, saveWord } from '../services/storage';
import { SavedWord } from '../types';

interface InteractiveTextProps {
  content: string;
  sourceTitle?: string;
  savedWordsList: SavedWord[];
  onWordClick: (word: string, contextSentence?: string) => void;
  showSavedUnderlines?: boolean;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({
  content,
  sourceTitle,
  savedWordsList,
  onWordClick,
  showSavedUnderlines = true,
}) => {
  // Fast Set of normalized saved words for rapid lookup
  const savedSet = useMemo(() => {
    return new Set(savedWordsList.map(w => w.word.toLowerCase().trim()));
  }, [savedWordsList]);

  // Selected sentence or text modal
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionTranslation, setSelectionTranslation] = useState<string>('');
  const [isTranslatingSelection, setIsTranslatingSelection] = useState<boolean>(false);
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);

  // Split into paragraphs
  const paragraphs = useMemo(() => {
    return content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  }, [content]);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }
    const text = selection.toString().trim();
    if (text.length > 3 && text.includes(' ')) {
      // It's a sentence or multi-word phrase!
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setSelectionPosition({
        x: Math.max(10, Math.min(window.innerWidth - 300, rect.left + window.scrollX)),
        y: rect.bottom + window.scrollY + 8,
      });
      setIsTranslatingSelection(true);
      translateText(text).then(tr => {
        setSelectionTranslation(tr);
        setIsTranslatingSelection(false);
      });
    }
  };

  const closeSelectionModal = () => {
    setSelectedText('');
    setSelectionTranslation('');
    setSelectionPosition(null);
  };

  return (
    <div className="relative select-text" onMouseUp={handleMouseUp}>
      {paragraphs.map((paragraph, pIdx) => {
        // Tokenize words while preserving spacing and punctuation
        const tokens = paragraph.split(/(\s+|[.,!?;:—"“”()]+)/);

        return (
          <p key={pIdx} className="mb-6 leading-relaxed">
            {tokens.map((token, tIdx) => {
              const isWord = /^[a-zA-Z0-9'-]+$/.test(token);
              if (!isWord) {
                return <span key={tIdx}>{token}</span>;
              }

              const normalized = cleanWord(token);
              const isSaved = showSavedUnderlines && savedSet.has(normalized);

              return (
                <span
                  key={tIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onWordClick(token, paragraph);
                  }}
                  className={`inline-block transition-colors cursor-pointer rounded-xs px-0.5 ${
                    isSaved
                      ? 'saved-vocab-highlight font-medium text-blue-700 dark:text-blue-300'
                      : 'hover:bg-amber-100/70 dark:hover:bg-slate-700/60 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  title={isSaved ? `Saved word: "${normalized}" (Click to view)` : `Click to define "${token}"`}
                >
                  {token}
                </span>
              );
            })}
          </p>
        );
      })}

      {/* Floating Sentence Translation Card */}
      {selectedText && selectionPosition && (
        <div
          role="region"
          aria-label="Sentence translation"
          style={{ top: `${selectionPosition.y}px`, left: `${selectionPosition.x}px` }}
          className="absolute z-40 w-80 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-3.5 text-xs animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              Arabic Sentence Translation
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => speakEnglish(selectedText)}
                className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Speak sentence"
                aria-label="Speak selected sentence"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={closeSelectionModal}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close translation"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 italic mb-2 line-clamp-2">
            "{selectedText}"
          </p>

          <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-lg">
            {isTranslatingSelection ? (
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 text-xs">
                <div className="w-3.5 h-3.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                Translating sentence into Arabic...
              </div>
            ) : (
              <p className="font-arabic text-sm font-semibold text-amber-950 dark:text-amber-200 text-right leading-relaxed" dir="rtl">
                {selectionTranslation || 'لا تتوفر ترجمة لهذه الجملة حالياً.'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
