import 'dotenv/config';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { CpuTypesenseDoc } from '@minos/lib/types';
import { diffData, fetchCpus } from './helpers/fetch-data';
import {
  deleteTypesenseDocuments,
  fetchTypesenseCollection,
  typesense,
  deleteCollectionIfChanged,
} from './helpers/typesense';
import { isNil, omitBy } from 'lodash';

const cpuSchema: CollectionCreateSchema = {
  name: 'cpu',
  token_separators: ['-'],
  fields: [
    { name: 'id', type: 'string', facet: false },
    { name: 'brand', type: 'string', facet: true },
    { name: 'fullName', type: 'string', facet: false },
    { name: 'family', type: 'string', facet: true },
    { name: 'launchQuarter', type: 'string', facet: true, optional: true },
    { name: 'launchYear', type: 'int32', facet: true, optional: true },
    { name: 'cores', type: 'int32', facet: true },
    { name: 'threads', type: 'int32', facet: true },
    { name: 'frequency', type: 'int32', facet: true },
    { name: 'cacheL1', type: 'int32', facet: false, optional: true },
    { name: 'cacheL2', type: 'int32', facet: false, optional: true },
    { name: 'cacheL3', type: 'int32', facet: false, optional: true },
    { name: 'tdp', type: 'int32', facet: false, optional: true },
    { name: 'lithography', type: 'int32', facet: false, optional: true },
  ],
};

async function main() {
  // Fetch cpu list from GitHub
  const data = await fetchCpus();

  // Map cpu list to typesense document
  const incomingCpus = data
    .map(
      (cpu): CpuTypesenseDoc => ({
        ...cpu,
        id: cpu.id.toString(),
        fullName: `${cpu.brand} ${cpu.name}`,
      })
    )
    // Remove null/undefined values from object (needed for a later equality check)
    .map((cpu) => omitBy(cpu, isNil) as unknown as CpuTypesenseDoc);

  // Check if cpu collection exists
  let cpuCollectionExists = await typesense.collections('cpu').exists();

  // Delete collection if schema has changed
  if (cpuCollectionExists) {
    await deleteCollectionIfChanged(cpuSchema);
  }

  // Re-check if collection exists (as it could have been deleted)
  cpuCollectionExists = await typesense.collections('cpu').exists();

  // Array with all current cpus in typesense
  let currentCpus: CpuTypesenseDoc[] = [];

  // If collection exists, retrieve all documents
  if (cpuCollectionExists) {
    console.log('Found existing cpu schema');
    console.log('Fetching current cpus from typesense');
    currentCpus = await fetchTypesenseCollection('cpu');
  }

  // Determines the data to be upserted or removed
  const { dataToUpsert, dataToRemove } = diffData(currentCpus, incomingCpus);

  if (cpuCollectionExists) {
    // If cpu collection exists, delete cpus that no longer exist on GitHub
    console.log(`Deleting ${dataToRemove.length} cpus`);
    await deleteTypesenseDocuments(
      'cpu',
      dataToRemove.map((cpu) => cpu.id)
    );
  } else {
    // Else, create cpu schema
    console.log('Existing cpu schema not found');
    console.log('Creating new cpu schema');
    await typesense.collections().create(cpuSchema);
  }

  // Insert/Update cpus that are new or have changed on GitHub
  if (dataToUpsert.length !== 0) {
    try {
      console.log(`Adding/Updating ${dataToUpsert.length} cpus`);
      await typesense
        .collections<CpuTypesenseDoc>('cpu')
        .documents()
        .import(dataToUpsert, { action: 'upsert' });
    } catch (err) {
      // Prints error nicely
      const results = (err as any).importResults as { success: true }[];
      if (results) {
        console.error(
          results.map((s, i) => ({ i, ...s })).filter((s) => !s.success)
        );
      } else {
        console.error(err);
      }
    }
  } else {
    console.log('Nothing to add/update');
  }

  // Add client key if it hasn't already been added
  const clientKey = process.env.NEXT_PUBLIC_TYPESENSE_CLIENT_API_KEY;

  if (!clientKey) {
    throw new Error(
      'Unable to create typesense client key: environment variable NEXT_PUBLIC_TYPESENSE_CLIENT_API_KEY not set.'
    );
  }

  try {
    // Attempt to add client key
    console.log('Adding client key');
    await typesense.keys().create({
      description: 'Search-only key.',
      actions: ['documents:search'],
      collections: ['*'],
      value: clientKey,
    });
  } catch (err) {
    // Client key already added
    console.log('Client key already exists');
  }
}

main().catch((err) => console.error(err));
