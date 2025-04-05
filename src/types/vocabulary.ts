import { z } from 'zod';

export const Vocabulary = z.object({
  id: z.string(),
  vocabulary: z.string(),
  addDate: z.string().optional(),
  meaning: z.string(),
  localizeMeaning: z.string(),
  example: z.string(),
  familiarity: z.number(),
  saved: z.boolean(),
});

export type Vocabulary = z.infer<typeof Vocabulary>;
