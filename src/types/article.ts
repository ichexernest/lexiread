import { z } from 'zod';

export const Content = z.object({
  content: z.string(),
  contentId: z.string(),
  createdAt: z.string(),
});

export const Article = z.object({
  publicArticleId: z.string(),
  userArticleId: z.string().optional(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  image: z.string(),
  slug: z.string(),
  savedAt: z.string().optional(),
  userId: z.string().optional(),
});

export type Article = z.infer<typeof Article>;
export type Content = z.infer<typeof Content>;
