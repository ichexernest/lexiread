import { customAlphabet } from 'nanoid'
import { PrismaClient } from '@/generated/prisma' 
const prisma = new PrismaClient()

async function seedAll() {
    const nanoid = customAlphabet('1234567890abcdef', 12)

    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        id: `user_111111111111`,
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        nativeLanguage: 'zh-TW',
        emailVerified: true,
      },
    });
    const vocabularyData = [
        {
          id: `pvoc_${nanoid()}`,
          word: 'apple',
          definition: 'A fruit that is red or green.',
          localDefinition: '一種紅色或綠色的水果。',
          partOfSpeech: 'noun',
          example: 'I like to eat an apple every day.',
          exampleTranslation: '我每天都喜歡吃一個蘋果。',
          synonyms: 'fruit,red,green'
        },
        {
          id: `pvoc_${nanoid()}`,
          word: 'banana',
          definition: 'A long yellow fruit.',
          localDefinition: '一種長形的黃色水果。',
          partOfSpeech: 'noun',
          example: 'Bananas are rich in potassium.',
          exampleTranslation: '香蕉富含鉀。',
          synonyms: 'fruit,yellow'
        },
      ]
      for (const data of vocabularyData) {
        await prisma.publicVocabulary.upsert({
          where: { word: data.word },
          update: {},
          create: data,
        });
      }
      
  
    const vocs = await prisma.publicVocabulary.findMany({
      where: { word: { in: ['apple', 'banana'] } }
    });
  
    for (const voc of vocs) {
      await prisma.userVocabulary.upsert({
        where: {
          userId_publicVocabularyId: {
            userId: user.id,
            publicVocabularyId: voc.id,
          },
        },
        update: {},
        create: {
          id: `uvoc_${nanoid()}`,
          userId: user.id,
          publicVocabularyId: voc.id,
          familiarity: 2,
          personalNote: `這是測試筆記：${voc.word}`,
        },
      });
    }
  
    const article = await prisma.publicArticle.upsert({
      where: { slug: 'test-article' },
      update: {},
      create: {
        id: `particle_${nanoid()}`,
        slug: 'test-article',
        title: 'This is a test article',
        content: 'This is the article content containing apple and banana.',
        author: 'BBC',
        coverImage: 'https://example.com/image.jpg',
      },
    });
  
    await prisma.userArticle.upsert({
      where: {
        userId_publicArticleId: {
          userId: user.id,
          publicArticleId: article.id,
        },
      },
      update: {},
      create: {
        id: `uarticle_${nanoid()}`,
        userId: user.id,
        publicArticleId: article.id,
      },
    });
  
    console.log('✅ All data seeded!');
  }
  
  seedAll()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
  

// ✅ 取得用戶儲存的完整單字清單（含公用與私人資料）
export async function getUserFullVocabularyList(userId: string) {
  const fakedelay = Math.random() * 5000
  await new Promise((resolve) => setTimeout(resolve, fakedelay))
    const result = await prisma.userVocabulary.findMany({
      where: { userId },
      orderBy: { addedAt: 'desc' },
      include: {
        publicVocabulary: true, // 👈 合併 public 部分
      },
    });
    return result.map((voc) => ({
        id: voc.publicVocabulary.id,
        word: voc.publicVocabulary.word,
        definition: voc.publicVocabulary.definition,
        partOfSpeech: voc.publicVocabulary.partOfSpeech,
        localDefinition: voc.publicVocabulary.localDefinition ?? undefined, // ✅ 這裡
        example: voc.publicVocabulary.example ?? undefined,
        exampleTranslation: voc.publicVocabulary.exampleTranslation ?? undefined,
        pronunciation: voc.publicVocabulary.pronunciation ?? undefined,
        synonyms: voc.publicVocabulary.synonyms ?? undefined,
        antonyms: voc.publicVocabulary.antonyms ?? undefined,
        addedAt: voc.addedAt.toISOString().split('T')[0],
        familiarity: voc.familiarity,
        personalNote: voc.personalNote ?? undefined,
        customDefinition: voc.customDefinition ?? undefined,
        customExample: voc.customExample ?? undefined,
        userId: voc.userId,
      }))
      
  }
  

  //將單字存進PublicVocabulary並產生該用戶的私人資料(UserVocabulary, default)
  export async function addVocabulary(
    word: string,
    definition: string,
    localDefinition: string,
    partOfSpeech: string,
    example: string,
    exampleTranslation: string,
    synonyms: string,
    userId: string
  ) {
    const nanoid = customAlphabet('1234567890abcdef', 12)
    const existing = await prisma.publicVocabulary.findUnique({ where: { word } });
    const voc = existing || await prisma.publicVocabulary.create({
      data: {id: `pvoc_${nanoid()}`,word, definition, localDefinition, partOfSpeech, example, exampleTranslation, synonyms },
    });
  
    return prisma.userVocabulary.upsert({
      where: {
        userId_publicVocabularyId: {
          userId,
          publicVocabularyId: voc.id,
        },
      },
      update: {},
      create: {
        id: `uvoc_${nanoid()}`,
        userId,
        publicVocabularyId: voc.id,
        familiarity: 0,
      },
    });
  }
  
  

  //將單字從UserVocabulary移除
  export async function deleteUserVocabulary(userId: string, publicVocabularyId: string) {
    return prisma.userVocabulary.delete({
      where: {
        userId_publicVocabularyId: {
          userId,
          publicVocabularyId,
        },
      },
    });
  }
  

  //更新UserVocabulary中該單字的內容
  export async function updateVocabulary(
    userId: string,
    publicVocabularyId: string,
    updates: {
      familiarity?: number
      personalNote?: string
      customDefinition?: string
      customExample?: string
    }
  ) {
    return prisma.userVocabulary.update({
      where: {
        userId_publicVocabularyId: {
          userId,
          publicVocabularyId,
        },
      },
      data: updates,
    });
  }
  
