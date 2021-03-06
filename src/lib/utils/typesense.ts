import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { SearchClient } from 'instantsearch.js';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_CLIENT_API_KEY!,
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
        port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT!, 10),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL! as
          | 'https'
          | 'http',
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    query_by: 'fullName',
  },
});

export const searchClient =
  typesenseInstantsearchAdapter.searchClient as SearchClient;
