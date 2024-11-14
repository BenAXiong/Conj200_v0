import React from 'react';

interface SessionConfigProps {
  questionCount: number;
  onQuestionCountChange: (count: number) => void;
  onStartSession: () => void;
}

const questionOptions = [5, 10, 15, 20, 25, 30];

export function SessionConfig({ questionCount, onQuestionCountChange, onStartSession }: SessionConfigProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Configure Practice Session</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions
          </label>
          <select
            id="questionCount"
            value={questionCount}
            onChange={(e) => onQuestionCountChange(Number(e.target.value))}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {questionOptions.map((count) => (
              <option key={count} value={count}>
                {count} questions
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onStartSession}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                   transition-colors font-medium"
        >
          Start Practice
        </button>
      </div>
    </div>
  );
}