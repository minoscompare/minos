import { AppApiRequest, AppApiResponse } from './types';
import { Options } from 'next-connect';
import { isHttpError } from 'http-errors';

export const ncOptions: Options<AppApiRequest, AppApiResponse> = {
  onError: (err, _req, res) => {
    if (isHttpError(err)) {
      res.status(err.status).json({
        status: err.status,
        message: err.message,
      });
    } else {
      if (process.env.NODE_ENV === 'production') {
        // In production, don't send a stack trace
        res.status(400).json({ status: 400, message: 'Internal server error' });
      } else {
        res.status(400).json({ status: 400, message: err.toString() });
      }
    }
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ status: 404, message: 'Route not found' });
  },
};
