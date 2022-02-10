import { createSSGHelpers } from '@trpc/react/ssg';
import { createContext } from './context';
import { appRouter } from '../routers/_app';
import transformer from './transformer';

export async function createAppSSGHelpers() {
  return createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });
}
