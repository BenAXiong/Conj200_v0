import React from 'react';
import type { Tense } from '../types/verb';

interface TenseSelectorProps {
  selectedTense: Tense;
  onTenseChange: (tense: Tense) => void;
}

const tenses: { value: Tense; label: string }[] = [
  { value: 'present', label: 'Présent' },
  { value: 'passéComposé', label: 'Passé Composé' },
  { value: 'futurSimple', label: 'Futur Simple' },
  { value: 'imparfait', label: 'Imparfait' },
];

export function TenseSelector({ selectedTense, onTenseChange }: TenseSelectorProps) {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {tenses.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onTenseChange(value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedTense === value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}