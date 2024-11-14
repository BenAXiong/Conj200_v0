import { useState, useCallback } from 'react';
import type { Pronoun } from '../types/verb';

const pronouns: Pronoun[] = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];

export function useRandomPronoun() {
  const [currentPronoun, setCurrentPronoun] = useState<Pronoun>(() => 
    pronouns[Math.floor(Math.random() * pronouns.length)]
  );

  const getNextPronoun = useCallback(() => {
    const newPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    setCurrentPronoun(newPronoun);
    return newPronoun;
  }, []);

  return { currentPronoun, getNextPronoun };
}