import 'dotenv/config';
import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typesense = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST!,
      port: Number(process.env.TYPESENSE_PORT!),
      protocol: process.env.TYPESENSE_PROTOCOL!,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY!,
});

const cpuSchema: CollectionCreateSchema = {
  name: 'cpu',
  fields: [
    { name: 'id', type: 'string', facet: false },
    { name: 'brand', type: 'string', facet: true },
    { name: 'name', type: 'string', facet: false },
    { name: 'family', type: 'string', facet: true },
    { name: 'launchQuarter', type: 'string', facet: true, optional: true },
    { name: 'launchYear', type: 'int32', facet: true, optional: true },
    { name: 'cores', type: 'int32', facet: true },
    { name: 'threads', type: 'int32', facet: true },
    { name: 'frequency', type: 'float', facet: false },
    { name: 'cache', type: 'int32', facet: false, optional: true },
    { name: 'tdp', type: 'int32', facet: false, optional: true },
    { name: 'lithography', type: 'int32', facet: false, optional: true },
  ],
};

async function main() {
  const cpus = await prisma.cpu.findMany({
    select: {
      id: true,
      brand: true,
      name: true,
      family: true,
      launchQuarter: true,
      launchYear: true,
      cores: true,
      threads: true,
      frequency: true,
      cache: true,
      tdp: true,
      lithography: true,
    },
  });

  let reindexNeeded = false;

  try {
    const collection = await typesense.collections('cpu').retrieve();
    console.log('Found existing cpu schema');

    if (
      collection.num_documents !== cpus.length ||
      process.env.FORCE_REINDEX === 'true'
    ) {
      console.log('Deleting existing schema');
      reindexNeeded = true;
      await typesense.collections('cpu').delete();
    }
  } catch (err) {
    reindexNeeded = true;
  }

  if (!reindexNeeded) {
    return true;
  }

  console.log('Creating cpu schema');
  await typesense.collections().create(cpuSchema);

  console.log('Adding records');
  try {
    const returnData = await typesense
      .collections('cpu')
      .documents()
      .import(cpus);
    return returnData;
  } catch (e) {
    const results = (e as any).importResults as { success: true }[];
    console.error(
      results.map((s, i) => ({ i, ...s })).filter((s) => !s.success)
    );
  }
}

main().catch((err) => console.error(err));
