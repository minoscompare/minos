import { createRouter } from '@minos/server/trpc/create-router';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import {
  getCpuById,
  getManyCpus,
  createCpu,
  deleteCpuById,
  updateCpuById,
} from '../data-access/cpu';
import { CpuSchema } from '../schemas/cpu';
import { InfinitePaginationSchema } from '../schemas/query';

export const cpuRouter = createRouter()
  // create
  .mutation('add', {
    input: CpuSchema,
    async resolve({ ctx, input }) {
      const cpu = await createCpu(ctx.prisma, input);
      return cpu;
    },
  })
  // read
  .query('infinite', {
    input: InfinitePaginationSchema,
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const cpus = await getManyCpus(ctx.prisma, {
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'asc',
        },
      });
      let nextCursor: typeof cursor | null = null;
      if (cpus.length > limit) {
        const nextCpu = cpus.pop();
        nextCursor = nextCpu!.id;
      }

      return {
        cpus,
        nextCursor,
      };
    },
  })
  .query('byId', {
    input: z.object({
      id: z.number().int(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const cpu = await getCpuById(ctx.prisma, id);
      if (!cpu) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No cpu with id '${id}'`,
        });
      }
      return cpu;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.number().int(),
      data: CpuSchema.partial(),
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input;
      const cpu = await updateCpuById(ctx.prisma, id, data);
      return cpu;
    },
  })
  // delete
  .mutation('delete', {
    input: z.number().int(),
    async resolve({ input: id, ctx }) {
      await deleteCpuById(ctx.prisma, id);
      return id;
    },
  });
