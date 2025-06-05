import { z } from 'zod';

// Zod schemas for validation
export const VocabularyDefinitionSchema = z.object({
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

export const VocabularySchema = z.object({
  publicVocabularyId: z.string(),
  userVocabularyId: z.string().optional(),
  word: z.string(),
  definitions: z.array(VocabularyDefinitionSchema),
  addedAt: z.string().optional(),
  familiarity: z.number().optional(),
  personalNote: z.string().optional(),
  customDefinition: z.string().optional(),
  customExample: z.string().optional(),
  userId: z.string().optional(),
});

export const QuizResultSchema = z.object({
  userVocabularyId: z.string(),
  word: z.string(),
  result: z.enum(['remembered', 'notSure', 'forgotten'])
});


// TypeScript types inferred from Zod schemas
export type VocabularyDefinition = z.infer<typeof VocabularyDefinitionSchema>;
export type Vocabulary = z.infer<typeof VocabularySchema>;
export type QuizResult = z.infer<typeof QuizResultSchema>;



// Validation helpers
export function validateVocabulary(data: unknown): Vocabulary {
  return VocabularySchema.parse(data);
}

export function validateVocabularyDefinition(data: unknown): VocabularyDefinition {
  return VocabularyDefinitionSchema.parse(data);
}

export function isValidVocabulary(data: unknown): data is Vocabulary {
  return VocabularySchema.safeParse(data).success;
}

export function isValidVocabularyDefinition(data: unknown): data is VocabularyDefinition {
  return VocabularyDefinitionSchema.safeParse(data).success;
}