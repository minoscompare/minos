import createHandler from '@minos/lib/api/create-handler';
import { validateBodySchema } from '@minos/lib/api/middleware/validate-schema';
import { CpuSchema, FromSchema } from '@minos/lib/api/schemas';
import prisma from '@minos/lib/prisma';

const handler = createHandler();

handler.get(async (req, res) => {
  const cpus = await prisma.cpu.findMany();

  res.status(200).json({ data: cpus });
});

const CpuPostBodySchema = CpuSchema;

handler.post(validateBodySchema(CpuPostBodySchema), async (req, res) => {
  const data = req.body as FromSchema<typeof CpuPostBodySchema>;
  const cpu = await prisma.cpu.create({ data });

  res.status(200).json({ data: cpu });
});

export default handler;
