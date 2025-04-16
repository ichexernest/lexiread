import { z } from 'zod';

export const Article = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  image: z.string(),
});

export const FullArticle = Article.extend({
  content: z.string(),
})

export type Article = z.infer<typeof Article>;
export type FullArticle = z.infer<typeof FullArticle>;
