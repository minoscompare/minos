import createHandler from '@minos/lib/api/create-handler';
import { validateBodySchema } from '@minos/lib/api/middleware/validate-schema';
import { GpuSchema, FromSchema } from '@minos/lib/api/schemas';
import prisma from '@minos/lib/prisma';

const handler = createHandler();

const GpuPutBodySchema = GpuSchema;

handler.put(validateBodySchema(GpuPutBodySchema), async (req, res) => {
  const id = req.query.id as string;
  const data = req.body as FromSchema<typeof GpuPutBodySchema>;

  const gpu = await prisma.gpu.update({ where: { id }, data });

  res.status(200).json({ data: gpu });
});

const GpuPatchBodySchema = GpuSchema.partial();

handler.patch(validateBodySchema(GpuPatchBodySchema), async (req, res) => {
  const id = req.query.id as string;
  const data = req.body as FromSchema<typeof GpuPatchBodySchema>;

  const gpu = await prisma.gpu.update({ where: { id }, data });

  res.status(200).json({ data: gpu });
});

export default handler;
