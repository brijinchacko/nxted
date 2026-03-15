// --- Lesson Content Types ---

export type CardType = "concept" | "fact" | "practice" | "recap";

export interface LessonCard {
  type: CardType;
  title: string;
  content: string;
  mediaUrl?: string;
  codeSnippet?: string;
  language?: string;
}

export interface LessonContent {
  cards: LessonCard[];
}

// --- Quiz Types ---

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeTakenMs: number;
}

export interface QuizAttempt {
  lessonId: string;
  score: number;
  totalQuestions: number;
  results: QuizResult[];
  completedAt: Date;
}

// --- Spaced Repetition Types ---

export type SpacedRepGrade = 0 | 1 | 2 | 3 | 4 | 5;

export interface SpacedRepCard {
  id: string;
  front: string;
  back: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewAt: Date;
  lastReviewedAt: Date | null;
}

export interface SpacedRepDeck {
  id: string;
  name: string;
  lessonId: string;
  cards: SpacedRepCard[];
  createdAt: Date;
  updatedAt: Date;
}

// --- User & Plan Types ---

export type Plan = "FREE" | "PRO" | "TEAMS";

export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  plan: Plan;
  createdAt: Date;
  updatedAt: Date;
}

// --- AI Tutor Types ---

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface TutorSession {
  id: string;
  lessonId: string;
  messages: ChatMessage[];
  createdAt: Date;
}

// --- API Response Types ---

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
