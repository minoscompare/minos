import { isMatch } from 'lodash';
import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

export const typesense = new Typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
      port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT!),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY!,
});

export async function fetchTypesenseCollection<T>(
  collectionName: string
): Promise<T[]> {
  // JSONL (aka JSON Lines) is a json format where JSON values are
  // separated by line breaks
  // See https://jsonlines.org/examples/
  const jsonl = await typesense
    .collections(collectionName)
    .documents()
    .export();

  const data = jsonl.split('\n').map((json) => JSON.parse(json) as T);

  return data;
}

export async function deleteTypesenseDocuments(
  collectionName: string,
  ids: string[]
) {
  for (const id of ids) {
    await typesense.collections(collectionName).documents(id).delete();
  }
}

export async function deleteCollectionIfChanged(
  schema: CollectionCreateSchema
) {
  // If current collection schema differs from desired collection schema
  // delete the collection
  const { fields: currentFields } = await typesense
    .collections(schema.name)
    .retrieve();

  let shouldUpdate = false;
  for (const field of currentFields) {
    const matchingField = schema.fields.find((f) => f.name === field.name);
    if (!matchingField || !isMatch(field, matchingField)) {
      shouldUpdate = true;
      break;
    }
  }

  if (shouldUpdate) {
    console.log('Found changed collection schema');
    console.log(`Deleting '${schema.name}' collection`);
    await typesense.collections(schema.name).delete();
  }
}
