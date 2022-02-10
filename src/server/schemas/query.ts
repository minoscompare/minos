import { z } from 'zod';

export const InfinitePaginationSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
});
