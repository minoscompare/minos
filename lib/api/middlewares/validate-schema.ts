import { Middleware } from 'next-connect';
import { ZodSchema } from 'zod';
import { AppApiRequest, AppApiResponse } from '@minos/lib/api/types';

export function validateBodySchema(
  schema: ZodSchema<any>
): Middleware<AppApiRequest, AppApiResponse> {
  return (req, _res, next) => {
    req.body = schema.parse(req.body); // throws ZodError if fails
    next();
  };
}

export function validateQuerySchema(
  schema: ZodSchema<any>
): Middleware<AppApiRequest, AppApiResponse> {
  return (req, _res, next) => {
    req.query = schema.parse(req.query); // throws ZodError if fails
    next();
  };
}
