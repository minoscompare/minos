import createHandler from '@minos/lib/api/create-handler';
import { validateBodySchema } from '@minos/lib/api/middleware/validate-schema';
import { CpuSchema } from '@minos/lib/api/schemas';
import prisma from '@minos/lib/prisma';

const handler = createHandler();

handler.get(async (req, res) => {
  const cpus = await prisma.cpu.findMany();

  res.status(200).json({ data: cpus });
});

handler
  .use(validateBodySchema(CpuSchema.omit({ id: true })))
  .post(async (req, res) => {
    const cpu = await prisma.cpu.create({ data: req.body });

    res.status(200).json({ data: cpu });
  });

export default handler;
