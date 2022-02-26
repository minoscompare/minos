import { MinosCpu } from '@minos/lib/types';
import { atom, useAtom } from 'jotai';

// Creates atoms (state management)
export const comparedCPUs = atom<MinosCpu[]>([]);
export const comparedCPUIds = atom<number[]>([]);

export function useCompareCpus() {
  return useAtom(comparedCPUIds);
}
