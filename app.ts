import express from 'express';
const app: express.Application = express();

export const PORT = 8000;

app.use(express.json());


app.post('/sum', function(req: express.Request, res: express.Response) {
    const answer: Number = req.body.reduce((a: number, b: number) => a + b, 0);
    res.send(JSON.stringify({'result': answer}));
})

app.post('/product', function(req: express.Request, res: express.Response) {
    const answer: Number = req.body.reduce((a: number, b: number) => a * b, 1);
    res.send(JSON.stringify({'result': answer}));
})

app.post('/power', function(req: express.Request, res: express.Response) {
    const answer: Number = Math.pow(req.body[0], req.body[1]);
    res.send(JSON.stringify({'result': answer}));
})


app.listen(PORT, () => {
    console.log("Server successfully started on port %s", PORT);
})
