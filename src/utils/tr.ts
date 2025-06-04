// vocabulary-transformer.ts
import { Vocabulary, VocabularyDefinition } from '@/types/vocabulary';

// Prisma 返回的原始數據類型
export interface PrismaVocabularyDefinition {
  id: string;
  partOfSpeech: string;
  definition: string;
  localDefinition: string | null;
  example: string | null;
  exampleTranslation: string | null;
  pronunciation: string | null;
  synonyms: string | null;
  antonyms: string | null;
}

export interface PrismaPublicVocabulary {
  id: string;
  word: string;
  definitions: PrismaVocabularyDefinition[];
}

export interface PrismaUserVocabulary {
  id: string;
  userId: string;
  publicVocabularyId: string;
  addedAt: Date;
  familiarity: number;
  personalNote: string | null;
  customDefinition: string | null;
  customExample: string | null;
  publicVocabulary: PrismaPublicVocabulary;
}

export interface PrismaUserVocabularyWithoutPublic {
  userId: string;
  publicVocabularyId: string;
  addedAt: Date;
  familiarity: number;
  personalNote: string | null;
  customDefinition: string | null;
  customExample: string | null;
}

/**
 * 轉換 Prisma VocabularyDefinition 到前端類型
 */
export function transformVocabularyDefinition(
  def: PrismaVocabularyDefinition
): VocabularyDefinition {
  return {
    id: def.id,
    partOfSpeech: def.partOfSpeech,
    definition: def.definition,
    localDefinition: def.localDefinition || undefined,
    example: def.example || undefined,
    exampleTranslation: def.exampleTranslation || undefined,
    pronunciation: def.pronunciation || undefined,
    synonyms: def.synonyms || undefined,
    antonyms: def.antonyms || undefined,
  };
}

/**
 * 轉換 PublicVocabulary 到前端 Vocabulary 類型
 */
export function transformPublicVocabularyToVocabulary(
  publicVoc: PrismaPublicVocabulary
): Vocabulary {
  return {
    publicVocabularyId: publicVoc.id,
    word: publicVoc.word,
    definitions: publicVoc.definitions.map(transformVocabularyDefinition),
  };
}

/**
 * 轉換 UserVocabulary 到前端 Vocabulary 類型
 */
export function transformUserVocabularyToVocabulary(
  userVoc: PrismaUserVocabulary
): Vocabulary {
  return {
    publicVocabularyId: userVoc.publicVocabulary.id,
    word: userVoc.publicVocabulary.word,
    definitions: userVoc.publicVocabulary.definitions.map(transformVocabularyDefinition),
    addedAt: userVoc.addedAt.toISOString().split('T')[0],
    familiarity: userVoc.familiarity,
    personalNote: userVoc.personalNote || undefined,
    customDefinition: userVoc.customDefinition || undefined,
    customExample: userVoc.customExample || undefined,
    userId: userVoc.userId,
  };
}

/**
 * 轉換考試用的單字數據到前端 Vocabulary 類型
 */
export function transformExamVocabularyToVocabulary(
  examVoc: PrismaUserVocabulary
): Vocabulary {
  return {
    publicVocabularyId: examVoc.publicVocabulary.id,
    word: examVoc.publicVocabulary.word,
    definitions: examVoc.publicVocabulary.definitions.map(transformVocabularyDefinition),
    familiarity: examVoc.familiarity,
    personalNote: examVoc.personalNote || undefined,
    customDefinition: examVoc.customDefinition || undefined,
    customExample: examVoc.customExample || undefined,
    userId: examVoc.userId,
  };
}