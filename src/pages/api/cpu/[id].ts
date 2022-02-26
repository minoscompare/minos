import createHandler from '@minos/lib/api/utils/create-handler';
import { getCpuById } from '@minos/lib/api/data-access/cpu';
import prisma from '@minos/lib/api/utils/prisma';
import createHttpError from 'http-errors';

const handler = createHandler();

handler.get(async (req, res) => {
  const id = parseInt(req.query.id as string, 10);

  const cpu = await getCpuById(prisma, id);

  if (!cpu) throw new createHttpError.NotFound();

  res.status(200).json({ data: cpu });
});

export default handler;
