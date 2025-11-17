import {
  ANSWER_TYPES,
  DEFAULT_EASE,
  MIN_EASE,
  INITIAL_INTERVAL,
  SPACED_REPETITION_CONFIG
} from '../constants';

export const calculateNextReview = (card, answer) => {
  const config = SPACED_REPETITION_CONFIG[answer];
  if (!config) return card;

  const now = new Date();
  let interval = card.interval || INITIAL_INTERVAL;
  let ease = card.ease || DEFAULT_EASE;

  if (answer === ANSWER_TYPES.AGAIN) {
    ease = Math.max(MIN_EASE, ease + config.easeChange);
    interval = INITIAL_INTERVAL;
  } else if (answer === ANSWER_TYPES.HARD) {
    ease = Math.max(MIN_EASE, ease + config.easeChange);
    interval = Math.max(INITIAL_INTERVAL, interval * config.intervalMultiplier);
  } else if (answer === ANSWER_TYPES.GOOD) {
    interval = Math.round(interval * ease);
  } else if (answer === ANSWER_TYPES.EASY) {
    ease = ease + config.easeChange;
    interval = Math.round(interval * (ease + 1));
  }

  return {
    interval,
    ease,
    reviews: (card.reviews || 0) + 1,
    lapses: answer === ANSWER_TYPES.AGAIN ? (card.lapses || 0) + 1 : (card.lapses || 0),
    lastReview: now,
    nextReview: new Date(now.getTime() + interval * 24 * 60 * 60 * 1000)
  };
};

export const getCardStatus = (card) => {
  if (!card.lastReview) {
    return 'new';
  }
  if (card.interval < 21) {
    return 'learning';
  }
  return 'review';
};

export const cardsToStudy = (cards) => {
  const now = new Date();
  return cards.filter(card => {
    if (!card.nextReview) {
      return true;
    }
    return new Date(card.nextReview) <= now;
  });
};
