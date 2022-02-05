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
      return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
      return res.status(422).json({ errors: err.issues });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          // Conflict
          return res.status(409).json({ message: 'Resource already exists' });
        case 'P2025':
          // Not found
          return res.status(404).json({ message: 'Resource does not exist' });
      }
      // else, continue
    }

    console.error(err);

    if (process.env.NODE_ENV === 'production') {
      // In production, don't send a stack trace
      return res.status(500).json({ message: 'Internal server error' });
    } else {
      return res.status(500).json({ message: err.toString() });
    }
  },
  onNoMatch: (_req, res) => {
    res.status(405).json({ message: 'Method not allowed' });
  },
};

export default function createHandler() {
  return nc<AppApiRequest, AppApiResponse>(ncOptions);
}
