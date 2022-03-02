import { atom, useAtom } from 'jotai';

// Creates atoms (state management)
export const currentCPUSearchPage = atom<number>(0);

export function useCurrentCPUSearchPage() {
  return useAtom(currentCPUSearchPage);
}
