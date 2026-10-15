import React, { useState, useEffect } from 'react';
import { Search, Volume2, Bookmark, Check, X, Globe, Sparkles } from 'lucide-react';
import { WordLookupResult, lookupWordFull, speakEnglish, translateText } from '../services/translator';
import { isWordSaved, saveWord, removeSavedWord, getSavedWordEntry } from '../services/storage';
import { SavedWord } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavedWordsUpdate: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSavedWordsUpdate
}) => {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<WordLookupResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResult(null);
      setLoading(false);
      return;
    }
  }, [isOpen]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = query.trim();
    if (!clean) return;

    setLoading(true);
    const lookup = await lookupWordFull(clean);
    setResult(lookup);
    setIsSaved(isWordSaved(lookup.word));
    setLoading(false);
  };

  const handleToggleSave = () => {
    if (!result) return;
    if (isSaved) {
      const entry = getSavedWordEntry(result.word);
      if (entry) {
        removeSavedWord(entry.id);
        setIsSaved(false);
        onSavedWordsUpdate();
      }
    } else {
      const newSaved: SavedWord = {
        id: `search-${Date.now()}`,
        word: result.word,
        level: (result.level as any) || 'B1',
        pos: result.pos || 'word',
        phonetic: result.phonetic,
        definition: result.definition,
        arabic: result.arabic,
        example: result.example,
        addedAt: Date.now(),
        dueDate: Date.now() + 86400000,
        repetitions: 0,
        intervalDays: 1,
        easeFactor: 2.5,
        status: 'new'
      };
      saveWord(newSaved);
      setIsSaved(true);
      onSavedWordsUpdate();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 text-slate-900 dark:text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type any English word, idiom, or phrase..."
            className="w-full pl-12 pr-10 py-3.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResult(null);
              }}
              className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-500 space-y-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Searching Oxford dictionary & fetching Arabic translation...</p>
          </div>
        ) : result ? (
          <div className="mt-4 space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold capitalize">{result.word}</h3>
                  <button
                    onClick={() => speakEnglish(result.word)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-full"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                  {result.phonetic && <span>{result.phonetic}</span>}
                  {result.pos && <span>• <span className="italic">{result.pos}</span></span>}
                  {result.level && <span>• <span className="font-semibold text-blue-600">CEFR {result.level}</span></span>}
                </div>
              </div>

              <button
                onClick={handleToggleSave}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSaved
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    Save Word
                  </>
                )}
              </button>
            </div>

            {/* Arabic Translation */}
            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-xl">
              <span className="text-[11px] font-medium text-amber-800 dark:text-amber-400 block mb-0.5">
                Arabic Translation
              </span>
              <p className="font-arabic text-xl font-bold text-amber-950 dark:text-amber-200 text-right leading-relaxed" dir="rtl">
                {result.arabic}
              </p>
            </div>

            {/* Definition */}
            <div>
              <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">Definition</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal">
                {result.definition}
              </p>
            </div>

            {/* Example */}
            {result.example && (
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-500 dark:text-slate-400 italic">
                "{result.example}"
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400">
            Press <kbd className="px-1.5 py-0.5 font-mono bg-slate-100 dark:bg-slate-800 rounded">Enter</kbd> to search Oxford 6000 & Arabic translation.
          </div>
        )}
      </div>
    </div>
  );
};
