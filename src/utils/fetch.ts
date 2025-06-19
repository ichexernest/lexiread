import { Vocabulary, Article, Content, QuizResult, VocStats } from "@/types"
import { parseGPTResponseToVocabulary } from "@/utils/tr"
import { OpenAI } from 'openai'
import * as cheerio from 'cheerio';
import { XMLParser } from 'fast-xml-parser';
import { addArticleToPublic, getContentById,getUserVocTotalAndCount, getTodayArticlesWithUserProgress, updateUserVocabularyFamiliarity, getArticleWithUserProgressById, pickExamVocabulary, getUserArticleList,getUserVocabularyWithPage } from "@/prisma-db"
import utils from "./utils";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


const BBC_RSS_FEEDS = [
    'http://feeds.bbci.co.uk/news/rss.xml',
    'http://feeds.bbci.co.uk/news/world/rss.xml',
    'http://feeds.bbci.co.uk/news/uk/rss.xml',
    'http://feeds.bbci.co.uk/news/business/rss.xml',
    'http://feeds.bbci.co.uk/news/technology/rss.xml'
];
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
interface FeedItem {
    title: string;
    url: string;
    pubDate: string;
    description: string;
    link?: string;
    guid?: string;
}

const getBbcFeed = async (feedUrl: string) => {
    try {
        const response = await fetch(feedUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlData = await response.text();
        const parser = new XMLParser();
        const result = parser.parse(xmlData);

        const items = result.rss.channel.item || [];

        return items.map((item: FeedItem) => ({
            title: item.title || '',
            url: item.link || item.guid,
            pubDate: item.pubDate || '',
            description: item.description || ''
        }));

    } catch (error) {
        console.error(`獲取RSS失敗: ${feedUrl}`, error);
        return [];
    }
}


const getArticles = async (url: string) => {
    try {
        await delay(1000);

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const content = $('[data-component="text-block"] p, [data-component="text-block"] h2, [data-component="text-block"] h3')
            .map((i, el) => $(el).text().trim())
            .get()
            .filter(text => text.length > 0)
            .join('\n\n');

        const image = $('meta[property="og:image"]').attr('content') ||
            $('.js-delayed-image-load').first().attr('data-src') ||
            $('img').first().attr('src') || '';

        const author = $('[data-module="byline"] a').text().trim() ||
            $('.ssrcss-68pt20-Text-TextContributorName').text().trim() ||
            'BBC News';

        return {
            content: content || '內容獲取失敗',
            image: image.startsWith('//') ? 'https:' + image : image,
            author: author || 'BBC News'
        };

    } catch (error) {
        console.error(`獲取文章內容失敗: ${url}`, error);
        return {
            content: '內容獲取失敗',
            image: '',
            author: 'BBC News'
        };
    }
}

// 主函數1：抓取BBC文章並存入資料庫
const fetchAndSaveBBCArticles = async (): Promise<Article[]> => {
    try {
        const allArticles: FeedItem[] = [];

        for (const feedUrl of BBC_RSS_FEEDS) {
            const articles = await getBbcFeed(feedUrl);
            allArticles.push(...articles);
            await delay(500);
        }

        // 過濾當日文章
        const today = new Date();
        const todayStr = today.toDateString();

        const todayArticles = allArticles.filter(article => {
            if (!article.pubDate) return false;
            const articleDate = new Date(article.pubDate);
            return articleDate.toDateString() === todayStr;
        });

        if (todayArticles.length < 5) {
            console.warn(`當日文章不足5篇，僅有 ${todayArticles.length} 篇`);
        }

        // 隨機選擇5篇文章
        const shuffled = todayArticles.sort(() => 0.5 - Math.random());
        const selectedArticles = shuffled.slice(0, 5);

        const fullArticles: Article[] = [];
        const Contents: string[] = [];

        for (let i = 0; i < selectedArticles.length; i++) {
            const article = selectedArticles[i];
            const articleId = `bbc_${Date.now()}_${i}`;

            const fullContent = await getArticles(article.url);

            const fullArticle: Article = {
                publicArticleId: articleId,
                title: article.title,
                slug: utils.generateSlug(article.title),
                date: article.pubDate ? new Date(article.pubDate).toISOString() : new Date().toISOString(),
                author: fullContent.author,
                image: fullContent.image,
            };

            fullArticles.push(fullArticle);
            Contents.push(fullContent.content)
        }

        // 存入資料庫
        await addArticleToPublic(fullArticles, Contents);

        return fullArticles;

    } catch (error) {
        console.error('獲取BBC文章時發生錯誤:', error);
        throw error;
    }
}

const getTodayArticles = async (userId:string): Promise<Article[]> => {
    try {
        const articles = await getTodayArticlesWithUserProgress(userId);
        return articles;
    } catch (error) {
        console.error('getTodayArticles Error:', error);
        throw error;
    }
}

const getUsersArticles = async (userId: string): Promise<Article[]> => {
    try {
        const articles = await getUserArticleList(userId);
        return articles;
    } catch (error) {
        console.error('getTodayArticles Error:', error);
        throw error;
    }
}

const getContent = async (id: string): Promise<Content | null> => {
    try {
        const articles = await getContentById(id);
        console.log('getContent', articles)
        return articles;
    } catch (error) {
        console.error('getContent Error:', error);
        throw error;
    }
}

const getArticlesById = async (id: string, userId?: string): Promise<Article | null> => {
    try {
        const articles = await getArticleWithUserProgressById(id, userId);
        console.log('getArticlesById', articles)
        return articles;
    } catch (error) {
        console.error('getArticlesById Error:', error);
        throw error;
    }
}


const getVocabularyFromGPT = async (word: string): Promise<Vocabulary | null> => {
    try {
        const prompt = `Please provide the vocabulary information for the word "${word}" in the following JSON format only, without any extra explanation or commentary.

Format:
{
  "word": "${word}",
  "definitions": [
    {
      "partOfSpeech": "string",
      "definition": "string",
      "localDefinition": "string (in Traditional Chinese)",
      "example": "string",
      "exampleTranslation": "string (in Traditional Chinese)",
      "pronunciation": "string",
      "synonyms": "string (comma-separated)",
      "antonyms": "string (comma-separated)"
    }
  ]
}

Requirements:
- Provide at least one definition object in the "definitions" array.
- If a word has multiple parts of speech (e.g., noun, verb, adjective), provide at least one definition object for each of them.
- Ensure all fields are filled, even optional ones (use "N/A" if nothing fits).
- Make sure that:
  - "localDefinition" and "exampleTranslation" are written only in Traditional Chinese, not Simplified Chinese.
  - The entire response is valid JSON.
  - All values are strings, even if they're empty or not applicable.
- Return only the JSON, no markdown formatting, no commentary.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional English teacher. Please respond with properly formatted JSON only.'
                },
                { role: 'user', content: prompt }
            ],
            temperature: 0.3, // 降低溫度以獲得更一致的回應
            max_tokens: 1000,
        });

        const result = response.choices[0].message.content;

        if (!result) {
            console.error('Empty GPT response');
            return null;
        }

        console.log('GPT response:', result);
        return parseGPTResponseToVocabulary(result);
    } catch (error) {
        console.error('Error fetching from GPT:', error);
        return null;
    }
}

const getUserVocabularyPage = async (userId: string, page: number): Promise<Vocabulary[]> => {
    try {
        const vocabularyList = await getUserVocabularyWithPage(userId, page);
        return vocabularyList;
    } catch (error) {
        console.error('getUserVocabularyPage Error:', error);
        throw error;
    }
}

const getQuizVocabularyList = async (userId: string): Promise<Vocabulary[]> => {
    try {
        const vocabularyList = await pickExamVocabulary(userId);
        return vocabularyList;
    } catch (error) {
        console.error('getQuizVocabularyList Error:', error);
        throw error;
    }
}

const getVocTotalAndCount = async (userId: string): Promise<VocStats> => {
    try {
        const result= await getUserVocTotalAndCount(userId);
        return result;
    } catch (error) {
        console.error('getQuizVocabularyList Error:', error);
        throw error;
    }
}

const updateFamiliarity = async (results: QuizResult[]): Promise<{
    success: boolean;
    processedCount: number;
    error?: string;
}> => {
    try {
        if (!Array.isArray(results) || results.length === 0) {
            return {
                success: false,
                processedCount: 0,
                error: 'Invalid or empty results array'
            };
        }

        // 將測驗結果轉換為熟悉度變化
        const familiarityUpdates = results.map(result => {
            let familiarityChange = 0;

            switch (result.result) {
                case 'remembered':
                    familiarityChange = 1;
                    break;
                case 'forgotten':
                case 'notSure':
                    familiarityChange = -1;
                    break;
                default:
                    familiarityChange = 0;
            }

            return {
                userVocabularyId: result.userVocabularyId,
                familiarityChange
            };
        });

        const updateResult = await updateUserVocabularyFamiliarity(familiarityUpdates);

        return {
            success: true,
            processedCount: updateResult.count
        };

    } catch (error) {
        console.error('Error updating familiarity:', error);
        return {
            success: false,
            processedCount: 0,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}



const fetchService = {
    fetchAndSaveBBCArticles: fetchAndSaveBBCArticles,
    getTodayArticles: getTodayArticles,
    getUsersArticles: getUsersArticles,
    getArticlesById: getArticlesById,
    getUserVocabularyPage: getUserVocabularyPage,
    getVocabularyFromGPT: getVocabularyFromGPT,
    getQuizVocabularyList: getQuizVocabularyList,
    getContent: getContent,
    updateFamiliarity: updateFamiliarity,
    getVocTotalAndCount: getVocTotalAndCount
}

export default fetchService