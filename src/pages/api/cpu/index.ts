import createHandler from '@minos/lib/api/utils/create-handler';
import { getManyCpus } from '@minos/lib/api/data-access/cpu';
import { validateQuerySchema } from '@minos/lib/api/middlewares/validate-schema';
import { FromSchema } from '@minos/lib/api/schemas';
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

export default handler;
