import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Verb, Tense, Pronoun } from '../types/verb';

interface ConjugationCardProps {
  verb: Verb;
  tense: Tense;
  pronoun: Pronoun;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  showResult: boolean;
}

const tenseLabels: Record<Tense, string> = {
  present: 'Présent',
  passéComposé: 'Passé Composé',
  futurSimple: 'Futur Simple',
  imparfait: 'Imparfait',
};

export function ConjugationCard({
  verb,
  tense,
  pronoun,
  userAnswer,
  onAnswerChange,
  showResult,
}: ConjugationCardProps) {
  const correctAnswer = verb.conjugations[tense][pronoun];
  const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">{verb.infinitive}</h2>
        <p className="text-gray-600 italic">{verb.translation}</p>
        <div className="flex gap-2 justify-center mt-2">
          <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
            Group {verb.group}
          </span>
          <span className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
            {tenseLabels[tense]}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-16 text-right font-medium text-gray-700">{pronoun}</span>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={showResult}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Type conjugation..."
          />
          {showResult && (
            <div className="w-8">
              {isCorrect ? (
                <CheckCircle2 className="text-green-500 w-6 h-6" />
              ) : (
                <XCircle className="text-red-500 w-6 h-6" />
              )}
            </div>
          )}
        </div>
      </div>

      {showResult && !isCorrect && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Correct Answer:</h3>
          <div className="text-sm">
            <span className="font-medium text-gray-600">{pronoun}:</span>{' '}
            <span className="text-indigo-600">{correctAnswer}</span>
          </div>
        </div>
      )}
    </div>
  );
}