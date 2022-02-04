import { Middleware } from 'next-connect';
import { ZodSchema } from 'zod';
import { AppApiRequest, AppApiResponse } from '@minos/lib/api/types';

export function validateBodySchema(
  schema: ZodSchema<any>
): Middleware<AppApiRequest, AppApiResponse> {
  return (req, _res, next) => {
    schema.parse(req.body); // throws ZodError if fails
    next();
  };
}
