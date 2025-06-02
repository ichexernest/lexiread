import { z } from 'zod';

export const VocabularyDefinition = z.object({
  id: z.string(),
  partOfSpeech: z.string(),
  definition: z.string(),
  localDefinition: z.string().optional(),
  example: z.string().optional(),
  exampleTranslation: z.string().optional(),
  pronunciation: z.string().optional(),
  synonyms: z.string().optional(),
  antonyms: z.string().optional(),
});

export const Vocabulary = z.object({
  id: z.string(),
  word: z.string(),
  definitions: z.array(VocabularyDefinition),
});

export const UserVocabulary = Vocabulary.extend({
  addedAt: z.string(),
  familiarity: z.number(),
  personalNote: z.string().optional(),
  customDefinition: z.string().optional(),
  customExample: z.string().optional(),
  userId: z.string(),
});

export type UserVocabulary = z.infer<typeof UserVocabulary>;
export type Vocabulary = z.infer<typeof Vocabulary>;
export type VocabularyDefinition = z.infer<typeof VocabularyDefinition>;
