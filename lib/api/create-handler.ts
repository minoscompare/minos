import nc from 'next-connect';
import { AppApiRequest, AppApiResponse } from '@minos/lib/api/types';
import { Options } from 'next-connect';
import { isHttpError } from 'http-errors';
import { ApiError } from 'next/dist/server/api-utils';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

const ncOptions: Options<AppApiRequest, AppApiResponse> = {
  onError: (err, _req, res) => {
    if (isHttpError(err) || err instanceof ApiError) {
      res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    } else if (err instanceof ZodError) {
      res.status(422).json({ errors: err.issues });
    } else if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code == 'P2002'
    ) {
      res.status(409).json({ message: err.message });
    } else {
      console.error(err);
      if (process.env.NODE_ENV === 'production') {
        // In production, don't send a stack trace
        res.status(400).json({ message: 'Internal server error' });
      } else {
        res.status(400).json({ message: err.toString() });
      }
    }
  },
  onNoMatch: (_req, res) => {
    res.status(405).json({ message: 'Method not allowed' });
  },
};

export default function createHandler() {
  return nc<AppApiRequest, AppApiResponse>(ncOptions);
}
