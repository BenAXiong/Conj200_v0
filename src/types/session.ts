export interface SessionConfig {
  questionCount: number;
  currentQuestion: number;
  correctAnswers: number;
}

export interface SessionResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
}