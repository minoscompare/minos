import createHandler from '@minos/lib/api/create-handler';
import { validateBodySchema } from '@minos/lib/api/middlewares/validate-schema';
import { CpuSchema, FromSchema } from '@minos/lib/api/schemas';
import prisma from '@minos/lib/prisma';
import createHttpError from 'http-errors';

const handler = createHandler();

handler.get(async (req, res) => {
  const id = req.query.id as string;

  const cpu = await prisma.cpu.findUnique({ where: { id } });

  if (!cpu) throw new createHttpError.NotFound();

  res.status(200).json({ data: cpu });
});

const CpuPutBodySchema = CpuSchema;

handler.put(validateBodySchema(CpuPutBodySchema), async (req, res) => {
  const id = req.query.id as string;
  const data = req.body as FromSchema<typeof CpuPutBodySchema>;

  const cpu = await prisma.cpu.update({ where: { id }, data });

  res.status(200).json({ data: cpu });
});

const CpuPatchBodySchema = CpuSchema.partial();

handler.patch(validateBodySchema(CpuPatchBodySchema), async (req, res) => {
  const id = req.query.id as string;
  const data = req.body as FromSchema<typeof CpuPatchBodySchema>;

  const cpu = await prisma.cpu.update({ where: { id }, data });

  res.status(200).json({ data: cpu });
});

handler.delete(async (req, res) => {
  const id = req.query.id as string;

  await prisma.cpu.delete({ where: { id } });

  res.status(200).json({ data: [] });
});

export default handler;
