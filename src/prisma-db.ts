import { customAlphabet } from 'nanoid'
import { PrismaClient } from '@/generated/prisma' 
const prisma = new PrismaClient()

async function seedAll() {
    const nanoid = customAlphabet('1234567890abcdef', 12)

     const vocabularyData = [
    {
      word: 'apple',
      definitions: [
        {
          partOfSpeech: 'noun',
          definition: 'A fruit that is red or green.',
          localDefinition: '一種紅色或綠色的水果。',
          example: 'I like to eat an apple every day.',
          exampleTranslation: '我每天都喜歡吃一個蘋果。',
          synonyms: 'fruit,red,green'
        }
      ]
    },
    {
      word: 'banana',
      definitions: [
        {
          partOfSpeech: 'noun',
          definition: 'A long yellow fruit.',
          localDefinition: '一種長形的黃色水果。',
          example: 'Bananas are rich in potassium.',
          exampleTranslation: '香蕉富含鉀。',
          synonyms: 'fruit,yellow'
        }
      ]
    }
  ]

  for (const data of vocabularyData) {
    await prisma.publicVocabulary.upsert({
      where: { word: data.word },
      update: {},
      create: {
        id: `pvoc_${nanoid()}`,
        word: data.word,
        definitions: {
          create: data.definitions
        }
      }
    });
  }
    await prisma.publicArticle.upsert({
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
  
    console.log('✅ All data seeded!');
  }
  
  
  seedAll()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
  

// 取得用戶儲存的完整單字清單（含公用與私人資料）
export async function getUserFullVocabularyList(userId: string) {
  const fakedelay = Math.random() * 5000;
  await new Promise((resolve) => setTimeout(resolve, fakedelay));

  const result = await prisma.userVocabulary.findMany({
    where: { userId },
    orderBy: { addedAt: 'desc' },
    include: {
      publicVocabulary: {
        include: {
          definitions: true,
        },
      },
    },
  });

  return result.map((voc) => ({
    id: voc.publicVocabulary.id,
    word: voc.publicVocabulary.word,
    definitions: voc.publicVocabulary.definitions.map((def) => ({
      id: def.id,
      partOfSpeech: def.partOfSpeech,
      definition: def.definition,
      localDefinition: def.localDefinition ?? undefined,
      example: def.example ?? undefined,
      exampleTranslation: def.exampleTranslation ?? undefined,
      pronunciation: def.pronunciation ?? undefined,
      synonyms: def.synonyms ?? undefined,
      antonyms: def.antonyms ?? undefined,
    })),
    addedAt: voc.addedAt.toISOString().split('T')[0],
    familiarity: voc.familiarity,
    personalNote: voc.personalNote ?? undefined,
    customDefinition: voc.customDefinition ?? undefined,
    customExample: voc.customExample ?? undefined,
    userId: voc.userId,
  }));
}


// 取得用戶儲存的完整文章清單
export async function getUserFullArticleList(userId: string) {
  const result = await prisma.userArticle.findMany({
    where: { userId },
    orderBy: { savedAt: 'desc' },
    include: {
      publicArticle: true,
    },
  });
  
  return result.map((article) => ({
    id: article.publicArticle.id,
    slug: article.publicArticle.slug,
    title: article.publicArticle.title,
    content: article.publicArticle.content,
    author: article.publicArticle.author ?? undefined,
    coverImage: article.publicArticle.coverImage ?? undefined,
    publishedAt: article.publicArticle.publishedAt.toISOString(),
    savedAt: article.savedAt.toISOString(),
    userId: article.userId,
  }));
}
  
// 存入單字到PublicVocabulary
export async function addVocabularyToPublic(vocabularyData: {
  word: string;
  definitions: Array<{
    partOfSpeech: string;
    definition: string;
    localDefinition?: string;
    example?: string;
    exampleTranslation?: string;
    pronunciation?: string;
    synonyms?: string;
    antonyms?: string;
  }>;
}) {
  const nanoid = customAlphabet('1234567890abcdef', 12);
  const vocabularyId = `pvoc_${nanoid()}`;

  return await prisma.publicVocabulary.create({
    data: {
      id: vocabularyId,
      word: vocabularyData.word,
      definitions: {
        create: vocabularyData.definitions.map((def) => ({
          id: `def_${nanoid()}`, // 每個定義給一個唯一 ID
          partOfSpeech: def.partOfSpeech,
          definition: def.definition,
          localDefinition: def.localDefinition,
          example: def.example,
          exampleTranslation: def.exampleTranslation,
          pronunciation: def.pronunciation,
          synonyms: def.synonyms,
          antonyms: def.antonyms,
        })),
      },
    },
    include: {
      definitions: true,
    },
  });
}
// 存入文章到PublicArticle
export async function addArticleToPublic(articleData: {
  slug: string;
  title: string;
  content: string;
  author?: string;
  coverImage?: string;
}) {
  const nanoid = customAlphabet('1234567890abcdef', 12);
  
  return await prisma.publicArticle.create({
    data: {
      id: `particle_${nanoid()}`,
      ...articleData,
    },
  });
}

// 存入單字到UserVocabulary
// 這個函式會先檢查PublicVocabulary中是否已存在該單字
export async function addVocabularyByUser(
  userId: string,
  publicVocabularyId: string,
) {
  const nanoid = customAlphabet('1234567890abcdef', 12);
  console.log('addVocabularyByUser', userId, publicVocabularyId);
  // check if PublicVocabulary exists in PublicVocabulary
  const publicVocabulary = await prisma.publicVocabulary.findUnique({
    where: { id: publicVocabularyId },
    include: {
      definitions: true,
    },
  });
  
  // check if publicVocabulary is null
  if (!publicVocabulary) {
      throw new Error('Vocabulary does not exist in PublicVocabulary.');
  }
  
  // 檢查用戶是否已經儲存過這個單字
  const existingUserVocabulary = await prisma.userVocabulary.findUnique({
    where: {
      userId_publicVocabularyId: {
        userId,
        publicVocabularyId: publicVocabularyId,
      },
    },
  });
  
  if (existingUserVocabulary) {
    throw new Error('User has already saved this vocabulary');
  }
  
  // 創建用戶單字記錄
  return await prisma.userVocabulary.create({
    data: {
      id: `uvoc_${nanoid()}`,
      userId,
      publicVocabularyId: publicVocabularyId,
      familiarity: 0,
    },
    include: {
      publicVocabulary: true,
    },
  });
}

// 從UserVocabulary中移除單字
export async function removeVocabularyByUser(userId: string, publicVocabularyId: string) {
  return await prisma.userVocabulary.delete({
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

// 存入文章到UserArticle
// 這個函式會先檢查PublicArticle中是否已存在該文章
export async function addArticleByUser(
  userId: string,
  publicArticleId: string,
) {
  const nanoid = customAlphabet('1234567890abcdef', 12);
  const publicArticle = await prisma.publicArticle.findUnique({
     where: { id: publicArticleId },
  });
  
  // check if publicArticle is null
  if (!publicArticle) {
      throw new Error('Public article does not exist.');
  }
  
  // 檢查用戶是否已經儲存過這篇文章
  const existingUserArticle = await prisma.userArticle.findUnique({
    where: {
      userId_publicArticleId: {
        userId,
        publicArticleId: publicArticle.id,
      },
    },
  });
  
  if (existingUserArticle) {
    throw new Error('User has already saved this article');
  }
  
  // 創建用戶文章記錄
  return await prisma.userArticle.create({
    data: {
      id: `uarticle_${nanoid()}`,
      userId,
      publicArticleId: publicArticle.id,
    },
    include: {
      publicArticle: true,
    },
  });
}

// 從UserArticle中移除文章
export async function removeArticleByUser(userId: string, publicArticleId: string) {
  return await prisma.userArticle.delete({
    where: {
      userId_publicArticleId: {
        userId,
        publicArticleId,
      },
    },
  });
}

// 從UserVocabulary隨機抓出15個familiarity < 5的單字
export async function pickExamVocabulary(userId: string, limit: number = 15) {
  const vocabularies = await prisma.userVocabulary.findMany({
    where: {
      userId,
      familiarity: { lt: 5 },
    },
    include: {
      publicVocabulary: {
        include: {
          definitions: true,
        },
      },
    },
  });

  const shuffled = vocabularies.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, limit);

  return selected.map((voc) => ({
    id: voc.publicVocabulary.id,
    word: voc.publicVocabulary.word,
    definitions: voc.publicVocabulary.definitions.map((def) => ({
      id: def.id,
      partOfSpeech: def.partOfSpeech,
      definition: def.definition,
      localDefinition: def.localDefinition ?? undefined,
      example: def.example ?? undefined,
      exampleTranslation: def.exampleTranslation ?? undefined,
      pronunciation: def.pronunciation ?? undefined,
      synonyms: def.synonyms ?? undefined,
      antonyms: def.antonyms ?? undefined,
    })),
    familiarity: voc.familiarity,
    personalNote: voc.personalNote ?? undefined,
    customDefinition: voc.customDefinition ?? undefined,
    customExample: voc.customExample ?? undefined,
    userId: voc.userId,
  }));
}


// 用戶相關操作
export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function createUser(userData: {
  id: string;
  email: string;
  nativeLanguage?: string;
}) {
  return await prisma.user.create({
    data: userData,
  });
}

export async function updateUser(id: string, userData: {
  email?: string;
  nativeLanguage?: string;
}) {
  return await prisma.user.update({
    where: { id },
    data: userData,
  });
}

export async function upsertUser(userData: {
  id: string;
  email: string;
  nativeLanguage?: string;
}) {
  return await prisma.user.upsert({
    where: { id: userData.id },
    update: {
      email: userData.email,
      nativeLanguage: userData.nativeLanguage,
    },
    create: userData,
  });
}

export async function syncClerkUserToDatabase(clerkUser: {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
}) {
  const userData = {
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
  };

  try {
    // 檢查用戶是否存在
    const existingUser = await findUserById(clerkUser.id);
    
    if (!existingUser) {
      // 建立新用戶
      const newUser = await createUser(userData);
      console.log('New user created:', newUser.email);
      return { user: newUser, isNewUser: true };
    } else {
      // 更新現有用戶
      const updatedUser = await updateUser(clerkUser.id, {
        email: userData.email,
      });
      return { user: updatedUser, isNewUser: false };
    }
  } catch (error) {
    console.error('Error syncing user to database:', error);
    throw error;
  }
}

// 額外的實用函式

// 搜尋公用單字
export async function searchPublicVocabulary(searchTerm: string, limit: number = 20) {
  const results = await prisma.publicVocabulary.findMany({
    where: {
      OR: [
        { word: { contains: searchTerm, mode: 'insensitive' } },
        {
          definitions: {
            some: {
              OR: [
                { definition: { contains: searchTerm, mode: 'insensitive' } },
                { localDefinition: { contains: searchTerm, mode: 'insensitive' } },
              ],
            },
          },
        },
      ],
    },
    take: limit,
    orderBy: { word: 'asc' },
    include: {
      definitions: true,
    },
  });

  return results.map((voc) => ({
    id: voc.id,
    word: voc.word,
    definitions: voc.definitions.map((def) => ({
      id: def.id,
      partOfSpeech: def.partOfSpeech,
      definition: def.definition,
      localDefinition: def.localDefinition ?? undefined,
      example: def.example ?? undefined,
      exampleTranslation: def.exampleTranslation ?? undefined,
      pronunciation: def.pronunciation ?? undefined,
      synonyms: def.synonyms ?? undefined,
      antonyms: def.antonyms ?? undefined,
    })),
  }));
}


// 搜尋公用文章
export async function searchPublicArticles(searchTerm: string, limit: number = 20) {
  return await prisma.publicArticle.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { content: { contains: searchTerm } },
        { author: { contains: searchTerm } },
      ],
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  });
}