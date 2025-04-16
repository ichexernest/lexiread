import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedVocabulary = async () => {
    let count =  await prisma.publicVocabulary.count()
    if (count === 0) {
        await prisma.publicVocabulary.createMany({
            data: [
              {
                word: 'apple',
                definition: 'A fruit that is red or green.',
                partOfSpeech: 'noun',
                example: 'I like to eat an apple every day.',
                exampleTranslation: '我每天都喜歡吃一個蘋果。',
                synonyms: 'fruit,red,green', // ✅ 重點改這裡
              },
              {
                word: 'banana',
                definition: 'A long yellow fruit.',
                partOfSpeech: 'noun',
                example: 'Bananas are rich in potassium.',
                exampleTranslation: '香蕉富含鉀。',
                synonyms: 'fruit,yellow', // ✅ 重點改這裡
              },
            ],
          })
          
    }

    await prisma.$disconnect()

}

seedVocabulary()