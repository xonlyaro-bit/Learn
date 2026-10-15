import { SavedWord, Bookmark, UserStats, ReaderSettings, Book } from '../types';

const STORAGE_KEYS = {
  VOCABULARY: 'linguaverse_vocabulary_v1',
  BOOKMARKS: 'linguaverse_bookmarks_v1',
  STATS: 'linguaverse_stats_v1',
  SETTINGS: 'linguaverse_settings_v1',
  CUSTOM_BOOKS: 'linguaverse_custom_books_v1',
  HISTORY: 'linguaverse_history_v1',
};

// Default initial user stats
const DEFAULT_STATS: UserStats = {
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  wordsMastered: 8,
  totalCardsReviewed: 24,
  readingMinutes: 45,
  quizzesCompleted: 6,
};

// Default initial reader settings
const DEFAULT_SETTINGS: ReaderSettings = {
  theme: 'light',
  fontFamily: 'serif',
  fontSize: 18,
  lineHeight: 'relaxed',
  showSavedHighlights: true,
};

// Seed initial saved words for immediate rich demonstration
const INITIAL_SAVED_WORDS: SavedWord[] = [
  {
    id: 'saved-1',
    word: 'resilience',
    level: 'B1',
    pos: 'noun',
    phonetic: '/rɪˈzɪliəns/',
    definition: 'The capacity to recover quickly from difficulties; toughness and fortitude.',
    arabic: 'مرونة / قدرة على الصمود',
    example: 'The community showed incredible resilience in the aftermath of the severe earthquake.',
    sourceTitle: 'Personal Notebook',
    addedAt: Date.now() - 3 * 86400000,
    dueDate: Date.now() - 3600000, // Due for review today!
    repetitions: 2,
    intervalDays: 3,
    easeFactor: 2.5,
    status: 'learning',
  },
  {
    id: 'saved-2',
    word: 'ephemeral',
    level: 'C1',
    pos: 'adjective',
    phonetic: '/ɪˈfemərəl/',
    definition: 'Lasting for a very short time; fleeting and transient.',
    arabic: 'زائل / عابر / قصير الأجل',
    example: 'The cherry blossoms’ ephemeral beauty makes their springtime arrival all the more cherished.',
    sourceTitle: 'The Picture of Dorian Gray',
    addedAt: Date.now() - 5 * 86400000,
    dueDate: Date.now() + 86400000, // Due tomorrow
    repetitions: 4,
    intervalDays: 6,
    easeFactor: 2.6,
    status: 'learning',
  },
  {
    id: 'saved-3',
    word: 'courage',
    level: 'A2',
    pos: 'noun',
    phonetic: '/ˈkʌrɪdʒ/',
    definition: 'The ability to do something that frightens one; bravery.',
    arabic: 'شجاعة / بسالة',
    example: 'It took immense courage to stand up and tell the truth in front of everyone.',
    sourceTitle: 'Pride and Prejudice',
    addedAt: Date.now() - 15 * 86400000,
    dueDate: Date.now() + 10 * 86400000,
    repetitions: 6,
    intervalDays: 25,
    easeFactor: 2.7,
    status: 'mastered',
  },
];

export function getSavedWords(): SavedWord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(INITIAL_SAVED_WORDS));
      return INITIAL_SAVED_WORDS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SAVED_WORDS;
  }
}

export function saveWord(word: SavedWord): SavedWord[] {
  const current = getSavedWords();
  const existingIdx = current.findIndex(w => w.word.toLowerCase() === word.word.toLowerCase());
  let updated: SavedWord[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = { ...updated[existingIdx], ...word };
  } else {
    updated = [word, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(updated));
  return updated;
}

export function removeSavedWord(id: string): SavedWord[] {
  const current = getSavedWords();
  const updated = current.filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(updated));
  return updated;
}

export function isWordSaved(word: string, savedList?: SavedWord[]): boolean {
  const list = savedList || getSavedWords();
  const normalized = word.toLowerCase().trim();
  return list.some(w => w.word.toLowerCase() === normalized);
}

export function getSavedWordEntry(word: string, savedList?: SavedWord[]): SavedWord | undefined {
  const list = savedList || getSavedWords();
  const normalized = word.toLowerCase().trim();
  return list.find(w => w.word.toLowerCase() === normalized);
}

export function getBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(bm: Bookmark): Bookmark[] {
  const current = getBookmarks().filter(b => b.bookId !== bm.bookId);
  const updated = [bm, ...current];
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
}

export function removeBookmark(bookId: string): Bookmark[] {
  const current = getBookmarks();
  const updated = current.filter(b => b.bookId !== bookId);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
}

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(DEFAULT_STATS));
      return DEFAULT_STATS;
    }
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

export function updateUserStats(updates: Partial<UserStats>): UserStats {
  const current = getUserStats();
  const updated = { ...current, ...updates };
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updated));
  return updated;
}

export function getReaderSettings(): ReaderSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveReaderSettings(settings: ReaderSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function getCustomBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_BOOKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomBook(book: Book): Book[] {
  const current = getCustomBooks();
  const updated = [book, ...current.filter(b => b.id !== book.id)];
  localStorage.setItem(STORAGE_KEYS.CUSTOM_BOOKS, JSON.stringify(updated));
  return updated;
}

/**
 * Export all learning data (vocabulary, SRS history, bookmarks, stats) to a portable JSON file
 */
export function exportUserData(): string {
  const data = {
    vocabulary: getSavedWords(),
    bookmarks: getBookmarks(),
    stats: getUserStats(),
    settings: getReaderSettings(),
    customBooks: getCustomBooks(),
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Import backup JSON data
 */
export function importUserData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.vocabulary) localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(parsed.vocabulary));
    if (parsed.bookmarks) localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(parsed.bookmarks));
    if (parsed.stats) localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(parsed.stats));
    if (parsed.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed.settings));
    if (parsed.customBooks) localStorage.setItem(STORAGE_KEYS.CUSTOM_BOOKS, JSON.stringify(parsed.customBooks));
    return true;
  } catch {
    return false;
  }
}
