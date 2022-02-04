import createHandler from '@minos/lib/api/create-handler';
import { validateBodySchema } from '@minos/lib/api/middleware/validate-schema';
import { CpuSchema, FromSchema } from '@minos/lib/api/schemas';
import prisma from '@minos/lib/prisma';

const handler = createHandler();

const CpuPutBodySchema = CpuSchema;

handler.use(validateBodySchema(CpuPutBodySchema)).put(async (req, res) => {
  const id = req.query.id as string;
  const data = req.body as FromSchema<typeof CpuPutBodySchema>;

  const cpu = await prisma.cpu.update({ where: { id }, data });

  res.status(200).json({ data: cpu });
});

const CpuPatchBodySchema = CpuSchema.partial();

// NOTE: Patch is currently not working correctly!
handler.use(validateBodySchema(CpuPatchBodySchema)).patch(async (req, res) => {
  const id = req.query.id as string;

  const data = req.body as FromSchema<typeof CpuPatchBodySchema>;

  const cpu = await prisma.cpu.update({ where: { id }, data });

  res.status(200).json({ data: cpu });
});

export default handler;
