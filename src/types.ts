export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface OxfordWord {
  id: string;
  word: string;
  level: CEFRLevel;
  pos: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'idiom' | 'phrase';
  phonetic: string;
  definition: string;
  arabic: string;
  example: string;
  synonyms?: string[];
  collocations?: string[];
}

export interface SavedWord {
  id: string;
  word: string;
  level: CEFRLevel;
  pos: string;
  phonetic?: string;
  definition: string;
  arabic: string;
  example?: string;
  sourceContext?: string;
  sourceTitle?: string;
  notes?: string;
  addedAt: number;
  lastReviewedAt?: number;
  dueDate: number; // timestamp for next SRS review
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  status: 'new' | 'learning' | 'mastered';
}

export interface BookChapter {
  id: string;
  chapterNum: number;
  title: string;
  content: string; // Plain text or markdown paragraphs
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  level: CEFRLevel;
  genre: 'Classic' | 'Romance' | 'Mystery' | 'Gothic' | 'Adventure' | 'Philosophy' | 'Short Story' | 'Fantasy';
  coverGradient: string;
  summary: string;
  description: string;
  wordCount: number;
  chapters: BookChapter[];
  audioUrl?: string;
  tags: string[];
}

export interface LyricsLine {
  id: string;
  timeSeconds: number;
  text: string;
  arabic?: string;
  blankWords?: string[]; // For cloze listening exercises
}

export interface SongExercise {
  id: string;
  type: 'cloze' | 'mcq' | 'order';
  prompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: 'Pop' | 'Rock' | 'R&B / Soul' | 'Indie / Folk' | 'Classic Rock';
  level: CEFRLevel;
  youtubeId: string;
  spotifyUri?: string;
  coverImage?: string;
  summary: string;
  lyrics: LyricsLine[];
  exercises: SongExercise[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  show: string;
  host: string;
  level: CEFRLevel;
  durationMinutes: number;
  category: 'Conversation' | 'Culture' | 'Science & Tech' | 'Daily News' | 'Idioms & Slang';
  youtubeId?: string;
  audioUrl?: string;
  spotifyUrl: string;
  description: string;
  vocabulary: { word: string; definition: string; arabic: string }[];
  transcript: { time: string; speaker: string; text: string; arabic?: string }[];
  comprehensionQuiz: { question: string; options: string[]; answerIndex: number; explanation: string }[];
}

export interface MovieScene {
  id: string;
  title: string;
  mediaType: 'movie' | 'cartoon' | 'tv_series';
  mediaTitle: string;
  releaseYear: number;
  level: CEFRLevel;
  genre: string;
  youtubeId: string;
  startSeconds?: number;
  thumbnailUrl?: string;
  description: string;
  keyIdioms: {
    phrase: string;
    englishMeaning: string;
    arabicMeaning: string;
    exampleInContext: string;
  }[];
  dialogue: {
    character: string;
    line: string;
    arabic?: string;
    timestamp?: string;
  }[];
  exercises: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Bookmark {
  bookId: string;
  chapterId: string;
  paragraphIndex: number;
  savedAt: number;
  title: string;
  author: string;
}

export interface ReaderSettings {
  theme: 'light' | 'sepia' | 'dark';
  fontFamily: 'serif' | 'sans';
  fontSize: number; // in px, e.g. 18
  lineHeight: 'normal' | 'relaxed' | 'loose';
  showSavedHighlights: boolean;
}

export interface UserStats {
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  wordsMastered: number;
  totalCardsReviewed: number;
  readingMinutes: number;
  quizzesCompleted: number;
}
