export interface Card {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export function createCard(): Card {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
  };
}

export function sm2(card: Card, grade: number): Card {
  if (grade < 0 || grade > 5) {
    throw new Error("Grade must be between 0 and 5");
  }

  let { easeFactor, interval, repetitions } = card;

  if (grade >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response — reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor =
    easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  // Ease factor must not drop below 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  return {
    easeFactor,
    interval,
    repetitions,
  };
}

export function getNextReviewDate(card: Card): Date {
  const now = new Date();
  now.setDate(now.getDate() + card.interval);
  return now;
}

export function isDue(card: Card, lastReviewed: Date): boolean {
  const nextReview = new Date(lastReviewed);
  nextReview.setDate(nextReview.getDate() + card.interval);
  return new Date() >= nextReview;
}
