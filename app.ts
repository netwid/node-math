import express from 'express';
const app: express.Application = express();

export const PORT = 8000;

app.use(express.json());

app.post('/sum', function(req: express.Request, res: express.Response) {
    const answer: Number = req.body.reduce((a: Number, b: Number) => +a + +b, 0);
    res.send(JSON.stringify({'result': answer}));
})


app.listen(PORT, () => {
    console.log("Server successfully started on port %s", PORT);
})