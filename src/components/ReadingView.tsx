import React, { useState, useEffect, useMemo } from 'react';
import { Book, Bookmark, SavedWord, ReaderSettings, CEFRLevel } from '../types';
import { BOOKS_LIBRARY } from '../data/books';
import { InteractiveText } from './InteractiveText';
import { WordPopup } from './WordPopup';
import {
  getSavedWords,
  getBookmarks,
  saveBookmark,
  removeBookmark,
  getReaderSettings,
  saveReaderSettings,
  getCustomBooks,
  saveCustomBook,
  updateUserStats
} from '../services/storage';
import {
  BookOpen,
  Bookmark as BookmarkIcon,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Type,
  Sun,
  Moon,
  Sparkles,
  PlusCircle,
  Search,
  Check,
  Volume2,
  Share2,
  FileText
} from 'lucide-react';
import { speakEnglish } from '../services/translator';

interface ReadingViewProps {
  onWordClickGlobal?: (word: string) => void;
  savedWordsList: SavedWord[];
  onSavedWordsUpdate: () => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({
  savedWordsList,
  onSavedWordsUpdate,
}) => {
  const [allBooks, setAllBooks] = useState<Book[]>(() => {
    const custom = getCustomBooks();
    return [...BOOKS_LIBRARY, ...custom];
  });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [contextSentence, setContextSentence] = useState<string | undefined>(undefined);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  // Reader Settings
  const [settings, setSettings] = useState<ReaderSettings>(() => getReaderSettings());
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getBookmarks());

  // Custom Book Importer Modal
  const [showImporter, setShowImporter] = useState<boolean>(false);
  const [importTitle, setImportTitle] = useState<string>('');
  const [importAuthor, setImportAuthor] = useState<string>('');
  const [importContent, setImportContent] = useState<string>('');
  const [importLevel, setImportLevel] = useState<CEFRLevel>('B1');

  // Update reading time in stats
  useEffect(() => {
    if (!selectedBook) return;
    const timer = setInterval(() => {
      updateUserStats({ readingMinutes: 1 });
    }, 60000);
    return () => clearInterval(timer);
  }, [selectedBook]);

  // Handle bookmarking
  const isBookmarked = useMemo(() => {
    if (!selectedBook) return false;
    const currentChapter = selectedBook.chapters[activeChapterIndex];
    return bookmarks.some(b => b.bookId === selectedBook.id && b.chapterId === currentChapter?.id);
  }, [bookmarks, selectedBook, activeChapterIndex]);

  const handleToggleBookmark = () => {
    if (!selectedBook) return;
    const currentChapter = selectedBook.chapters[activeChapterIndex];
    if (!currentChapter) return;

    if (isBookmarked) {
      const updated = removeBookmark(selectedBook.id);
      setBookmarks(updated);
    } else {
      const newBm: Bookmark = {
        bookId: selectedBook.id,
        chapterId: currentChapter.id,
        paragraphIndex: 0,
        savedAt: Date.now(),
        title: selectedBook.title,
        author: selectedBook.author,
      };
      const updated = saveBookmark(newBm);
      setBookmarks(updated);
    }
  };

  const handleUpdateSettings = (partial: Partial<ReaderSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    saveReaderSettings(updated);
  };

