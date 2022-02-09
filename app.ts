import express from 'express';
const app: express.Application = express();

export const PORT = 8000;

app.use(express.json());

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof SyntaxError) {
        res.json({ 'status': 'failure', 'message': 'Not a json' });
    }
});


app.post('/sum', function (req: express.Request, res: express.Response) {
    try {
        const answer: number = req.body.reduce((a: number, b: number) => a + b, 0);
        res.json({ 'status': 'success', 'result': answer });
    }
    catch (e) {
        if (e instanceof TypeError) {
            res.json({ 'status': 'failure', 'message': 'Not an array of numbers' });
        }
        else {
            res.json({ 'status': 'failure', 'message': 'Unknown exception' });
        }
    }
})

app.post('/product', function (req: express.Request, res: express.Response) {
    try {
        const answer: number = req.body.reduce((a: number, b: number) => a * b, 1);
        res.json({ 'result': answer });
    }
    catch (e) {
        if (e instanceof TypeError) {
            res.json({ 'status': 'failure', 'message': 'Not an array of numbers' });
        }
        else {
            res.json({ 'status': 'failure', 'message': 'Unknown exception' });
        }
    }
})

class LengthError extends Error { }

app.post('/power', function (req: express.Request, res: express.Response) {
    try {
        if (req.body.length != 2) {
            throw new LengthError();
        }
        const answer: number = Math.pow(req.body[0], req.body[1]);
        res.json({ 'result': answer });
    }
    catch (e) {
        if (e instanceof TypeError) {
            res.json({ 'status': 'failure', 'message': 'Not an array of numbers' });
        }
        else if (e instanceof LengthError) {
            res.json({ 'status': 'failure', 'message': 'Not an array with only 2 elements' });
        }
        else {
            res.json({ 'status': 'failure', 'message': 'Unknown exception' });
        }
    }
})


app.listen(PORT, () => {
    console.log("Server successfully started on port %s", PORT);
})
