import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'
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
  