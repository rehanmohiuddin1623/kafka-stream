// Function to create and start a mock service

import express, { Application, Request, Response, Router } from 'express';
import { createService } from "../util/create-mock-service";
import produce from "../kafka-stream/producer"
import { TOPICS } from '../constants';


const APIStatus = {
    success: false,
    error: false
}

const app: Application = createService({ name: "Service A", port: 3001, endpoint: "/api/data", response: { message: 'Response from Service A' } })

const apiRouter: Router = Router();


apiRouter.post("/message", async (req: Request, res: Response) => {
    try {
        await produce(TOPICS.SEND_LOG, [{ key: "payment-recv", value: JSON.stringify({ amt: 100, name: "John Doe", timestamp: Date.now(), fromPort: req.socket.localPort }) }])
        APIStatus.success = true
        res.send({ message: "Success!!", ...APIStatus })
    }
    catch (e) {
        APIStatus.error = true
        res.status(500).send({ ...APIStatus })
    }
})

app.use("/api", apiRouter)

