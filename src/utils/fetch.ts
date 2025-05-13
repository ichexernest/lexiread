import { Article } from "@/types/article"
import utils from "@/utils/utils"
import Parser from 'rss-parser'
import mock from '@/utils/mock'

const getBbcFeed = async() =>{
    const parser = new Parser()
    return await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml')
}
const getArticles =async (): Promise<Article[]> => {
    const feed = await getBbcFeed()

return feed.items.slice(0, 5).map((item) => ({
id: utils.generateSlug(item.title ?? 'no-title'),
title: item.title ?? 'no-title',
date: item.pubDate ?? new Date().toISOString(),
author: item.creator ?? item.author ?? 'BBC News',
image: item['media:thumbnail']?.$.url ?? 'https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif',
}))
}

const getArticleBySlug = async (slug: string) => {
    const articles = await getArticles()
    const article = articles.find((a) => a.id === slug)
  
    if (!article) return null
  
    return {
      ...article,
      content: mock.newsContent ?? 'Content coming soon.',
    }
}

const fetchService ={
    getBbcFeed: getBbcFeed,
    getArticles: getArticles,
    getArticleBySlug: getArticleBySlug
}

export default fetchService