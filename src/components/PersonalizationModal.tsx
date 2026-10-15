import React, { useRef } from 'react';
import { UserStats, Bookmark } from '../types';
import {
  exportUserData,
  importUserData,
  removeBookmark,
  getUserStats
} from '../services/storage';
import {
  X,
  Flame,
  Award,
  BookOpen,
  BrainCircuit,
  Clock,
  Download,
  Upload,
  Bookmark as BookmarkIcon,
  Trash2,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onBookmarksUpdate: () => void;
  onOpenBook?: (bookId: string) => void;
  onDataImported: () => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onBookmarksUpdate,
  onOpenBook,
  onDataImported
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stats: UserStats = getUserStats();

  if (!isOpen) return null;

  const handleDownloadBackup = () => {
    const jsonStr = exportUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linguaverse-learning-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        const success = importUserData(content);
        if (success) {
          onDataImported();
          alert('Learning backup restored successfully!');
          onClose();
        } else {
          alert('Failed to parse the backup file. Please provide a valid LinguaVerse JSON file.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Personal Study Center & Data Persistence
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Track your permanent learning history, manage literature bookmarks, and backup your data anytime.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Learning Statistics Cards */}
        <div className="py-6 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Study Milestones & Activity
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-center space-y-1">
              <div className="flex items-center justify-center text-amber-600 dark:text-amber-400 gap-1 text-xs font-semibold">
                <Flame className="w-4 h-4 fill-current" />
                Streak
              </div>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-200">{stats.streakDays} Days</p>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80">Active Study Habit</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-center space-y-1">
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 gap-1 text-xs font-semibold">
                <Award className="w-4 h-4" />
                Mastered
              </div>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">{stats.wordsMastered}</p>
              <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">Permanent Recall</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40 text-center space-y-1">
              <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 gap-1 text-xs font-semibold">
                <BrainCircuit className="w-4 h-4" />
                SRS Reviews
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{stats.totalCardsReviewed}</p>
              <p className="text-[10px] text-blue-700/80 dark:text-blue-400/80">Cards Answered</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 text-center space-y-1">
              <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 gap-1 text-xs font-semibold">
                <Clock className="w-4 h-4" />
                Reading
              </div>
              <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">{stats.readingMinutes}m</p>
              <p className="text-[10px] text-indigo-700/80 dark:text-indigo-400/80">Literature Immersion</p>
            </div>
          </div>
        </div>

        {/* Bookmarks Manager */}
        <div className="py-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Literature Bookmarks ({bookmarks.length})
            </h3>
          </div>

          {bookmarks.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">
              No literature bookmarked yet. Click the bookmark icon inside any book chapter to save your place!
            </p>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((bm, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <BookmarkIcon className="w-4 h-4 text-blue-600 fill-current shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{bm.title}</p>
                      <p className="text-[11px] text-slate-500">by {bm.author} • Saved {new Date(bm.savedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onOpenBook && (
                      <button
                        onClick={() => {
                          onOpenBook(bm.bookId);
                          onClose();
                        }}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors"
                      >
                        Resume Reading
                      </button>
                    )}
                    <button
                      onClick={() => {
                        removeBookmark(bm.bookId);
                        onBookmarksUpdate();
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete bookmark"
                      aria-label={`Delete bookmark for ${bm.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Permanent Local Data Backup & Portability */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Permanent Data Ownership & Portability
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            All your vocabulary, review intervals, bookmarks, and learning history are stored locally on your device.
            You can export a complete JSON backup at any time and restore it on any computer or browser with zero data loss.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadBackup}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Learning Backup (.json)
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <Upload className="w-4 h-4" />
              Restore from Backup (.json)
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