  // Filtered books
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const matchSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLevel = selectedLevel === 'all' || book.level === selectedLevel;
      const matchGenre = selectedGenre === 'all' || book.genre.toLowerCase() === selectedGenre.toLowerCase();
      return matchSearch && matchLevel && matchGenre;
    });
  }, [allBooks, searchQuery, selectedLevel, selectedGenre]);

  const handleCreateCustomBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importTitle.trim() || !importContent.trim()) return;

    const newBook: Book = {
      id: `custom-${Date.now()}`,
      title: importTitle.trim(),
      author: importAuthor.trim() || 'Imported Text',
      year: new Date().getFullYear(),
      level: importLevel,
      genre: 'Classic',
      coverGradient: 'from-blue-800 via-indigo-900 to-slate-950',
      summary: importContent.substring(0, 140) + '...',
      description: 'Custom imported literature text or Project Gutenberg excerpt.',
      wordCount: importContent.split(/\s+/).length,
      tags: ['Custom Import', 'Reader'],
      chapters: [
        {
          id: `custom-ch-1`,
          chapterNum: 1,
          title: 'Section 1',
          content: importContent.trim(),
        }
      ]
    };

    const updated = saveCustomBook(newBook);
    setAllBooks([...BOOKS_LIBRARY, ...updated]);
    setSelectedBook(newBook);
    setActiveChapterIndex(0);
    setShowImporter(false);
    setImportTitle('');
    setImportAuthor('');
    setImportContent('');
  };

  const currentChapter = selectedBook?.chapters[activeChapterIndex];

  // Reader theme CSS classes
  const getThemeClass = () => {
    if (settings.theme === 'dark') return 'bg-slate-950 text-slate-100 border-slate-800';
    if (settings.theme === 'sepia') return 'bg-[#fbf0d9] text-[#433422] border-[#ecd9be]';
    return 'bg-white text-slate-900 border-slate-200';
  };

  return (
    <div className="w-full">
      {/* ==================================================== */}
      {/* 1. READER VIEW (WHEN A BOOK IS OPEN) */}
      {/* ==================================================== */}
      {selectedBook && currentChapter ? (
        <div className={`min-h-[85vh] rounded-2xl border transition-colors shadow-sm flex flex-col ${getThemeClass()}`}>
          {/* Reader Top Bar */}
          <div className="sticky top-0 z-30 px-4 md:px-8 py-3.5 border-b backdrop-blur-md bg-opacity-95 flex items-center justify-between">
            <button
              onClick={() => setSelectedBook(null)}
              className="flex items-center gap-1 text-xs font-medium opacity-80 hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </button>

            <div className="text-center truncate px-4 max-w-md">
              <h2 className="text-sm font-bold tracking-tight truncate">{selectedBook.title}</h2>
              <div className="flex items-center justify-center gap-2 text-[11px] opacity-75">
                <span>{selectedBook.author}</span>
                <span>•</span>
                <span>Level {selectedBook.level}</span>
                <span>•</span>
                <span>Ch. {currentChapter.chapterNum} of {selectedBook.chapters.length}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/40'
                    : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark this chapter'}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
              >
                <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => speakEnglish(currentChapter.content.substring(0, 300))}
                className="p-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Listen to opening narration (TTS)"
                aria-label="Listen to opening narration"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
                className="p-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Reader display settings"
                aria-label="Reader display settings"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Reader Settings Drawer */}
          {showSettingsDrawer && (
            <div className="border-b px-4 md:px-8 py-3 bg-black/5 dark:bg-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
              {/* Theme toggle */}
              <div className="flex items-center gap-2">
                <span className="font-medium opacity-70">Theme:</span>
                <div className="flex items-center rounded-lg bg-black/10 dark:bg-white/10 p-0.5">
                  <button
                    onClick={() => handleUpdateSettings({ theme: 'light' })}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      settings.theme === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'opacity-70'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => handleUpdateSettings({ theme: 'sepia' })}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      settings.theme === 'sepia' ? 'bg-[#fbf0d9] text-[#433422] shadow-xs' : 'opacity-70'
                    }`}
                  >
                    Sepia
                  </button>
                  <button
                    onClick={() => handleUpdateSettings({ theme: 'dark' })}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      settings.theme === 'dark' ? 'bg-slate-900 text-white shadow-xs' : 'opacity-70'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              {/* Font family */}
              <div className="flex items-center gap-2">
                <span className="font-medium opacity-70">Font:</span>
                <div className="flex items-center rounded-lg bg-black/10 dark:bg-white/10 p-0.5">
                  <button
                    onClick={() => handleUpdateSettings({ fontFamily: 'serif' })}
                    className={`px-2.5 py-1 rounded-md font-serif text-xs transition-all ${
                      settings.fontFamily === 'serif' ? 'bg-white dark:bg-slate-800 shadow-xs' : 'opacity-70'
                    }`}
                  >
                    Classic Serif
                  </button>
                  <button
                    onClick={() => handleUpdateSettings({ fontFamily: 'sans' })}
                    className={`px-2.5 py-1 rounded-md font-sans text-xs transition-all ${
                      settings.fontFamily === 'sans' ? 'bg-white dark:bg-slate-800 shadow-xs' : 'opacity-70'
                    }`}
                  >
                    Clean Sans
                  </button>
                </div>
              </div>

              {/* Font size */}
              <div className="flex items-center gap-2">
                <span className="font-medium opacity-70">Text Size:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateSettings({ fontSize: Math.max(15, settings.fontSize - 1) })}
                    className="w-6 h-6 rounded flex items-center justify-center bg-black/10 dark:bg-white/10 text-xs font-bold"
                  >
                    A-
                  </button>
                  <span className="font-mono text-xs w-8 text-center">{settings.fontSize}px</span>
                  <button
                    onClick={() => handleUpdateSettings({ fontSize: Math.min(26, settings.fontSize + 1) })}
                    className="w-6 h-6 rounded flex items-center justify-center bg-black/10 dark:bg-white/10 text-xs font-bold"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Saved Word Underline Toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={settings.showSavedHighlights}
                  onChange={e => handleUpdateSettings({ showSavedHighlights: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <span className="font-medium opacity-80">Underline saved vocabulary</span>
              </label>
            </div>
          )}

          {/* Reading Body */}
          <main className="flex-1 max-w-3xl mx-auto w-full px-6 md:px-12 py-10">
            {/* Chapter Heading */}
            <div className="mb-10 text-center border-b pb-6 border-current border-opacity-15">
              <span className="text-xs uppercase tracking-widest font-semibold opacity-60">
                Chapter {currentChapter.chapterNum}
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-bold mt-2">
                {currentChapter.title}
              </h1>
              <p className="text-xs opacity-60 mt-1 italic">
                Tip: Click any word for definition & Arabic translation. Select any sentence to translate it.
              </p>
            </div>

            {/* Interactive Content */}
            <div
              style={{ fontSize: `${settings.fontSize}px` }}
              className={settings.fontFamily === 'serif' ? 'font-serif-book' : 'font-sans'}
            >
              <InteractiveText
                content={currentChapter.content}
                sourceTitle={selectedBook.title}
                savedWordsList={savedWordsList}
                showSavedUnderlines={settings.showSavedHighlights}
                onWordClick={(w, ctx) => {
                  setSelectedWord(w);
                  setContextSentence(ctx);
                }}
              />
            </div>

            {/* Chapter Pagination Controls */}
            <div className="mt-14 pt-6 border-t border-current border-opacity-15 flex items-center justify-between">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => {
                  setActiveChapterIndex(prev => Math.max(0, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-current border-opacity-20 disabled:opacity-30 disabled:pointer-events-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Chapter
              </button>

              <div className="text-xs font-medium opacity-60">
                {activeChapterIndex + 1} of {selectedBook.chapters.length}
              </div>

              <button
                disabled={activeChapterIndex >= selectedBook.chapters.length - 1}
                onClick={() => {
                  setActiveChapterIndex(prev => Math.min(selectedBook.chapters.length - 1, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-current border-opacity-20 disabled:opacity-30 disabled:pointer-events-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Next Chapter
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      ) : (
        /* ==================================================== */
        /* 2. LIBRARY CATALOG (EXPANDABLE COLLECTION) */
        /* ==================================================== */
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Hero Banner with Search & Gutenberg Importer */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white p-6 md:p-8">
            <div className="max-w-2xl relative z-10 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                World Literature & Public Domain Classics
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                Read Masterpieces. Absorb Natural English.
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Immerse yourself in authentic literature graded from A1 to C1. Click any word for instant definitions,
                phonetics, and Arabic translations. Any word you save is automatically underlined across all texts!
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowImporter(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Import Custom Text / Project Gutenberg
                </button>
              </div>
            </div>

            {/* Background design glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search literature by title, author, or keyword..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Level & Genre Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Level tabs */}
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
                    {lvl === 'all' ? 'All Levels' : lvl}
                  </button>
                ))}
              </div>

              {/* Genre selector */}
              <select
                value={selectedGenre}
                onChange={e => setSelectedGenre(e.target.value)}
                className="text-xs py-1.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Genres</option>
                <option value="Classic">Classic</option>
                <option value="Romance">Romance</option>
                <option value="Mystery">Mystery</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Adventure">Adventure</option>
                <option value="Short Story">Short Story</option>
              </select>
            </div>
          </div>

          {/* Book Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => {
              const bookHasBookmark = bookmarks.some(b => b.bookId === book.id);

              return (
                <div
                  key={book.id}
                  onClick={() => {
                    setSelectedBook(book);
                    setActiveChapterIndex(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-400/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Book spine & header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>{book.genre}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">CEFR {book.level}</span>
                          <span aria-hidden="true">·</span>
                          <span>{book.year > 0 ? book.year : `${Math.abs(book.year)} BCE`}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          by {book.author}
                        </p>
                      </div>

                      {/* Mini cover preview banner */}
                      <div className={`w-14 h-20 rounded-lg bg-gradient-to-br ${book.coverGradient} shadow-sm shrink-0 flex items-center justify-center text-white text-xs font-display font-bold p-1 text-center`}>
                        {book.title.slice(0, 1)}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {book.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      {book.chapters.length} {book.chapters.length === 1 ? 'Chapter' : 'Chapters'} ({book.wordCount.toLocaleString()} words)
                    </span>

                    {bookHasBookmark && (
                      <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                        <BookmarkIcon className="w-3 h-3 fill-current" />
                        Bookmarked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No literature found matching your search. Try adjusting the filters or import your own text!
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. CUSTOM TEXT / PROJECT GUTENBERG IMPORTER MODAL */}
      {/* ==================================================== */}
      {showImporter && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100">
            <h3 className="text-lg font-bold mb-1">Import Custom Text or Gutenberg Work</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Add any article, speech, novel chapter, or public domain text to enjoy full word translations,
              phonetics, and live vocabulary underlines.
            </p>

            <form onSubmit={handleCreateCustomBook} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Title</label>
                  <input
                    type="text"
                    required
                    value={importTitle}
                    onChange={e => setImportTitle(e.target.value)}
                    placeholder="e.g. Moby Dick Chapter 1"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Author</label>
                  <input
                    type="text"
                    value={importAuthor}
                    onChange={e => setImportAuthor(e.target.value)}
                    placeholder="e.g. Herman Melville"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">Target Level</label>
                <select
                  value={importLevel}
                  onChange={e => setImportLevel(e.target.value as CEFRLevel)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                  <option value="C2">C2 - Mastery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">English Text Content</label>
                <textarea
                  required
                  rows={8}
                  value={importContent}
                  onChange={e => setImportContent(e.target.value)}
                  placeholder="Paste your English text, article, or chapter here..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none font-serif leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImporter(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs"
                >
                  Save and Open in Reader
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. WORD DETAILS POPUP */}
      {/* ==================================================== */}
      {selectedWord && (
        <WordPopup
          word={selectedWord}
          sourceTitle={selectedBook?.title}
          sourceContext={contextSentence}
          onClose={() => setSelectedWord(null)}
          onSavedChange={onSavedWordsUpdate}
        />
      )}
    </div>
  );
};
