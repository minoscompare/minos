import { NextApiRequest, NextApiResponse } from 'next';

export type AppApiRequest = NextApiRequest;
export type AppApiResponse<T = any> = NextApiResponse<T>;
