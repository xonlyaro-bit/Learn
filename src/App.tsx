import React, { useState, useEffect, useCallback } from 'react';
import { Header, ActiveNavTab } from './components/Header';
import { ReadingView } from './components/ReadingView';
import { ListeningView } from './components/ListeningView';
import { VocabularyView } from './components/VocabularyView';
import { MoviesView } from './components/MoviesView';
import { PersonalizationModal } from './components/PersonalizationModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { SavedWord, Bookmark } from './types';
import { getSavedWords, getBookmarks } from './services/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('reading');
  const [savedWordsList, setSavedWordsList] = useState<SavedWord[]>(() => getSavedWords());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getBookmarks());

  // Modals
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState<boolean>(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState<boolean>(false);

  // Sync state when storage changes
  const refreshStorageData = useCallback(() => {
    setSavedWordsList(getSavedWords());
    setBookmarks(getBookmarks());
  }, []);

  // Global keyboard shortcuts (e.g. '/' for quick search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsQuickSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsQuickSearchOpen(false);
        setIsPersonalizationOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-blue-200">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={tab => setActiveTab(tab)}
        savedWordsList={savedWordsList}
        onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
        onOpenPersonalization={() => setIsPersonalizationOpen(true)}
      />

      {/* Main Learning Hub */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'reading' && (
          <ReadingView
            savedWordsList={savedWordsList}
            onSavedWordsUpdate={refreshStorageData}
          />
        )}

        {activeTab === 'listening' && (
          <ListeningView
            savedWordsList={savedWordsList}
            onSavedWordsUpdate={refreshStorageData}
          />
        )}

        {activeTab === 'vocabulary' && (
          <VocabularyView
            savedWordsList={savedWordsList}
            onSavedWordsUpdate={refreshStorageData}
          />
        )}

        {activeTab === 'movies' && (
          <MoviesView
            savedWordsList={savedWordsList}
            onSavedWordsUpdate={refreshStorageData}
          />
        )}
      </main>

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onSavedWordsUpdate={refreshStorageData}
      />

      {/* Personalization & Data Persistence Center */}
      <PersonalizationModal
        isOpen={isPersonalizationOpen}
        onClose={() => setIsPersonalizationOpen(false)}
        bookmarks={bookmarks}
        onBookmarksUpdate={refreshStorageData}
        onOpenBook={(bookId) => {
          setActiveTab('reading');
        }}
        onDataImported={refreshStorageData}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-800 dark:text-slate-200">LinguaVerse</span>
            <span>•</span>
            <span>English Immersion through Authentic Culture</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPersonalizationOpen(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Export / Backup Data
            </button>
            <span>•</span>
            <span className="text-[11px] font-mono">
              Oxford 6000 & SM-2 Spaced Repetition Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
