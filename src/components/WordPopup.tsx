import React, { useState, useEffect } from 'react';
import { Volume2, Bookmark, Check, X, Globe, Sparkles } from 'lucide-react';
import { WordLookupResult, lookupWordFull, speakEnglish } from '../services/translator';
import { isWordSaved, saveWord, removeSavedWord, getSavedWordEntry } from '../services/storage';
import { SavedWord } from '../types';

interface WordPopupProps {
  word: string;
  sourceTitle?: string;
  sourceContext?: string;
  onClose: () => void;
  onSavedChange?: () => void;
}

export const WordPopup: React.FC<WordPopupProps> = ({
  word,
  sourceTitle,
  sourceContext,
  onClose,
  onSavedChange
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<WordLookupResult | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>('');
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    lookupWordFull(word).then(result => {
      if (isMounted) {
        setData(result);
        const isAlreadySaved = isWordSaved(word);
        setSaved(isAlreadySaved);
        if (isAlreadySaved) {
          const entry = getSavedWordEntry(word);
          if (entry?.notes) setUserNote(entry.notes);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [word]);

  const handleToggleSave = () => {
    if (!data) return;
    if (saved) {
      const entry = getSavedWordEntry(data.word);
      if (entry) {
        removeSavedWord(entry.id);
        setSaved(false);
        if (onSavedChange) onSavedChange();
      }
    } else {
      const newSaved: SavedWord = {
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        word: data.word,
        level: (data.level as any) || 'B1',
        pos: data.pos || 'word',
        phonetic: data.phonetic,
        definition: data.definition,
        arabic: data.arabic,
        example: data.example || sourceContext,
        sourceContext: sourceContext,
        sourceTitle: sourceTitle,
        notes: userNote,
        addedAt: Date.now(),
        dueDate: Date.now() + 86400000, // Due in 1 day for first review
        repetitions: 0,
        intervalDays: 1,
        easeFactor: 2.5,
        status: 'new'
      };
      saveWord(newSaved);
      setSaved(true);
      if (onSavedChange) onSavedChange();
    }
  };

  const handleSaveNote = () => {
    if (!data || !saved) return;
    const entry = getSavedWordEntry(data.word);
    if (entry) {
      saveWord({ ...entry, notes: userNote });
      setShowNoteInput(false);
      if (onSavedChange) onSavedChange();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="word-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close word details"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-3">
            <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Looking up vocabulary details...</p>
          </div>
        ) : data ? (
          <div className="space-y-4">
            {/* Header: Word & Audio & Level */}
            <div className="flex items-start justify-between pr-8">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 id="word-popup-title" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">
                    {data.word}
                  </h3>
                  <button
                    onClick={() => speakEnglish(data.word)}
                    className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition-colors"
                    title="Listen to pronunciation"
                    aria-label={`Listen to pronunciation of ${data.word}`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  {data.phonetic && <span>{data.phonetic}</span>}
                  {data.phonetic && data.pos && <span>•</span>}
                  {data.pos && <span className="italic">{data.pos}</span>}
                  {data.level && <span>•</span>}
                  {data.level && <span className="font-semibold text-blue-600 dark:text-blue-400">CEFR {data.level}</span>}
                </div>
              </div>
            </div>

            {/* Arabic Translation Block (Optional translation) */}
            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-xl">
              <div className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-400 mb-1 font-medium">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Arabic Translation
                </span>
                <span className="text-[11px] font-arabic">الترجمة العربية</span>
              </div>
              <p className="font-arabic text-xl font-bold text-amber-950 dark:text-amber-200 text-right leading-relaxed" dir="rtl">
                {data.arabic || 'جارٍ الترجمة...'}
              </p>
            </div>

            {/* English Definition */}
            <div className="space-y-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">English Definition</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-normal">
                {data.definition}
              </p>
            </div>

            {/* Example sentence */}
            {data.example && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 italic">
                "{data.example}"
              </div>
            )}

            {/* Source context if available */}
            {sourceTitle && (
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Spotted in: <span className="font-medium text-slate-600 dark:text-slate-300">{sourceTitle}</span>
              </p>
            )}

            {/* User Note area if saved */}
            {saved && (
              <div className="pt-1">
                {showNoteInput ? (
                  <div className="space-y-2">
                    <textarea
                      value={userNote}
                      onChange={e => setUserNote(e.target.value)}
                      placeholder="Add personal study notes or context..."
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowNoteInput(false)}
                        className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNote}
                        className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="italic truncate">
                      {userNote ? `Note: "${userNote}"` : 'No personal notes added yet.'}
                    </span>
                    <button
                      onClick={() => setShowNoteInput(true)}
                      className="text-blue-600 dark:text-blue-400 hover:underline shrink-0 ml-2"
                    >
                      {userNote ? 'Edit note' : '+ Add note'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleToggleSave}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                  saved
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved to Vocabulary
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    Save to My Flashcards
                  </>
                )}
              </button>

              <button
                onClick={() => speakEnglish(data.word)}
                className="py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                Audio
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 py-4 text-center">Unable to load definition.</p>
        )}
      </div>
    </div>
  );
};
