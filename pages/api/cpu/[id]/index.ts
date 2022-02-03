import createHandler from '@minos/lib/api/create-handler';

// Creates an API handler
const handler = createHandler();

handler.get((req, res) => {
  res.status(200).json({ message: 'OK' });
});

export default handler;
