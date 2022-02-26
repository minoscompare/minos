import Typesense, { Client } from 'typesense';

const typesenseOptions = {
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
      port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT!),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY!,
};

let typesense: Client;

if (process.env.NODE_ENV === 'production') {
  typesense = new Typesense.Client(typesenseOptions);
} else {
  let g = global as any;
  if (!g.prisma) {
    g.typesense = new Typesense.Client(typesenseOptions);
  }
  typesense = g.typesense;
}

export default typesense;
