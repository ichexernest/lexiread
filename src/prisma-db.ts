import { customAlphabet } from 'nanoid'
import { PrismaClient } from '@/generated/prisma' 
import { Vocabulary, Article, Content } from './types';
import utils from './utils/utils';
import { 
  transformUserVocabularyToVocabulary,
  transformPublicVocabularyToVocabulary,
  transformExamVocabularyToVocabulary,
  transformFullArticleToArticle,
  transformContentToArticleContent
} from '@/utils/tr';
const prisma = new PrismaClient()
  

// 取得用戶儲存的完整單字清單
export async function getUserFullVocabularyList(userId: string): Promise<Vocabulary[]> {
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

  return result.map(transformUserVocabularyToVocabulary);
}
// 查詢公用和私人單字
export async function findVocabularyWithUserProgress(
  word: string, 
  userId?: string
): Promise<Vocabulary | null> {
  console.log('findVocabularyWithUserProgress', word, userId);
  const publicVoc = await prisma.publicVocabulary.findFirst({
    where: { word: word.toLowerCase() },
    include: {
      definitions: true,
      userVocabularies: userId ? {
        where: { userId: userId },
        take: 1
      } : false
    }
  });

  if (!publicVoc) {
    return null;
  }

  const userVoc = publicVoc.userVocabularies?.[0];

  // 根據 Vocabulary 類型組合返回資料
  const vocabulary: Vocabulary = {
    publicVocabularyId: publicVoc.id,
    userVocabularyId: userVoc?.id,
    word: publicVoc.word,
    definitions: publicVoc.definitions.map(def => ({
      id: def.id,
      partOfSpeech: def.partOfSpeech,
      definition: def.definition,
      localDefinition: def.localDefinition || undefined,
      example: def.example || undefined,
      exampleTranslation: def.exampleTranslation || undefined,
      pronunciation: def.pronunciation || undefined,
      synonyms: def.synonyms || undefined,
      antonyms: def.antonyms || undefined,
    })),
    // 用戶相關的欄位，如果有 userVoc 就填入，沒有就 undefined
    addedAt: userVoc?.addedAt.toISOString(),
    familiarity: userVoc?.familiarity,
    personalNote: userVoc?.personalNote || undefined,
    customDefinition: userVoc?.customDefinition || undefined,
    customExample: userVoc?.customExample || undefined,
    userId: userVoc?.userId,
  };

  return vocabulary;
}
// 存入單字到PublicVocabulary
export async function addVocabularyToPublic(vocabularyData: Vocabulary): Promise<boolean> {
  try {

    await prisma.publicVocabulary.create({
      data: {
        id: vocabularyData.publicVocabularyId,
        word: vocabularyData.word,
        definitions: {
          create: vocabularyData.definitions.map((def) => ({
            id: def.id,
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
    });

    return true;
  } catch (error) {
    console.error('Failed to add vocabulary to public:', error);
    return false;
  }
}
// 存入單字到UserVocabulary
export async function addVocabularyByUser(
  userId: string,
  publicVocabularyId: string,
): Promise<boolean> {
  try {
    const nanoid = customAlphabet('1234567890abcdef', 12);
    console.log('addVocabularyByUser', userId, publicVocabularyId);
    
    // 檢查PublicVocabulary是否存在
    const publicVocabulary = await prisma.publicVocabulary.findUnique({
      where: { id: publicVocabularyId },
    });
    
    if (!publicVocabulary) {
      console.error('Vocabulary does not exist in PublicVocabulary.');
      return false;
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
      console.error('User has already saved this vocabulary');
      return false;
    }
    
    // 創建用戶單字記錄
    await prisma.userVocabulary.create({
      data: {
        id: `uvoc_${nanoid()}`,
        userId,
        publicVocabularyId: publicVocabularyId,
        familiarity: 0,
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to add vocabulary by user:', error);
    return false;
  }
}
// 從UserVocabulary中移除單字
export async function removeVocabularyByUser(userId: string, publicVocabularyId: string): Promise<boolean> {
  try {
    await prisma.userVocabulary.delete({
      where: {
        userId_publicVocabularyId: {
          userId,
          publicVocabularyId,
        },
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to remove vocabulary by user:', error);
    return false;
  }
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
): Promise<boolean> {
  try {
    await prisma.userVocabulary.update({
      where: {
        userId_publicVocabularyId: {
          userId,
          publicVocabularyId,
        },
      },
      data: updates,
    });

    return true;
  } catch (error) {
    console.error('Failed to update vocabulary:', error);
    return false;
  }
}
// 搜尋公用單字
export async function searchPublicVocabulary(searchTerm: string, limit: number = 20): Promise<Vocabulary[]> {
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

  return results.map(transformPublicVocabularyToVocabulary);
}
// 搜尋公用單字
export async function findExactPublicVocabulary(searchTerm: string): Promise<Vocabulary | null> {
  const result = await prisma.publicVocabulary.findFirst({
    where: {
      word: {
        equals: searchTerm,
        mode: 'insensitive'
      }
    },
    include: {
      definitions: true,
    },
  });

  if (!result) {
    return null;
  }

  return transformPublicVocabularyToVocabulary(result);
}
export async function getPublicVocabularyById(id: string): Promise<Vocabulary | null> {
  const result = await prisma.publicVocabulary.findUnique({
    where: { id },
    include: {
      definitions: true,
    },
  });

  if (!result) {
    return null;
  }

  return transformPublicVocabularyToVocabulary(result);
}
// 從UserVocabulary隨機抓出15個familiarity < 5的單字
export async function pickExamVocabulary(userId: string, limit: number = 15): Promise<Vocabulary[]> {
 // 取得所有用戶的單字，包含完整的關聯資料
  const allUserVocabularies = await prisma.userVocabulary.findMany({
    where: {
      userId,
    },
    include: {
      publicVocabulary: {
        include: {
          definitions: true,
        },
      },
    },
  });

  // 使用選題邏輯函數挑選單字
  const selectedVocabularies = utils.selectVocabulariesByFamiliarity(
    allUserVocabularies,
    (vocab) => vocab.familiarity, // 熟悉度取得函數
    limit
  );

  return selectedVocabularies.map(transformExamVocabularyToVocabulary);
}

export async function updateUserVocabularyFamiliarity(
  updates: Array<{ userVocabularyId: string; familiarityChange: number }>
): Promise<{ count: number }> {
  // 使用 Prisma 的 transaction 來批量更新
  return await prisma.$transaction(async (tx) => {
    // 先取得所有相關的 UserVocabulary 記錄
    const userVocabularyIds = updates.map(u => u.userVocabularyId);
    const currentVocabs = await tx.userVocabulary.findMany({
      where: { id: { in: userVocabularyIds } },
      select: { id: true, familiarity: true }
    });

    // 建立 id 到 familiarity 的對應
    const familiarityMap = new Map(
      currentVocabs.map(v => [v.id, v.familiarity])
    );

    // 批量更新操作
    const updatePromises = updates.map(({ userVocabularyId, familiarityChange }) => {
      const currentFamiliarity = familiarityMap.get(userVocabularyId);
      
      if (currentFamiliarity === undefined) {
        throw new Error(`UserVocabulary with id ${userVocabularyId} not found`);
      }

      // 計算新的熟悉度，確保在 0-5 範圍內
      const newFamiliarity = Math.max(0, Math.min(5, currentFamiliarity + familiarityChange));

      return tx.userVocabulary.update({
        where: { id: userVocabularyId },
        data: { familiarity: newFamiliarity },
      });
    });

    await Promise.all(updatePromises);
    
    return { count: updates.length };
  });
}

//-------------------------------------------------------------------------------------------------------------------------------------

// 取得用戶儲存的完整文章清單
export async function getUserArticleList(userId: string): Promise<Article[]> {
  const result = await prisma.userArticle.findMany({
    where: { userId },
    orderBy: { savedAt: 'desc' },
    include: {
      publicArticle: true,
    },
  });
  
  return result.map(transformFullArticleToArticle);
}
// 檢查文章是否已存在（根據title和日期）
export async function checkArticleExists (title: string, publishedAt: Date): Promise<boolean> {
  try {
    // 檢查相同標題且在同一天發布的文章
    const startOfDay = new Date(publishedAt);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(publishedAt);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingArticle = await prisma.publicArticle.findFirst({
      where: {
        title: title,
        publishedAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });
    
    return !!existingArticle;
  } catch (error) {
    console.error('檢查文章是否存在時發生錯誤:', error);
    return false;
  }
}
// 存入文章到PublicArticle
export async function addArticleToPublic(articles: Article[], contents: string[]): Promise<boolean> {
  const nanoid = customAlphabet('1234567890abcdef', 12);

  try {
    if (articles.length !== contents.length) {
      throw new Error(`文章數量（${articles.length}）與內容數量（${contents.length}）不一致`);
    }

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const content = contents[i];
      const publishedAt = new Date(article.date);

      // 檢查是否已存在相同文章
      const exists = await checkArticleExists(article.title, publishedAt);
      if (exists) {
        console.log(`文章已存在，跳過: ${article.title}`);
        continue;
      }

      // 檢查唯一 slug
      let slug = article.slug;
      let counter = 1;

      while (await prisma.publicArticle.findUnique({ where: { slug } })) {
        slug = `${article.slug}-${counter}`;
        counter++;
      }

      // 建立 content
      const contentRecord = await prisma.articleContent.create({
        data: {
          content: content,
        },
      });

      // 建立主文章（含關聯 contentId）
      await prisma.publicArticle.create({
        data: {
          id: `p_article_${nanoid()}`,
          slug: slug,
          title: article.title,
          publishedAt: publishedAt,
          author: article.author,
          coverImage: article.image || null,
          contentId: contentRecord.id,
        },
      });

      console.log(`文章已存入資料庫: ${article.title}`);
    }

    console.log(`成功處理 ${articles.length} 篇文章`);
    return true;
  } catch (error) {
    console.error('存入BBC文章到資料庫時發生錯誤:', error);
    return false;
  }
}
// 存入文章到UserArticle，這個函式會先檢查PublicArticle中是否已存在該文章
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
      id: `u_article_${nanoid()}`,
      userId,
      publicArticleId: publicArticle.id,
    },
    include: {
      publicArticle: true,
    },
  });
}
// 從資料庫獲取今日文章，查詢今日文章及用戶是否收藏
export async function getTodayArticlesWithUserProgress(userId?: string): Promise<Article[]> {
  try {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    console.log('=== 開始查詢文章 ===');
    console.log('userId:', userId);

    // 第一步：先獲取今日文章
    let articles = await prisma.publicArticle.findMany({
      where: {
        publishedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 5,
    });

    // 如果今天沒有文章，改抓昨天的
    if (articles.length === 0) {
      console.log('今天沒有文章，查詢昨天的');
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const startOfYesterday = new Date(yesterday);
      startOfYesterday.setHours(0, 0, 0, 0);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setHours(23, 59, 59, 999);

      articles = await prisma.publicArticle.findMany({
        where: {
          publishedAt: {
            gte: startOfYesterday,
            lte: endOfYesterday,
          },
        },
        orderBy: {
          publishedAt: 'desc',
        },
        take: 5,
      });
    }

    console.log('找到的文章數量:', articles.length);
    console.log('文章列表:', articles.map(a => ({ id: a.id, title: a.title })));

    const userArticleMap = new Map<string, string>();
    
    if (userId && articles.length > 0) {
      const publicArticleIds = articles.map(article => article.id);
      console.log('要查詢的文章 IDs:', publicArticleIds);
      
      const userArticles = await prisma.userArticle.findMany({
        where: {
          userId: userId,
          publicArticleId: {
            in: publicArticleIds
          }
        }
      });

      console.log('找到的用戶文章記錄:', userArticles);
      console.log('用戶文章記錄數量:', userArticles.length);

      // 建立 publicArticleId -> userArticle.id 的對應關係
      userArticles.forEach(userArticle => {
        console.log(`設定對應: ${userArticle.publicArticleId} -> ${userArticle.id}`);
        userArticleMap.set(userArticle.publicArticleId, userArticle.id);
      });

      console.log('最終的 userArticleMap:', Object.fromEntries(userArticleMap));
    } else {
      console.log('跳過用戶文章查詢，原因:', !userId ? 'no userId' : 'no articles');
    }

    // 第三步：組合結果
    const result = articles.map((article) => {
      const userArticleId = userArticleMap.get(article.id) || null;
      console.log(`文章 ${article.id} 對應的 userArticleId:`, userArticleId);

      return {
        publicArticleId: article.id,
        userArticleId: userArticleId || undefined,
        title: article.title,
        date: article.publishedAt.toISOString(),
        author: article.author || 'BBC News',
        image: article.coverImage || '',
        slug: article.slug,
        isBookmarked: !!userArticleId,
      };
    });

    console.log('最終結果:', result.map(r => ({ 
      title: r.title, 
      userArticleId: r.userArticleId, 
      isBookmarked: r.isBookmarked 
    })));

    return result;

  } catch (error) {
    console.error('獲取今日 BBC 文章失敗:', error);
    throw error;
  }
}

// 從UserArticle中移除文章
export async function removeArticleByUser(userId: string, publicArticleId: string): Promise<boolean> {
    try {
    await prisma.userArticle.delete({
    where: {
      userId_publicArticleId: {
        userId,
        publicArticleId,
      },
    },
  });
    return true;
  } catch (error) {
    console.error('Failed to remove article by user:', error);
    return false;
  }
}
//
export async function getContentById(publicArticleId: string): Promise<Content | null> {
  try {
    // 先查 PublicArticle，拿 contentId
    const article = await prisma.publicArticle.findUnique({
      where: { id: publicArticleId },
      include: { content: true }, // 👈 直接把 content 一起撈出來
    });

    if (!article || !article.content) {
      console.warn(`找不到文章或內容: ${publicArticleId}`);
      return null;
    }

    return transformContentToArticleContent(article.content);
  } catch (error) {
    console.error(`查詢 PublicArticle(${publicArticleId}) 對應內容時發生錯誤:`, error);
    return null;
  }
}
export async function getArticleWithUserProgressById(
  articleId: string,
  userId?: string
): Promise<Article | null> {
  try {
    const article = await prisma.publicArticle.findUnique({
      where: { id: articleId },
      include: {
        userArticles: userId
          ? {
              where: { userId },
              take: 1,
            }
          : false,
      },
    });

    if (!article) return null;

    const userArticle = article.userArticles?.[0];

    const result: Article = {
      publicArticleId: article.id,
      userArticleId: userArticle?.id,
      title: article.title,
      date: article.publishedAt.toISOString(),
      author: article.author || 'BBC News',
      image: article.coverImage || '',
      slug: article.slug,
      savedAt: userArticle?.savedAt.toISOString(),
      userId: userArticle?.userId,
    };

    return result;
  } catch (error) {
    console.error(`查詢單篇文章(${articleId})時發生錯誤:`, error);
    throw error;
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------

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
