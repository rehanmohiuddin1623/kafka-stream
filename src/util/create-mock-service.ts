import express from "express"


export const createService = ({ name, port, endpoint, response }: { name: string, port: number, endpoint: string, response: Record<string, any> }) => {
    const app = express();

    // Middleware to log requests
    app.use((req, res, next) => {
        console.log(`[${name}] Request received: ${req.method} ${req.url}`);
        next();
    });

    // Define endpoint and response
    app.get(endpoint, (req, res) => {
        res.json(response);
    });

    // Start the server
    app.listen(port, () => {
        console.log(`${name} is running on http://localhost:${port}`);
    });

    return app
};