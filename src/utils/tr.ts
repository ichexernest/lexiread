// vocabulary-transformer.ts
import { Article, Vocabulary, VocabularyDefinition, validateVocabulary, Content } from '@/types';
import { customAlphabet } from 'nanoid'
import {PrismaArticleContent, PrismaVocabularyDefinition, PrismaPublicVocabulary, PrismaFullArticle, PrismaUserVocabulary, GPTVocabularyResponse} from '@/types'

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
        userVocabularyId: examVoc.id,
        word: examVoc.publicVocabulary.word,
        definitions: examVoc.publicVocabulary.definitions.map(transformVocabularyDefinition),
        familiarity: examVoc.familiarity,
        personalNote: examVoc.personalNote || undefined,
        customDefinition: examVoc.customDefinition || undefined,
        customExample: examVoc.customExample || undefined,
        userId: examVoc.userId,
    };
}

export function parseGPTResponseToVocabulary(jsonText: string): (Vocabulary | null) {
    try {
        const obj: GPTVocabularyResponse = JSON.parse(jsonText);
        const nanoid = customAlphabet('1234567890abcdef', 12);

        // 驗證必要欄位
        if (!obj.word || !Array.isArray(obj.definitions) || obj.definitions.length === 0) {
            console.error('Invalid GPT response structure:', obj);
            return null;
        }

        // 轉換定義格式，添加 id 並處理 undefined 值
        const definitions: VocabularyDefinition[] = obj.definitions.map((def) => ({
            id: `def_${nanoid()}`,
            partOfSpeech: def.partOfSpeech || 'N/A',
            definition: def.definition || 'N/A',
            localDefinition: def.localDefinition === 'N/A' ? undefined : def.localDefinition,
            example: def.example === 'N/A' ? undefined : def.example,
            exampleTranslation: def.exampleTranslation === 'N/A' ? undefined : def.exampleTranslation,
            pronunciation: def.pronunciation === 'N/A' ? undefined : def.pronunciation,
            synonyms: def.synonyms === 'N/A' ? undefined : def.synonyms,
            antonyms: def.antonyms === 'N/A' ? undefined : def.antonyms,
        }));

        const vocabulary: Vocabulary = {
            publicVocabularyId: `pvoc_${nanoid()}`,
            word: obj.word.toLowerCase(),
            definitions,
        };

        // 使用 Zod 驗證數據格式
        return validateVocabulary(vocabulary);
    } catch (err) {
        console.error('Failed to parse vocabulary JSON:', err);
        return null;
    }
}

//----------------------------------------------------------------------------


export function transformFullArticleToArticle(fullArticle: PrismaFullArticle): Article {
    return {
        publicArticleId: fullArticle.publicArticle.id,
        userArticleId: fullArticle.id,
        title: fullArticle.publicArticle.title,
        date: fullArticle.publicArticle.publishedAt.toISOString(),
        author: fullArticle.publicArticle.author || 'BBC News',
        image: fullArticle.publicArticle.coverImage || '',
        slug: fullArticle.publicArticle.slug,
        savedAt: fullArticle.savedAt.toISOString(),
        userId: fullArticle.userId,
    };
}

export function transformContentToArticleContent(content: PrismaArticleContent): Content {
    return {
        content: content.content,
        contentId: content.id,
        createdAt: content.createdAt.toISOString(),
    };
}