import createHandler from '@minos/lib/api/route-factory';

// Creates an API handler
const handler = createHandler();

handler.get((req, res) => {
        
    // Gets request data
    const query = req.query.componentName;
    const method = req.method;

    // Sends the result
    res.status(200).json({ 
        reqQuery: query,
        reqMethod: method,
        reqMessage: "SUCCESSFULLY RETRIEVED"
    });
});

export default handler;
