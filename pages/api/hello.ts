import createHandler from '@minos/lib/api/create-handler';

const handler = createHandler();

handler.get((req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default handler;
