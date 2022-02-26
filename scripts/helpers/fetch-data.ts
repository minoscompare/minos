import { Cpu } from '@prisma/client';
import got from 'got-cjs';
import { differenceBy, differenceWith, isEqual } from 'lodash';

type FetchedCpu = Omit<Cpu, 'createdAt' | 'updatedAt'>;

export async function fetchCpus() {
  const incomingCpus = await got
    .get(
      'https://raw.githubusercontent.com/minoscompare/component-data/main/generated/cpus.json'
    )
    .json<FetchedCpu[]>();
  return incomingCpus;
}

export function diffData<T extends { id: unknown }>(
  current: T[],
  incoming: T[]
) {
  // Find all cpus that changed, including all new cpus
  const dataToUpsert = differenceWith(incoming, current, isEqual);

  // Get all removed cpus
  const dataToRemove = differenceBy(current, incoming, 'id');

  return { dataToUpsert, dataToRemove };
}
