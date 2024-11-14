import React from 'react';
import { Trophy, Target, XCircle, BarChart3 } from 'lucide-react';
import type { SessionResults } from '../types/session';

interface SessionResultsProps {
  results: SessionResults;
  onStartNewSession: () => void;
}

export function SessionResults({ results, onStartNewSession }: SessionResultsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">Session Complete!</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <Target className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Total Questions</p>
          <p className="text-xl font-bold text-indigo-600">{results.totalQuestions}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <BarChart3 className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-xl font-bold text-green-600">{results.accuracy}%</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Correct Answers</span>
          <span className="font-semibold text-green-600">{results.correctAnswers}</span>
        </div>
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Incorrect Answers</span>
          <span className="font-semibold text-red-600">{results.incorrectAnswers}</span>
        </div>
      </div>

      <button
        onClick={onStartNewSession}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                 transition-colors font-medium"
      >
        Start New Session
      </button>
    </div>
  );
}