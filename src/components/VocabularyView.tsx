import React, { useState, useMemo } from 'react';
import { OxfordWord, SavedWord, CEFRLevel } from '../types';
import { OXFORD_WORDS } from '../data/oxfordWords';
import { calculateNextReview, ReviewRating } from '../services/srs';
import {
  saveWord,
  removeSavedWord,
  getSavedWordEntry,
  updateUserStats,
  exportUserData
} from '../services/storage';
import { speakEnglish } from '../services/translator';
import {
  BookMarked,
  Search,
  Filter,
  Volume2,
  Bookmark,
  Check,
  RotateCw,
  Sparkles,
  Layers,
  Calendar,
  Trash2,
  PlusCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Globe
} from 'lucide-react';

interface VocabularyViewProps {
  savedWordsList: SavedWord[];
  onSavedWordsUpdate: () => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  savedWordsList,
  onSavedWordsUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'oxford' | 'flashcards' | 'notebook'>('oxford');

  // Oxford explorer filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');

  // Flashcards state
  const [deckMode, setDeckMode] = useState<'due' | 'all'>('due');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  // Notebook state
  const [notebookStatusFilter, setNotebookStatusFilter] = useState<'all' | 'new' | 'learning' | 'mastered'>('all');
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [customWord, setCustomWord] = useState<string>('');
  const [customPos, setCustomPos] = useState<string>('noun');
  const [customLevel, setCustomLevel] = useState<CEFRLevel>('B1');
  const [customDefinition, setCustomDefinition] = useState<string>('');
  const [customArabic, setCustomArabic] = useState<string>('');
  const [customExample, setCustomExample] = useState<string>('');

  // Fast map of saved words
  const savedMap = useMemo(() => {
    const map = new Map<string, SavedWord>();
    for (const w of savedWordsList) {
      map.set(w.word.toLowerCase(), w);
    }
    return map;
  }, [savedWordsList]);

  // Oxford filtered list
  const filteredOxford = useMemo(() => {
    return OXFORD_WORDS.filter(w => {
      const matchSearch =
        w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.arabic.includes(searchQuery) ||
        w.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLevel = selectedLevel === 'all' || w.level === selectedLevel;
      const matchPos = selectedPos === 'all' || w.pos === selectedPos;
      return matchSearch && matchLevel && matchPos;
    });
  }, [searchQuery, selectedLevel, selectedPos]);

  // Flashcard Deck calculation
  const reviewDeck = useMemo(() => {
    const now = Date.now();
    if (deckMode === 'due') {
      const dueCards = savedWordsList.filter(w => w.dueDate <= now);
      return dueCards.length > 0 ? dueCards : savedWordsList;
    }
    return savedWordsList;
  }, [savedWordsList, deckMode]);

  const currentFlashcard = reviewDeck[currentCardIndex];

