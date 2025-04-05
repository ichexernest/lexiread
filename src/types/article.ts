import { z } from 'zod';

export const Article = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  image: z.string(),
});

export type Article = z.infer<typeof Article>;
