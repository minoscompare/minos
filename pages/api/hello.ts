import createHandler from '@minos/lib/api/route-factory';

const handler = createHandler();

handler.get((req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default handler;
