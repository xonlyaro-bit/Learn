import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  BookMarked,
  Film,
  Search,
  Flame,
  User,
  Settings,
  Globe,
  BrainCircuit,
  Bookmark
} from 'lucide-react';
import { SavedWord } from '../types';

export type ActiveNavTab = 'reading' | 'listening' | 'vocabulary' | 'movies';

interface HeaderProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  savedWordsList: SavedWord[];
  onOpenQuickSearch: () => void;
  onOpenPersonalization: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  savedWordsList,
  onOpenQuickSearch,
  onOpenPersonalization
}) => {
  const dueCount = savedWordsList.filter(w => w.dueDate <= Date.now()).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Name */}
          <div
            onClick={() => onTabChange('reading')}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="font-display font-bold text-lg">LV</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  LinguaVerse
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  English Immersion
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
                Literature • Songs • Movies • Oxford 6000
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <button
              onClick={() => onTabChange('reading')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'reading'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Reading
            </button>

            <button
              onClick={() => onTabChange('listening')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'listening'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Headphones className="w-4 h-4" />
              Listening
            </button>

            <button
              onClick={() => onTabChange('vocabulary')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all relative ${
                activeTab === 'vocabulary'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              Oxford 6000 & Flashcards
              {dueCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-2 right-1.5 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => onTabChange('movies')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                activeTab === 'movies'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Film className="w-4 h-4" />
              Movies & TV
            </button>
          </nav>

          {/* Quick Actions & Profile / Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Word Lookup Button */}
            <button
              onClick={onOpenQuickSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-400 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Quick Oxford Word & Translation Search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search Dictionary</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
                /
              </kbd>
            </button>

            {/* Streak Indicator */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs font-semibold"
              title="Daily Learning Streak: 3 Days"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>3d</span>
            </div>

            {/* User Notebook / Study Center Button */}
            <button
              onClick={onOpenPersonalization}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 text-xs font-semibold shadow-xs transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">My Study Center</span>
              <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {savedWordsList.length}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onTabChange('reading')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'reading' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Reading
          </button>
          <button
            onClick={() => onTabChange('listening')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'listening' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <Headphones className="w-4 h-4" />
            Listening
          </button>
          <button
            onClick={() => onTabChange('vocabulary')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'vocabulary' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            Vocabulary
          </button>
          <button
            onClick={() => onTabChange('movies')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${
              activeTab === 'movies' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <Film className="w-4 h-4" />
            Movies & TV
          </button>
        </div>
      </div>
    </header>
  );
};
