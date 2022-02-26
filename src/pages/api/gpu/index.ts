import createHandler from '@minos/lib/api/utils/create-handler';
import { validateBodySchema } from '@minos/lib/api/middlewares/validate-schema';
import { GpuSchema, FromSchema } from '@minos/lib/api/schemas';
import prisma from '@minos/lib/api/utils/prisma';

const handler = createHandler();

handler.get(async (req, res) => {
  const gpus = await prisma.gpu.findMany();

  res.status(200).json({ data: gpus });
});

const GpuPostBodySchema = GpuSchema;

handler.post(validateBodySchema(GpuPostBodySchema), async (req, res) => {
  const data = req.body as FromSchema<typeof GpuPostBodySchema>;

  const gpu = await prisma.gpu.create({ data });

  res.status(200).json({ data: gpu });
});

export default handler;
