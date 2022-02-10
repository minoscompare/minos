import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { createSSGHelpers } from '@trpc/react/ssg';
import prisma from './prisma';
import superjson from 'superjson';
import { cpuRouter } from './routers/cpu';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions,
) => {
  // for API-response caching see https://trpc.io/docs/caching
  return {
    req: opts?.req,
    res: opts?.res,
    prisma,
  };
};

export const transformer = superjson;

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>();
}

export async function createAppSSGHelpers() {
  return createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });
}

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(transformer)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  .merge('cpu.', cpuRouter);

export type AppRouter = typeof appRouter;
