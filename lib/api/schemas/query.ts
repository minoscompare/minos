import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, 'page must be an integer greater or equal to 1')
    .refine((arg) => Number(arg) > 0, {
      message: 'page must be greater or equal to 1',
    }),
  perPage: z
    .string()
    .regex(/^\d+$/, 'perPage must be a positive integer')
    .refine((arg) => Number(arg) <= 100, {
      message: 'perPage must be lesser than or equal to 100',
    }),
});
