import createHandler from '@minos/lib/api/utils/create-handler';
import { createCpu, getManyCpus } from '@minos/lib/api/data-access/cpu';
import {
  validateBodySchema,
  validateQuerySchema,
} from '@minos/lib/api/middlewares/validate-schema';
import { CpuSchema, FromSchema } from '@minos/lib/api/schemas';
import { PaginationSchema } from '@minos/lib/api/schemas/query';
import prisma from '@minos/lib/api/utils/prisma';

const handler = createHandler();

const CpuGetQuerySchema = PaginationSchema;

handler.get(validateQuerySchema(CpuGetQuerySchema), async (req, res) => {
  const query = req.query as FromSchema<typeof CpuGetQuerySchema>;

  const page = Number(query.page);
  const perPage = Number(query.perPage);

  const cpus = await getManyCpus(prisma, {
    skip: (page - 1) * perPage,
    take: perPage,
  });

  res.status(200).json({ data: cpus });
});

const CpuPostBodySchema = CpuSchema;

handler.post(validateBodySchema(CpuPostBodySchema), async (req, res) => {
  const data = req.body as FromSchema<typeof CpuPostBodySchema>;

  const cpu = await createCpu(prisma, data);

  res.status(200).json({ data: cpu });
});

export default handler;
