import React, { useState, useMemo } from 'react';
import { Song, PodcastEpisode, SavedWord, LyricsLine } from '../types';
import { SONGS_LIBRARY } from '../data/songs';
import { PODCASTS_LIBRARY } from '../data/podcasts';
import { WordPopup } from './WordPopup';
import { cleanWord, speakEnglish } from '../services/translator';
import { updateUserStats } from '../services/storage';
import {
  Music,
  Headphones,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Globe,
  Volume2,
  ExternalLink,
  Search,
  Filter,
  Check,
  Award
} from 'lucide-react';

interface ListeningViewProps {
  savedWordsList: SavedWord[];
  onSavedWordsUpdate: () => void;
}

export const ListeningView: React.FC<ListeningViewProps> = ({
  savedWordsList,
  onSavedWordsUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'songs' | 'podcasts'>('songs');

  // Songs state
  const [selectedSong, setSelectedSong] = useState<Song>(SONGS_LIBRARY[0]);
  const [songExerciseMode, setSongExerciseMode] = useState<'lyrics' | 'cloze' | 'quiz'>('lyrics');
  const [showArabicLyrics, setShowArabicLyrics] = useState<boolean>(true);
  const [clozeAnswers, setClozeAnswers] = useState<Record<string, string>>({});
  const [clozeFeedback, setClozeFeedback] = useState<Record<string, boolean>>({});
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState<Record<string, string>>({});

  // Podcasts state
  const [selectedPodcast, setSelectedPodcast] = useState<PodcastEpisode>(PODCASTS_LIBRARY[0]);
  const [podcastQuizAnswers, setPodcastQuizAnswers] = useState<Record<number, number>>({});
  const [showArabicTranscript, setShowArabicTranscript] = useState<boolean>(true);

  // Word popup
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [contextSentence, setContextSentence] = useState<string | undefined>(undefined);

  // Set of saved words for underlining
  const savedSet = useMemo(() => {
    return new Set(savedWordsList.map(w => w.word.toLowerCase().trim()));
  }, [savedWordsList]);

  // Handle Cloze verification
  const handleVerifyCloze = (lineId: string, wordIdx: number, expectedWord: string) => {
    const key = `${lineId}-${wordIdx}`;
    const userVal = (clozeAnswers[key] || '').trim().toLowerCase();
    const isCorrect = userVal === cleanWord(expectedWord);
    setClozeFeedback(prev => ({ ...prev, [key]: isCorrect }));

    if (isCorrect) {
      updateUserStats({ quizzesCompleted: 1 });
    }
  };

  const handleSelectQuiz = (exId: string, opt: string) => {
    setQuizSelectedAnswers(prev => ({ ...prev, [exId]: opt }));
  };

  const renderClickableLyricLine = (line: LyricsLine) => {
    const tokens = line.text.split(/(\s+|[.,!?;:—"“”()]+)/);

    return (
      <span className="leading-relaxed">
        {tokens.map((token, tIdx) => {
          const isWord = /^[a-zA-Z0-9'-]+$/.test(token);
          if (!isWord) return <span key={tIdx}>{token}</span>;

          const normalized = cleanWord(token);
          const isSaved = savedSet.has(normalized);

          return (
            <span
              key={tIdx}
              onClick={() => {
                setSelectedWord(token);
                setContextSentence(line.text);
              }}
              className={`inline-block cursor-pointer px-0.5 rounded-xs transition-colors ${
                isSaved
                  ? 'saved-vocab-highlight text-blue-700 dark:text-blue-300 font-medium'
                  : 'hover:bg-amber-100/70 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              title={isSaved ? `Saved word: "${normalized}"` : `Click to define "${token}"`}
            >
              {token}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Headphones className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Listening Immersion
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Train your ear with popular music across all eras, fill-in-the-blank listening challenges, and native English podcasts.
          </p>
        </div>

        {/* Segmented Tab Control */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('songs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'songs'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Music className="w-4 h-4 text-rose-500" />
            Songs & Interactive Lyrics
          </button>
          <button
            onClick={() => setActiveTab('podcasts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'podcasts'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Headphones className="w-4 h-4 text-indigo-500" />
            Podcasts & Transcripts
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. SONGS TAB */}
      {/* ======================================================== */}
      {activeTab === 'songs' && (
        <div className="space-y-8">
          {/* Songs Selector Carousel */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Featured Tracks Across Genres
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SONGS_LIBRARY.map(song => (
                <button
                  key={song.id}
                  onClick={() => {
                    setSelectedSong(song);
                    setClozeAnswers({});
                    setClozeFeedback({});
                    setQuizSelectedAnswers({});
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    selectedSong.id === song.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>{song.genre}</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{song.level}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {song.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {song.artist} ({song.year})
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Song Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Official YouTube Embed + Track Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                {/* Responsive 16:9 Video Embed */}
                <div className="relative aspect-video w-full bg-slate-950">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedSong.youtubeId}?enablejsapi=1&rel=0`}
                    title={`${selectedSong.title} - ${selectedSong.artist}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {selectedSong.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {selectedSong.artist} • {selectedSong.year} • {selectedSong.genre}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs">
                      {selectedSong.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedSong.summary}
                  </p>

                  {selectedSong.spotifyUri && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                      <span>Available on Spotify</span>
                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(`${selectedSong.title} ${selectedSong.artist}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        Open Spotify <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Study Mode Switcher */}
              <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center text-xs font-semibold">
                <button
                  onClick={() => setSongExerciseMode('lyrics')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    songExerciseMode === 'lyrics'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Interactive Lyrics
                </button>
                <button
                  onClick={() => setSongExerciseMode('cloze')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    songExerciseMode === 'cloze'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Cloze Listening Test
                </button>
                <button
                  onClick={() => setSongExerciseMode('quiz')}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    songExerciseMode === 'quiz'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Song Quiz ({selectedSong.exercises.length})
                </button>
              </div>
            </div>

            {/* Right Column: Lyrics / Cloze / Quiz Engine */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs min-h-[500px]">
              {/* Option A: Interactive Lyrics Mode */}
              {songExerciseMode === 'lyrics' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Synchronized Lyrics Explorer
                      </h4>
                      <p className="text-xs text-slate-500">
                        Click any English word for dictionary definition, pronunciation & Arabic translation.
                      </p>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={showArabicLyrics}
                        onChange={e => setShowArabicLyrics(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-0"
                      />
                      <span>Arabic Subtitles</span>
                    </label>
                  </div>

                  <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
                    {selectedSong.lyrics.map(line => (
                      <div
                        key={line.id}
                        className="group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-base font-medium text-slate-800 dark:text-slate-100">
                            {renderClickableLyricLine(line)}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                            {Math.floor(line.timeSeconds / 60)}:{(line.timeSeconds % 60).toString().padStart(2, '0')}
                          </span>
                        </div>

                        {showArabicLyrics && line.arabic && (
                          <p className="font-arabic text-xs font-medium text-amber-800 dark:text-amber-400 mt-1 text-right" dir="rtl">
                            {line.arabic}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Option B: Cloze / Fill-in-the-Blank Listening Test */}
              {songExerciseMode === 'cloze' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-blue-600" />
                      Listening Cloze Challenge
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Listen to the audio and fill in the missing words accurately. Test your phonetic recognition!
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
                    {selectedSong.lyrics.map(line => {
                      const words = line.text.split(' ');
                      const blanks = line.blankWords || [];

                      return (
                        <div
                          key={line.id}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2"
                        >
                          <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
                            {words.map((w, wIdx) => {
                              const cleaned = cleanWord(w);
                              const isBlank = blanks.includes(cleaned);
                              const fieldKey = `${line.id}-${wIdx}`;
                              const userVal = clozeAnswers[fieldKey] || '';
                              const isCorrect = clozeFeedback[fieldKey];

                              if (isBlank) {
                                return (
                                  <span key={wIdx} className="inline-flex items-center gap-1">
                                    <input
                                      type="text"
                                      value={userVal}
                                      onChange={e => {
                                        setClozeAnswers(prev => ({ ...prev, [fieldKey]: e.target.value }));
                                      }}
                                      onBlur={() => handleVerifyCloze(line.id, wIdx, cleaned)}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter') handleVerifyCloze(line.id, wIdx, cleaned);
                                      }}
                                      placeholder="_____"
                                      className={`w-24 px-2 py-1 text-xs text-center font-bold rounded-lg border focus:outline-none ${
                                        isCorrect === true
                                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                          : isCorrect === false
                                          ? 'border-rose-400 bg-rose-50 text-rose-800'
                                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                                      }`}
                                    />
                                    {isCorrect === true && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                  </span>
                                );
                              }
                              return <span key={wIdx}>{w}</span>;
                            })}
                          </div>

                          {line.arabic && (
                            <p className="font-arabic text-xs text-slate-400 dark:text-slate-500 text-right" dir="rtl">
                              {line.arabic}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Option C: Song Comprehension & Idioms Quiz */}
              {songExerciseMode === 'quiz' && (
                <div className="space-y-6">
                  <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      Lyric Comprehension & Metaphor Quiz
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Check your deeper understanding of the lyrics, cultural idioms, and poetic figures of speech.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {selectedSong.exercises.map((ex, exIdx) => {
                      const userChoice = quizSelectedAnswers[ex.id];
                      const isSubmitted = !!userChoice;
                      const isCorrect = userChoice === ex.correctAnswer;

                      return (
                        <div
                          key={ex.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                        >
                          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            Question {exIdx + 1}
                          </div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {ex.prompt}
                          </p>

                          <div className="space-y-2">
                            {ex.options?.map((opt, optIdx) => {
                              const isThisSelected = userChoice === opt;
                              const isThisCorrect = opt === ex.correctAnswer;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectQuiz(ex.id, opt)}
                                  className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                                    isThisSelected
                                      ? isThisCorrect
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {isSubmitted && (
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
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PODCASTS TAB */}
      {/* ======================================================== */}
      {activeTab === 'podcasts' && (
        <div className="space-y-8">
          {/* Podcast Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PODCASTS_LIBRARY.map(pod => (
              <button
                key={pod.id}
                onClick={() => {
                  setSelectedPodcast(pod);
                  setPodcastQuizAnswers({});
                }}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  selectedPodcast.id === pod.id
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{pod.show}</span>
                  <span>Level {pod.level}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {pod.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {pod.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Host: {pod.host}</span>
                  <span>{pod.durationMinutes} mins</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Podcast Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Player & Vocabulary Overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 space-y-4 shadow-xs">
                {selectedPodcast.youtubeId && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedPodcast.youtubeId}?enablejsapi=1&rel=0`}
                      title={selectedPodcast.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                    <span>{selectedPodcast.show}</span>
                    <span>•</span>
                    <span>{selectedPodcast.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedPodcast.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Presented by {selectedPodcast.host}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedPodcast.description}
                </p>

                {/* Spotify direct link */}
                <a
                  href={selectedPodcast.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Headphones className="w-4 h-4" />
                  Listen Episode on Spotify
                </a>
              </div>

              {/* Target Key Vocabulary in Episode */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Vocabulary in this Episode
                </h4>
                <div className="space-y-2.5">
                  {selectedPodcast.vocabulary.map((vocab, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white capitalize">
                            {vocab.word}
                          </span>
                          <button
                            onClick={() => speakEnglish(vocab.word)}
                            className="text-slate-400 hover:text-blue-600 p-0.5"
                            title="Pronounce word"
                            aria-label={`Pronounce ${vocab.word}`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                          {vocab.definition}
                        </p>
                      </div>

                      <span className="font-arabic font-semibold text-amber-700 dark:text-amber-400 shrink-0 text-right" dir="rtl">
                        {vocab.arabic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transcript & Interactive Comprehension Quiz */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
              {/* Transcript Section */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Interactive Episode Transcript
                    </h4>
                    <p className="text-xs text-slate-500">
                      Click any word to examine definition, phonetics, and Arabic translation.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={showArabicTranscript}
                      onChange={e => setShowArabicTranscript(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span>Arabic Line Translation</span>
                  </label>
                </div>

                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                  {selectedPodcast.transcript.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                        <span>{line.speaker}</span>
                        <span className="font-mono text-[11px] text-slate-400">{line.time}</span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                        {line.text.split(/(\s+|[.,!?;:—"“”()]+)/).map((tok, tIdx) => {
                          const isWord = /^[a-zA-Z0-9'-]+$/.test(tok);
                          if (!isWord) return <span key={tIdx}>{tok}</span>;

                          const cleaned = cleanWord(tok);
                          const isSaved = savedSet.has(cleaned);

                          return (
                            <span
                              key={tIdx}
                              onClick={() => {
                                setSelectedWord(tok);
                                setContextSentence(line.text);
                              }}
                              className={`cursor-pointer px-0.5 rounded-xs transition-colors ${
                                isSaved
                                  ? 'saved-vocab-highlight text-blue-700 dark:text-blue-300 font-medium'
                                  : 'hover:bg-amber-100/70 dark:hover:bg-slate-700 hover:text-blue-600'
                              }`}
                            >
                              {tok}
                            </span>
                          );
                        })}
                      </p>

                      {showArabicTranscript && line.arabic && (
                        <p className="font-arabic text-xs font-medium text-amber-800 dark:text-amber-400 mt-1.5 text-right" dir="rtl">
                          {line.arabic}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehension Quiz */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Comprehension Check
                </h4>

                <div className="space-y-4">
                  {selectedPodcast.comprehensionQuiz.map((q, qIdx) => {
                    const selectedOpt = podcastQuizAnswers[qIdx];
                    const hasAnswered = selectedOpt !== undefined;
                    const isCorrect = selectedOpt === q.answerIndex;

                    return (
                      <div
                        key={qIdx}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 text-xs"
                      >
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {qIdx + 1}. {q.question}
                        </p>

                        <div className="space-y-1.5">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = selectedOpt === oIdx;
                            const isAnswer = oIdx === q.answerIndex;

                            return (
                              <button
                                key={oIdx}
                                onClick={() => setPodcastQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                                className={`w-full text-left p-2.5 rounded-lg border font-medium transition-all ${
                                  isChosen
                                    ? isAnswer
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800'
                                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-800'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && (
                          <div className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                              : 'bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300'
                          }`}>
                            <span className="font-bold">{isCorrect ? 'Correct! ' : 'Note: '}</span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Word Popup Modal */}
      {selectedWord && (
        <WordPopup
          word={selectedWord}
          sourceTitle={activeTab === 'songs' ? selectedSong.title : selectedPodcast.title}
          sourceContext={contextSentence}
          onClose={() => setSelectedWord(null)}
          onSavedChange={onSavedWordsUpdate}
        />
      )}
    </div>
  );
};
