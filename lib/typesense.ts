import Typesense, { Client } from 'typesense';

const options = {
  nodes: [
    {
      host: process.env.TYPESENSE_HOST!,
      port: Number(process.env.TYPESENSE_PORT!),
      protocol: process.env.TYPESENSE_PROTOCOL!,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY!,
};

let typesense: Client;

if (process.env.NODE_ENV === 'production') {
  typesense = new Typesense.Client(options);
} else {
  let g = global as any;
  if (!g.prisma) {
    g.typesense = new Typesense.Client(options);
  }
  typesense = g.typesense;
}

export default typesense;
