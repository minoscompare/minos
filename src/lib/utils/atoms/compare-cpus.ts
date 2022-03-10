import { MinosCpu } from '@minos/lib/types';
import { atom, useAtom } from 'jotai';

// Creates atoms (state management)
export const comparedCPUs = atom<MinosCpu[]>([]);
export const comparedCPUIds = atom<number[]>([]);

export function useCompareCpus() {
  const [ids, setIds] = useAtom(comparedCPUIds);

  function addId(cpuId: number) {
    if (ids.includes(cpuId)) return;
    setIds([...ids, cpuId]);
  }

  function removeId(cpuId: number) {
    setIds(ids.filter((id) => id !== cpuId));
  }

  return { ids, addId, removeId };
}
