import createHandler from '@minos/lib/api/create-handler';

// creates an api handler
const handler = createHandler();

handler.get((req, res) => {
  res.status(200).json({ message: '[id]' });
});

export default handler;
