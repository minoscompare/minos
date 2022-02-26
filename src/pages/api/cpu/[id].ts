import createHandler from '@minos/lib/api/utils/create-handler';
import {
  deleteCpuById,
  getCpuById,
  updateCpuById,
} from '@minos/lib/api/data-access/cpu';
import { validateBodySchema } from '@minos/lib/api/middlewares/validate-schema';
import { CpuSchema, FromSchema } from '@minos/lib/api/schemas';
import prisma from '@minos/lib/api/utils/prisma';
import createHttpError from 'http-errors';

const handler = createHandler();

handler.get(async (req, res) => {
  const id = parseInt(req.query.id as string, 10);

  const cpu = await getCpuById(prisma, id);

  if (!cpu) throw new createHttpError.NotFound();

  res.status(200).json({ data: cpu });
});

const CpuPutBodySchema = CpuSchema;

handler.put(validateBodySchema(CpuPutBodySchema), async (req, res) => {
  const id = parseInt(req.query.id as string, 10);
  const data = req.body as FromSchema<typeof CpuPutBodySchema>;

  const cpu = await updateCpuById(prisma, id, data);

  res.status(200).json({ data: cpu });
});

const CpuPatchBodySchema = CpuSchema.partial();

handler.patch(validateBodySchema(CpuPatchBodySchema), async (req, res) => {
  const id = parseInt(req.query.id as string, 10);
  const data = req.body as FromSchema<typeof CpuPatchBodySchema>;

  const cpu = await updateCpuById(prisma, id, data);

  res.status(200).json({ data: cpu });
});

handler.delete(async (req, res) => {
  const id = parseInt(req.query.id as string, 10);

  await deleteCpuById(prisma, id);

  res.status(200).json({});
});

export default handler;
