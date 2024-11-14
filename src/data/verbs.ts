import type { Verb } from '../types/verb';

export const verbs: Verb[] = [
  // Previous verbs remain the same
  {
    infinitive: "manger",
    translation: "to eat",
    group: 1,
    conjugations: {
      present: {
        je: "mange",
        tu: "manges",
        il: "mange",
        nous: "mangeons",
        vous: "mangez",
        ils: "mangent"
      },
      passéComposé: {
        je: "ai mangé",
        tu: "as mangé",
        il: "a mangé",
        nous: "avons mangé",
        vous: "avez mangé",
        ils: "ont mangé"
      },
      futurSimple: {
        je: "mangerai",
        tu: "mangeras",
        il: "mangera",
        nous: "mangerons",
        vous: "mangerez",
        ils: "mangeront"
      },
      imparfait: {
        je: "mangeais",
        tu: "mangeais",
        il: "mangeait",
        nous: "mangions",
        vous: "mangiez",
        ils: "mangeaient"
      }
    }
  },
  {
    infinitive: "voir",
    translation: "to see",
    group: 3,
    conjugations: {
      present: {
        je: "vois",
        tu: "vois",
        il: "voit",
        nous: "voyons",
        vous: "voyez",
        ils: "voient"
      },
      passéComposé: {
        je: "ai vu",
        tu: "as vu",
        il: "a vu",
        nous: "avons vu",
        vous: "avez vu",
        ils: "ont vu"
      },
      futurSimple: {
        je: "verrai",
        tu: "verras",
        il: "verra",
        nous: "verrons",
        vous: "verrez",
        ils: "verront"
      },
      imparfait: {
        je: "voyais",
        tu: "voyais",
        il: "voyait",
        nous: "voyions",
        vous: "voyiez",
        ils: "voyaient"
      }
    }
  }
  // Add more verbs here...
];