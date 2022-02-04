import createHandler from '@minos/lib/api/create-handler';
import { validateBodySchema } from '@minos/lib/api/middleware/validate-schema';
import { AppApiRequest, AppApiResponse } from '@minos/lib/api/types';
import prisma from '@minos/lib/prisma';
import { z } from 'zod';

// creates an api handler
const handler = createHandler();

handler.get(async (req, res) => {
  const cpus = await prisma.cpu.findMany();

  res.status(200).json({ data: cpus });
});

handler
  .use(validateBodySchema(z.object({ message: z.string() })))
  .post((req, res) => {
    res.status(200).json({ message: 'Not implemented' });
  });

export default handler;
