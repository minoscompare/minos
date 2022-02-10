import { createRouter } from '../trpc/create-router';
import transformer from '../trpc/transformer';
import { cpuRouter } from './cpu';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  // // Middleware used to debug data prefetching
  // .middleware(async ({ ctx, next }) => {
  //   await sleep(5000);
  //   return next();
  // })
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
