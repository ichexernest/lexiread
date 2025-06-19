import { UserArticle, PublicArticle, ArticleContent } from '@/generated/prisma';


export interface VocStats {
  total: number;
  count: number;
}

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

export type PrismaFullArticle = UserArticle & {
    publicArticle: PublicArticle;
};

export type PrismaArticleContent = ArticleContent & { id: string };