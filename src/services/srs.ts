import { SavedWord } from '../types';

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

/**
 * SuperMemo SM-2 Spaced Repetition Algorithm
 */
export function calculateNextReview(
  word: SavedWord,
  rating: ReviewRating
): Partial<SavedWord> {
  let { repetitions, intervalDays, easeFactor } = word;

  // Rating scores (0-5 scale in SM-2):
  // again = 1, hard = 2, good = 4, easy = 5
  let quality = 4;
  if (rating === 'again') quality = 1;
  else if (rating === 'hard') quality = 2;
  else if (rating === 'good') quality = 4;
  else if (rating === 'easy') quality = 5;

  if (quality < 3) {
    // Failed recall: reset repetitions to 0, review again tomorrow (or 1 day)
    repetitions = 0;
    intervalDays = 1;
  } else {
    // Successful recall
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  }

  // Update Ease Factor (EF)
  // EF' = EF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;
  if (easeFactor > 2.8) easeFactor = 2.8;

  // Bonus for easy rating
  if (rating === 'easy') {
    intervalDays = Math.round(intervalDays * 1.3);
  }

  const now = Date.now();
  const nextDueDate = now + intervalDays * 24 * 60 * 60 * 1000;

  // Determine status
  let status: 'new' | 'learning' | 'mastered' = word.status;
  if (repetitions >= 5 && intervalDays >= 21) {
    status = 'mastered';
  } else if (repetitions > 0) {
    status = 'learning';
  }

  return {
    repetitions,
    intervalDays,
    easeFactor: Math.round(easeFactor * 100) / 100,
    dueDate: nextDueDate,
    lastReviewedAt: now,
    status,
  };
}
