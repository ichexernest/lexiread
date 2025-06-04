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

// TypeScript types inferred from Zod schemas
export type VocabularyDefinition = z.infer<typeof VocabularyDefinitionSchema>;
export type Vocabulary = z.infer<typeof VocabularySchema>;

// Additional utility types for API responses
export interface VocabularyListResponse {
  vocabularies: Vocabulary[];
  total: number;
  page: number;
  limit: number;
}

export interface VocabularySearchResponse {
  vocabularies: Vocabulary[];
  searchTerm: string;
  total: number;
}

export interface GPTVocabularyResponse {
  word: string;
  definitions: Array<{
    partOfSpeech: string;
    definition: string;
    localDefinition: string;
    example: string;
    exampleTranslation: string;
    pronunciation: string;
    synonyms: string;
    antonyms: string;
  }>;
}


// Types for vocabulary operations
export interface AddVocabularyRequest {
  word: string;
  definitions: Omit<VocabularyDefinition, 'id'>[];
}

export interface UpdateVocabularyRequest {
  familiarity?: number;
  personalNote?: string;
  customDefinition?: string;
  customExample?: string;
}

// Exam-related types
export interface ExamVocabulary extends Vocabulary {
  familiarity: number; // Required for exam vocabularies
}

export interface ExamSession {
  vocabularies: ExamVocabulary[];
  startTime: string;
  endTime?: string;
  completed: boolean;
}

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