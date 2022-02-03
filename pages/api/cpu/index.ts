import createHandler from '@minos/lib/api/create-handler';
import { AppApiRequest, AppApiResponse } from '@minos/lib/api/types';
import prisma from '@minos/lib/prisma';

// creates an api handler
const handler = createHandler();

handler.get(async (req, res) => {
  const cpus = await prisma.cpu.findMany();

  res.status(200).json({ data: cpus });
});

handler
  .use((req: AppApiRequest, res: AppApiResponse, next) => {
    // Validate body here
    console.log('POST!');
    next();
  })
  .post((req, res) => {
    res.status(200).json({ message: 'Not implemented' });
  });

export default handler;
