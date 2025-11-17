export const CARD_FILTERS = {
  ALL: 'all',
  NEW: 'new',
  LEARNING: 'learning',
  REVIEW: 'review'
};

export const ANSWER_TYPES = {
  AGAIN: 'again',
  HARD: 'hard',
  GOOD: 'good',
  EASY: 'easy'
};

export const DEFAULT_EASE = 2.5;
export const MIN_EASE = 1.3;
export const INITIAL_INTERVAL = 1;
export const LEARNING_THRESHOLD = 21;

export const SPACED_REPETITION_CONFIG = {
  [ANSWER_TYPES.AGAIN]: {
    intervalMultiplier: 0,
    easeChange: -0.2
  },
  [ANSWER_TYPES.HARD]: {
    intervalMultiplier: 1.2,
    easeChange: -0.15
  },
  [ANSWER_TYPES.GOOD]: {
    intervalMultiplier: 1.0,
    easeChange: 0
  },
  [ANSWER_TYPES.EASY]: {
    intervalMultiplier: 1.0,
    easeChange: 0.1
  }
};
