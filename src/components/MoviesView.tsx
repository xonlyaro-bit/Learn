import React, { useState, useMemo } from 'react';
import { MovieScene, SavedWord } from '../types';
import { MOVIES_LIBRARY } from '../data/movies';
import { WordPopup } from './WordPopup';
import { cleanWord, speakEnglish } from '../services/translator';
import { updateUserStats } from '../services/storage';
import {
  Film,
  Tv,
  Sparkles,
  Volume2,
  CheckCircle,
  HelpCircle,
  Play,
  Mic,
  MessageSquare,
  BookMarked,
  Lightbulb,
  Check
} from 'lucide-react';

interface MoviesViewProps {
  savedWordsList: SavedWord[];
  onSavedWordsUpdate: () => void;
}

export const MoviesView: React.FC<MoviesViewProps> = ({
  savedWordsList,
  onSavedWordsUpdate,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'cartoon' | 'tv_series'>('all');
  const [selectedScene, setSelectedScene] = useState<MovieScene>(MOVIES_LIBRARY[0]);
  const [showArabicDialogue, setShowArabicDialogue] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'dialogue' | 'idioms' | 'quiz' | 'shadowing'>('dialogue');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  // Shadowing practice state
  const [shadowIndex, setShadowIndex] = useState<number>(0);
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [practicedLines, setPracticedLines] = useState<Set<number>>(new Set());

  // Word Popup
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [contextSentence, setContextSentence] = useState<string | undefined>(undefined);

  // Filtered scenes
  const filteredScenes = useMemo(() => {
    if (filterType === 'all') return MOVIES_LIBRARY;
    return MOVIES_LIBRARY.filter(s => s.mediaType === filterType);
  }, [filterType]);

  // Saved words set
  const savedSet = useMemo(() => {
    return new Set(savedWordsList.map(w => w.word.toLowerCase().trim()));
  }, [savedWordsList]);

  const handleSelectQuiz = (exId: string, optIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [exId]: optIdx }));
    updateUserStats({ quizzesCompleted: 1 });
  };

  const handleCompleteShadowLine = (idx: number) => {
    const updated = new Set(practicedLines);
    updated.add(idx);
    setPracticedLines(updated);
  };

  const currentShadowLine = selectedScene.dialogue[shadowIndex];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Film className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            Movies, TV & Cartoons
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Master conversational nuance, idioms, and natural slang through memorable cinema scenes and animation.
          </p>
        </div>

        {/* Media Type Filter */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          {[
            { id: 'all', label: 'All Scenes' },
            { id: 'cartoon', label: 'Cartoons' },
            { id: 'movie', label: 'Movies' },
            { id: 'tv_series', label: 'TV Shows' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterType === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenes Carousel / Selector */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Select a Scene to Study ({filteredScenes.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredScenes.map(scene => (
            <div
              key={scene.id}
              onClick={() => {
                setSelectedScene(scene);
                setQuizAnswers({});
                setShadowIndex(0);
                setPracticedLines(new Set());
              }}
              className={`group cursor-pointer rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                selectedScene.id === scene.id
                  ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="capitalize font-semibold text-rose-600 dark:text-rose-400">
                    {scene.mediaType.replace('_', ' ')}
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">CEFR {scene.level}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-rose-600 transition-colors">
                  {scene.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {scene.mediaTitle} ({scene.releaseYear})
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {scene.description}
                </p>
              </div>

              <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>{scene.keyIdioms.length} Key Idioms</span>
                <span>{scene.dialogue.length} Lines</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Cinema Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Embed & Scene Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="relative aspect-video w-full bg-slate-950">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedScene.youtubeId}?enablejsapi=1&rel=0`}
                title={`${selectedScene.title} - ${selectedScene.mediaTitle}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedScene.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedScene.mediaTitle} ({selectedScene.releaseYear}) • {selectedScene.genre}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold text-xs">
                  {selectedScene.level}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedScene.description}
              </p>
            </div>
          </div>

          {/* Scene Action Tabs */}
          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                activeTab === 'dialogue'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Dialogue ({selectedScene.dialogue.length})
            </button>
            <button
              onClick={() => setActiveTab('idioms')}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                activeTab === 'idioms'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Idioms ({selectedScene.keyIdioms.length})
            </button>
            <button
              onClick={() => setActiveTab('shadowing')}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                activeTab === 'shadowing'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Shadow Speaking
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-2 rounded-lg text-center transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Quiz ({selectedScene.exercises.length})
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Workspace */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs min-h-[480px]">
          {/* ======================================= */}
          {/* A. DIALOGUE SCRIPT VIEW */}
          {/* ======================================= */}
          {activeTab === 'dialogue' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Scene Transcript & Speech Practice
                  </h4>
                  <p className="text-xs text-slate-500">
                    Click any word for instant dictionary definitions, phonetics, and Arabic translations.
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showArabicDialogue}
                    onChange={e => setShowArabicDialogue(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-0"
                  />
                  <span>Arabic Translation</span>
                </label>
              </div>

              <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                {selectedScene.dialogue.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-rose-600 dark:text-rose-400">
                          {item.character}
                        </span>
                        <button
                          onClick={() => speakEnglish(item.line)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                          title="Listen to line (TTS)"
                          aria-label={`Listen to ${item.character}'s line`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.timestamp && (
                        <span className="font-mono text-[11px] text-slate-400">{item.timestamp}</span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {item.line.split(/(\s+|[.,!?;:—"“”()]+)/).map((token, tIdx) => {
                        const isWord = /^[a-zA-Z0-9'-]+$/.test(token);
                        if (!isWord) return <span key={tIdx}>{token}</span>;

                        const normalized = cleanWord(token);
                        const isSaved = savedSet.has(normalized);

                        return (
                          <span
                            key={tIdx}
                            onClick={() => {
                              setSelectedWord(token);
                              setContextSentence(item.line);
                            }}
                            className={`cursor-pointer px-0.5 rounded-xs transition-colors ${
                              isSaved
                                ? 'saved-vocab-highlight text-blue-700 dark:text-blue-300 font-medium'
                                : 'hover:bg-amber-100/70 dark:hover:bg-slate-700 hover:text-blue-600'
                            }`}
                          >
                            {token}
                          </span>
                        );
                      })}
                    </p>

                    {showArabicDialogue && item.arabic && (
                      <p className="font-arabic text-xs font-medium text-amber-800 dark:text-amber-400 mt-1 text-right" dir="rtl">
                        {item.arabic}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* B. IDIOMS BREAKDOWN */}
          {/* ======================================= */}
          {activeTab === 'idioms' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Key Idioms & Cultural Phrases in this Scene
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Idiomatic expressions used naturally by native speakers. Save them to your notebook!
                </p>
              </div>

              <div className="space-y-4">
                {selectedScene.keyIdioms.map((idiom, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                            "{idiom.phrase}"
                          </h5>
                          <button
                            onClick={() => speakEnglish(idiom.phrase)}
                            className="text-slate-400 hover:text-blue-600"
                            title="Listen"
                            aria-label={`Listen to ${idiom.phrase}`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                          <strong className="text-slate-700 dark:text-slate-200">Meaning:</strong> {idiom.englishMeaning}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-arabic font-bold text-sm text-amber-800 dark:text-amber-400" dir="rtl">
                          {idiom.arabicMeaning}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 text-xs italic text-slate-500 dark:text-slate-400">
                      In the scene: {idiom.exampleInContext}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* C. SHADOW SPEAKING PRACTICE */}
          {/* ======================================= */}
          {activeTab === 'shadowing' && currentShadowLine && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-rose-500" />
                  Dialogue Shadowing & Enunciation
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Listen to the native line, imitate the intonation, and speak aloud to build vocal muscle memory.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 text-center space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {currentShadowLine.character} • Line {shadowIndex + 1} of {selectedScene.dialogue.length}
                </span>

                <blockquote className="text-lg md:text-xl font-medium text-slate-900 dark:text-white leading-relaxed max-w-xl mx-auto">
                  "{currentShadowLine.line}"
                </blockquote>

                {currentShadowLine.arabic && (
                  <p className="font-arabic text-sm font-semibold text-amber-800 dark:text-amber-400" dir="rtl">
                    {currentShadowLine.arabic}
                  </p>
                )}

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => speakEnglish(currentShadowLine.line, 0.85)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    Listen to Character Audio
                  </button>

                  <button
                    onClick={() => {
                      setIsPracticing(true);
                      setTimeout(() => {
                        setIsPracticing(false);
                        handleCompleteShadowLine(shadowIndex);
                      }, 2500);
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isPracticing
                        ? 'bg-rose-500 text-white animate-pulse'
                        : practicedLines.has(shadowIndex)
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-rose-400'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    {isPracticing ? 'Speaking...' : practicedLines.has(shadowIndex) ? 'Line Mastered!' : 'Speak & Repeat'}
                  </button>
                </div>
              </div>

              {/* Navigation between lines */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={shadowIndex === 0}
                  onClick={() => setShadowIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                >
                  Previous Line
                </button>
                <div className="text-xs font-medium text-slate-500">
                  {practicedLines.size} of {selectedScene.dialogue.length} practiced
                </div>
                <button
                  disabled={shadowIndex >= selectedScene.dialogue.length - 1}
                  onClick={() => setShadowIndex(prev => Math.min(selectedScene.dialogue.length - 1, prev + 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                >
                  Next Line
                </button>
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* D. SCENE COMPREHENSION QUIZ */}
          {/* ======================================= */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Scene Comprehension & Subtext Quiz
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Analyze character intent, themes, and idiomatic meaning in this cinematic moment.
                </p>
              </div>

              <div className="space-y-6">
                {selectedScene.exercises.map((ex, exIdx) => {
                  const userChoice = quizAnswers[ex.id];
                  const hasAnswered = userChoice !== undefined;
                  const isCorrect = userChoice === ex.correctIndex;

                  return (
                    <div
                      key={ex.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 text-xs"
                    >
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {exIdx + 1}. {ex.question}
                      </p>

                      <div className="space-y-1.5">
                        {ex.options.map((opt, oIdx) => {
                          const isSelected = userChoice === oIdx;
                          const isAnswer = oIdx === ex.correctIndex;

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectQuiz(ex.id, oIdx)}
                              className={`w-full text-left p-3 rounded-lg border font-medium transition-all ${
                                isSelected
                                  ? isAnswer
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800'
                                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                            : 'bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300'
                        }`}>
                          <span className="font-bold">{isCorrect ? 'Correct! ' : 'Explanation: '}</span>
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Word Popup */}
      {selectedWord && (
        <WordPopup
          word={selectedWord}
          sourceTitle={selectedScene.mediaTitle}
          sourceContext={contextSentence}
          onClose={() => setSelectedWord(null)}
          onSavedChange={onSavedWordsUpdate}
        />
      )}
    </div>
  );
};
