import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Verb } from '../data/verbs';

interface VerbCardProps {
  verb: Verb;
  userAnswers: Record<string, string>;
  onAnswerChange: (pronoun: string, value: string) => void;
  showResults: boolean;
}

const pronouns = ['je', 'tu', 'il', 'nous', 'vous', 'ils'] as const;

export function VerbCard({ verb, userAnswers, onAnswerChange, showResults }: VerbCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">{verb.infinitive}</h2>
        <p className="text-gray-600 italic">{verb.translation}</p>
        <span className="inline-block px-3 py-1 mt-2 text-sm bg-indigo-100 text-indigo-800 rounded-full">
          Group {verb.group}
        </span>
      </div>

      <div className="space-y-4">
        {pronouns.map((pronoun) => (
          <div key={pronoun} className="flex items-center gap-3">
            <span className="w-16 text-right font-medium text-gray-700">{pronoun}</span>
            <input
              type="text"
              value={userAnswers[pronoun] || ''}
              onChange={(e) => onAnswerChange(pronoun, e.target.value)}
              disabled={showResults}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Type conjugation..."
            />
            {showResults && (
              <div className="w-8">
                {userAnswers[pronoun]?.toLowerCase() === verb.conjugations.present[pronoun] ? (
                  <CheckCircle2 className="text-green-500 w-6 h-6" />
                ) : (
                  <XCircle className="text-red-500 w-6 h-6" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showResults && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Correct Answers:</h3>
          <div className="grid grid-cols-2 gap-2">
            {pronouns.map((pronoun) => (
              <div key={pronoun} className="text-sm">
                <span className="font-medium text-gray-600">{pronoun}:</span>{' '}
                <span className="text-indigo-600">{verb.conjugations.present[pronoun]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}