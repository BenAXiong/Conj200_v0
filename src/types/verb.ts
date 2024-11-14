export type Tense = 'present' | 'passéComposé' | 'futurSimple' | 'imparfait';
export type Pronoun = 'je' | 'tu' | 'il' | 'nous' | 'vous' | 'ils';

export interface Conjugations {
  present: Record<Pronoun, string>;
  passéComposé: Record<Pronoun, string>;
  futurSimple: Record<Pronoun, string>;
  imparfait: Record<Pronoun, string>;
}

export interface Verb {
  infinitive: string;
  translation: string;
  group: 1 | 2 | 3;
  conjugations: Conjugations;
}