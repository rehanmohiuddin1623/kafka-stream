import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import consumer from './kafka-stream/consumer';

const app: Application = express();
const PORT: number = 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Example route
app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Server Running!!' });
});

app.get('/', (req: Request, res: Response) => {
    return res.redirect("/api")
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} !!`);
});

async function main() {
    await consumer()
}

main()