  // Handle Flashcard Review Rating (SM-2 Algorithm)
  const handleRateCard = (rating: ReviewRating) => {
    if (!currentFlashcard) return;

    const updates = calculateNextReview(currentFlashcard, rating);
    const updatedWord: SavedWord = {
      ...currentFlashcard,
      ...updates,
    };

    saveWord(updatedWord);
    updateUserStats({
      totalCardsReviewed: 1,
      wordsMastered: updatedWord.status === 'mastered' ? 1 : 0
    });
    onSavedWordsUpdate();

    setIsFlipped(false);
    if (currentCardIndex + 1 < reviewDeck.length) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  // Toggle saving an Oxford word
  const handleToggleSaveOxford = (w: OxfordWord) => {
    const isSaved = savedMap.has(w.word.toLowerCase());
    if (isSaved) {
      const entry = savedMap.get(w.word.toLowerCase());
      if (entry) removeSavedWord(entry.id);
    } else {
      const newSaved: SavedWord = {
        id: `saved-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        word: w.word,
        level: w.level,
        pos: w.pos,
        phonetic: w.phonetic,
        definition: w.definition,
        arabic: w.arabic,
        example: w.example,
        addedAt: Date.now(),
        dueDate: Date.now() + 86400000,
        repetitions: 0,
        intervalDays: 1,
        easeFactor: 2.5,
        status: 'new'
      };
      saveWord(newSaved);
    }
    onSavedWordsUpdate();
  };

  // Add custom user word
  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWord.trim() || !customDefinition.trim()) return;

    const newSaved: SavedWord = {
      id: `custom-word-${Date.now()}`,
      word: customWord.trim().toLowerCase(),
      level: customLevel,
      pos: customPos,
      definition: customDefinition.trim(),
      arabic: customArabic.trim() || 'ترجمة مخصصة',
      example: customExample.trim(),
      addedAt: Date.now(),
      dueDate: Date.now() + 86400000,
      repetitions: 0,
      intervalDays: 1,
      easeFactor: 2.5,
      status: 'new'
    };

    saveWord(newSaved);
    onSavedWordsUpdate();
    setShowAddCustomModal(false);
    setCustomWord('');
    setCustomDefinition('');
    setCustomArabic('');
    setCustomExample('');
  };

  const filteredNotebook = useMemo(() => {
    return savedWordsList.filter(w => {
      if (notebookStatusFilter === 'all') return true;
      return w.status === notebookStatusFilter;
    });
  }, [savedWordsList, notebookStatusFilter]);

  const dueCount = useMemo(() => {
    const now = Date.now();
    return savedWordsList.filter(w => w.dueDate <= now).length;
  }, [savedWordsList]);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Segmented Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookMarked className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Oxford 6,000 Vocabulary & Spaced Repetition
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Master high-frequency core vocabulary by CEFR level with SuperMemo SM-2 spaced repetition flashcards.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveTab('oxford')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'oxford'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Oxford Explorer
          </button>
          <button
            onClick={() => {
              setActiveTab('flashcards');
              setCurrentCardIndex(0);
              setIsFlipped(false);
              setSessionCompleted(false);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-blue-600" />
            SRS Flashcards
            {dueCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px]">
                {dueCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('notebook')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'notebook'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            My Notebook ({savedWordsList.length})
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. OXFORD 6,000 EXPLORER TAB */}
      {/* ======================================================== */}
      {activeTab === 'oxford' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search words by English or Arabic definition..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Level Filter */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
                {['all', 'A1', 'A2', 'B1', 'B2', 'C1'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      selectedLevel === lvl
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {lvl === 'all' ? 'All' : lvl}
                  </button>
                ))}
              </div>

              {/* POS Selector */}
              <select
                value={selectedPos}
                onChange={e => setSelectedPos(e.target.value)}
                className="text-xs py-1.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Parts of Speech</option>
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="adverb">Adverb</option>
              </select>
            </div>
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOxford.map(word => {
              const isSaved = savedMap.has(word.word.toLowerCase());

              return (
                <div
                  key={word.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                            {word.word}
                          </h3>
                          <button
                            onClick={() => speakEnglish(word.word)}
                            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition-colors"
                            title="Pronounce word"
                            aria-label={`Pronounce ${word.word}`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          <span>{word.phonetic}</span>
                          <span>•</span>
                          <span className="italic">{word.pos}</span>
                          <span>•</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">CEFR {word.level}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleSaveOxford(word)}
                        className={`p-2 rounded-xl transition-all ${
                          isSaved
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isSaved ? 'In your Flashcards' : 'Add to Flashcards'}
                        aria-label={isSaved ? 'Remove from Flashcards' : 'Add to Flashcards'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Arabic gloss block */}
                    <div className="px-3 py-2 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-xl flex items-center justify-between">
                      <span className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">Arabic</span>
                      <span className="font-arabic font-bold text-sm text-amber-950 dark:text-amber-200" dir="rtl">
                        {word.arabic}
                      </span>
                    </div>

                    {/* Definition */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                      {word.definition}
                    </p>

                    {/* Example */}
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-500 dark:text-slate-400 italic">
                      "{word.example}"
                    </div>
                  </div>

                  {/* Collocations if any */}
                  {word.collocations && word.collocations.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                      <strong className="text-slate-500 dark:text-slate-400">Collocations: </strong>
                      {word.collocations.join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredOxford.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No vocabulary found matching your filter criteria.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. SPACED REPETITION FLASHCARDS (SUPERMEMO SM-2) */}
      {/* ======================================================== */}
      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Deck selector and review counter */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Spaced Repetition Deck
              </h3>
              <p className="text-xs text-slate-500">
                {reviewDeck.length} cards in session ({dueCount} due for today)
              </p>
            </div>

            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => {
                  setDeckMode('due');
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                  setSessionCompleted(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  deckMode === 'due'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Due Today ({dueCount})
              </button>
              <button
                onClick={() => {
                  setDeckMode('all');
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                  setSessionCompleted(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  deckMode === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All Saved ({savedWordsList.length})
              </button>
            </div>
          </div>

          {/* Flashcard Area */}
          {reviewDeck.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold">No cards saved yet!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore the Oxford 6000 list or read literature/songs to save vocabulary to your spaced repetition deck.
              </p>
              <button
                onClick={() => setActiveTab('oxford')}
                className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold"
              >
                Browse Oxford 6000
              </button>
            </div>
          ) : sessionCompleted ? (
            <div className="p-10 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold">Session Completed!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You’ve reviewed all cards in this session. The SM-2 algorithm has rescheduled them based on your recall ratings.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                    setSessionCompleted(false);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold"
                >
                  Restart Review Deck
                </button>
              </div>
            </div>
          ) : currentFlashcard ? (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Card {currentCardIndex + 1} of {reviewDeck.length}</span>
                <span className="capitalize font-medium text-blue-600">Status: {currentFlashcard.status}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / reviewDeck.length) * 100}%` }}
                />
              </div>

              {/* 3D Flip Flashcard */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between items-center text-center transition-all hover:border-blue-400/60 relative select-none"
              >
                <div className="w-full flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">CEFR {currentFlashcard.level}</span>
                  <span className="italic">{isFlipped ? 'Answer View' : 'Question View (Click to Flip)'}</span>
                </div>

                {/* Card Front vs Back */}
                {!isFlipped ? (
                  <div className="my-auto space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">
                      {currentFlashcard.word}
                    </h2>
                    {currentFlashcard.phonetic && (
                      <p className="text-sm font-mono text-slate-500">{currentFlashcard.phonetic}</p>
                    )}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakEnglish(currentFlashcard.word);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      Listen
                    </button>
                  </div>
                ) : (
                  <div className="my-auto space-y-4 max-w-lg">
                    {/* Arabic Meaning */}
                    <div className="p-3 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                      <span className="text-[11px] text-amber-800 dark:text-amber-400 block mb-0.5">Arabic Translation</span>
                      <p className="font-arabic text-2xl font-bold text-amber-950 dark:text-amber-200" dir="rtl">
                        {currentFlashcard.arabic}
                      </p>
                    </div>

                    {/* Definition */}
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {currentFlashcard.definition}
                    </p>

                    {/* Context sentence */}
                    {currentFlashcard.example && (
                      <p className="text-xs text-slate-500 italic bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        "{currentFlashcard.example}"
                      </p>
                    )}
                  </div>
                )}

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <RotateCw className="w-3 h-3" />
                  Tap anywhere on card to flip
                </div>
              </div>

              {/* SM-2 Rating Controls (Shown after flip) */}
              {isFlipped ? (
                <div className="space-y-2 pt-2 animate-in fade-in">
                  <p className="text-xs text-center font-medium text-slate-500">
                    How well did you recall this word? (Reschedules review interval)
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleRateCard('again')}
                      className="p-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800 transition-colors"
                    >
                      Again
                      <span className="block text-[10px] font-normal text-rose-500">1 day</span>
                    </button>
                    <button
                      onClick={() => handleRateCard('hard')}
                      className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800 transition-colors"
                    >
                      Hard
                      <span className="block text-[10px] font-normal text-amber-500">2-3 days</span>
                    </button>
                    <button
                      onClick={() => handleRateCard('good')}
                      className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 transition-colors"
                    >
                      Good
                      <span className="block text-[10px] font-normal text-blue-500">5-6 days</span>
                    </button>
                    <button
                      onClick={() => handleRateCard('easy')}
                      className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 transition-colors"
                    >
                      Easy
                      <span className="block text-[10px] font-normal text-emerald-500">10+ days</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
                  >
                    Reveal Definition & Arabic
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. MY SAVED NOTEBOOK TAB */}
      {/* ======================================================== */}
      {activeTab === 'notebook' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Status filters */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start">
              {[
                { id: 'all', label: `All (${savedWordsList.length})` },
                { id: 'new', label: 'New' },
                { id: 'learning', label: 'Learning' },
                { id: 'mastered', label: 'Mastered' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setNotebookStatusFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    notebookStatusFilter === tab.id
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddCustomModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Add Custom Word
            </button>
          </div>

          {/* Saved words table / cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotebook.map(w => (
              <div
                key={w.id}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white capitalize">
                          {w.word}
                        </h4>
                        <button
                          onClick={() => speakEnglish(w.word)}
                          className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 p-1 rounded-full"
                          title="Listen"
                          aria-label={`Listen to ${w.word}`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        {w.phonetic && <span>{w.phonetic}</span>}
                        <span>•</span>
                        <span>CEFR {w.level}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                      w.status === 'mastered'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : w.status === 'learning'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {w.status}
                    </span>
                  </div>

                  <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-xl">
                    <p className="font-arabic font-bold text-sm text-amber-950 dark:text-amber-200 text-right" dir="rtl">
                      {w.arabic}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {w.definition}
                  </p>

                  {w.notes && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 p-2 rounded-lg italic">
                      Note: {w.notes}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Repetitions: {w.repetitions}</span>
                  <button
                    onClick={() => {
                      removeSavedWord(w.id);
                      onSavedWordsUpdate();
                    }}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove from notebook"
                    aria-label={`Remove ${w.word} from notebook`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredNotebook.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No saved vocabulary matching this status filter.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. ADD CUSTOM WORD MODAL */}
      {/* ======================================================== */}
      {showAddCustomModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold mb-1">Add Custom Vocabulary</h3>
            <p className="text-xs text-slate-500 mb-4">
              Save any word you encountered in personal studies with your own definition and Arabic notes.
            </p>

            <form onSubmit={handleAddCustomWord} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1">English Word</label>
                <input
                  type="text"
                  required
                  value={customWord}
                  onChange={e => setCustomWord(e.target.value)}
                  placeholder="e.g. serendipity"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Part of Speech</label>
                  <select
                    value={customPos}
                    onChange={e => setCustomPos(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  >
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                    <option value="phrase">Phrase / Idiom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">CEFR Level</label>
                  <select
                    value={customLevel}
                    onChange={e => setCustomLevel(e.target.value as CEFRLevel)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Arabic Translation</label>
                <input
                  type="text"
                  value={customArabic}
                  onChange={e => setCustomArabic(e.target.value)}
                  placeholder="e.g. مصادفة حسنة / توفيق غير متوقع"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none font-arabic text-right"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">English Definition</label>
                <textarea
                  required
                  rows={2}
                  value={customDefinition}
                  onChange={e => setCustomDefinition(e.target.value)}
                  placeholder="The occurrence of events by chance in a happy or beneficial way."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Example Sentence (Optional)</label>
                <input
                  type="text"
                  value={customExample}
                  onChange={e => setCustomExample(e.target.value)}
                  placeholder="A fortunate stroke of serendipity."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none italic"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs"
                >
                  Save to Flashcards
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
