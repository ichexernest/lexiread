// lib/fetchBbcArticleBySlug.ts
import { fetchBbcArticles } from './fetchBbcArticles'
import { FullArticle } from '@/types';

const newsContent = `Distance runner Ben Connor says he has declined to race for Great Britain at the European Road Running Championships after being asked to pay to compete.

Connor - who was part of Team GB at the Tokyo 2020 Olympics - had been selected to run the half marathon in Leuven, Belgium in April.

In its selection policy, UK Athletics asks athletes for a fee of up to £1,100 to cover things like travel, accommodation, food, kit and staff.

Connor wrote in a post on Instagram that England Athletics have offered to subsidise the cost, "to which I'm sure many are grateful".

But the 32-year-old added that he felt "representing GB shouldn't come down to who can or cannot afford to pay for it".

"Representing your country is a privilege, and in athletics is earned via a qualifying process, which while not always perfect, gives everyone the same chances to gain selection," Connor wrote.

"Coming from a working class background I don't like the potential precedent being set where people, especially junior athletes of the future, don't have the same development or competition opportunities because of finances.

"I wish there was more transparency and honesty regarding the state of our governing bodies finances and about how our sport is being managed for this to be the position."

In a statement, UK Athletics (UKA) said the fee is likely to be under £500 and that athletes were aware of the cost when expressing an interest in competing.

It added that as more competitions get added to the calendar it is "impossible" to fund all teams.

"Upon selection athletes were also advised that the earlier 'maximum contribution amount' of £1,100, was likely to be under £500 and in some cases around the £2-250 mark with a further contribution from their home country athletics organisation," the statement read.

"UKA feels it is better to give athletes opportunity to compete than opt not to send teams at all."

World 1500m silver medallist and now commentator Hannah England says the idea of athletes being priced out of competing is "really worrying and sad" but there is just not enough money to go around.

"£20m of UK Sport funding goes to UK Athletics and it then asks athletes to pay to compete. That does not look like a good narrative," England told BBC 5 Live Breakfast.

"But that funding is audited and has to go towards producing Olympic medals. This is a new championship so there is no precedent for Olympians coming from that event.

"So it is either ask people to contribute or they don't send a team. And that is really hard for people to stomach."

The Championships are one of a number of events in which UK Athletics is asking for a contribution, with up to £200 listed for July's European Under-23 Championships in Bergen.

In the policy for that event, UK Athletics says: "We recognise that the financial commitment associated can present challenges for some athletes. To address this, the UKA Performance Pathway team is committed to working closely with athletes facing financial hardship to explore solutions that enable their involvement."`;

export async function fetchBbcArticleBySlug(slug: string): Promise<FullArticle> {
  console.log('SLUG')
  console.log(slug)
  const articles = await fetchBbcArticles()

  const article = articles.find((a) => a.id === slug)
  if (!article) {
    throw new Error('Article not found')
  }

  const fullArticle: FullArticle = {
    id: article.id || '',
    title: article.title || '',
    date: article.date || '',
    author: article.author || '',
    image: article.image || '',
    content: newsContent,
  }
  

  if (!article) {
    throw new Error('Article not found')
  }

  return fullArticle
  
}
