// lib/fetchBbcArticles.ts
import Parser from 'rss-parser'
import { Article } from '@/types'

const parser = new Parser()

export async function fetchBbcArticles(): Promise<Article[]> {
  const feed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml')

  return feed.items.slice(0, 5).map((item) => {
    const title = item.title ?? 'no-title'
    const date = item.pubDate ?? new Date().toISOString()
    const id = generateSlug(title)

    return {
      id,
      title,
      date,
      author: item.creator ?? item.author ?? 'BBC News',
      image: item['media:thumbnail']?.$.url ?? 'https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif',
    }
  })
}

function generateSlug(title: string) {
  const titlePart = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
  return `${titlePart}`
}
