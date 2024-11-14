export interface User {
  email: string;
  id: string;
}

export interface PracticeSession {
  id: string;
  date: string;
  tense: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
}

export interface UserStats {
  totalSessions: number;
  averageAccuracy: number;
  totalQuestions: number;
  bestTense: string;
  worstTense: string;
}