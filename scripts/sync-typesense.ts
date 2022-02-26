import { Cpu } from '@prisma/client';
import 'dotenv/config';
import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import got from 'got-cjs';

const typesense = new Typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
      port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT!),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY!,
});

const cpuSchema: CollectionCreateSchema = {
  name: 'cpu',
  fields: [
    { name: 'id', type: 'string', facet: false },
    { name: 'brand', type: 'string', facet: true },
    { name: 'fullName', type: 'string', facet: false },
    { name: 'family', type: 'string', facet: true },
    { name: 'launch_quarter', type: 'string', facet: true, optional: true },
    { name: 'launch_year', type: 'int32', facet: true, optional: true },
    { name: 'cores', type: 'int32', facet: true },
    { name: 'threads', type: 'int32', facet: true },
    { name: 'frequency', type: 'float', facet: true },
    { name: 'cache_l1', type: 'int32', facet: false, optional: true },
    { name: 'cache_l2', type: 'int32', facet: false, optional: true },
    { name: 'cache_l3', type: 'int32', facet: false, optional: true },
    { name: 'tdp', type: 'int32', facet: false, optional: true },
    { name: 'lithography', type: 'int32', facet: false, optional: true },
  ],
};

async function main() {
  const data: Cpu[] = await got
    .get(
      'https://raw.githubusercontent.com/minoscompare/component-data/main/generated/cpus.json'
    )
    .json();
  const cpus = data.map((cpu) => ({
    ...cpu,
    id: cpu.id.toString(),
    fullName: `${cpu.brand} ${cpu.name}`,
    frequency: cpu.frequency * 10e-2,
  }));

  if (await typesense.collections('cpu').exists()) {
    console.log('Found existing cpu schema');
    console.log('Deleting cpu schema');
    await typesense.collections('cpu').delete();
  }

  console.log('Creating cpu schema');
  await typesense.collections().create(cpuSchema);

  console.log('Adding records');
  try {
    await typesense.collections('cpu').documents().import(cpus);
  } catch (err) {
    const results = (err as any).importResults as { success: true }[];
    console.error(
      results.map((s, i) => ({ i, ...s })).filter((s) => !s.success)
    );
  }

  console.log('Checking client API Key');
  const clientKey = process.env.NEXT_PUBLIC_TYPESENSE_CLIENT_API_KEY;

  if (!clientKey) {
    throw new Error(
      'Unable to create typesense client key: environment variable NEXT_PUBLIC_TYPESENSE_CLIENT_API_KEY not set.'
    );
  }

  const { keys } = await typesense.keys().retrieve();

  // If no keys match clientKey
  if (
    !keys.some(
      (key: any) => key.value_prefix && clientKey.startsWith(key.value_prefix)
    )
  ) {
    // Add client key
    console.log('Client key not detected');
    console.log('Adding client key');
    typesense.keys().create({
      description: 'Search-only companies key.',
      actions: ['documents:search'],
      collections: ['*'],
      value: clientKey,
    });
  }
}

main().catch((err) => console.error(err));
