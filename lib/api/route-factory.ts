import nc from 'next-connect';
import { AppApiRequest, AppApiResponse } from '@minos/lib/api/types';
import { Options } from 'next-connect';
import { isHttpError } from 'http-errors';
import { ApiError } from 'next/dist/server/api-utils';

const ncOptions: Options<AppApiRequest, AppApiResponse> = {
  onError: (err, _req, res) => {
    if (isHttpError(err) || err instanceof ApiError) {
      res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    } else {
      console.error(err);
      if (process.env.NODE_ENV === 'production') {
        // In production, don't send a stack trace
        res.status(400).json({ status: 400, message: 'Internal server error' });
      } else {
        res.status(400).json({ status: 400, message: err.toString() });
      }
    }
  },
  onNoMatch: (_req, res) => {
    res.status(404).json({ status: 404, message: 'Route not found' });
  },
};

export default function createHandler() {
  return nc<AppApiRequest, AppApiResponse>(ncOptions);
}
