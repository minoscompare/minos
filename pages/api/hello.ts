import nc from 'next-connect';
import { AppApiRequest, AppApiResponse } from '@minos/lib/api/types';
import { ncOptions } from '@minos/lib/api/nc-options';

const handler = nc<AppApiRequest, AppApiResponse>(ncOptions);

handler.get((req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default handler;
