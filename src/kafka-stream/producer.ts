import { Message } from "kafkajs";
import { kafka } from ".";
import { TOPICS } from "../constants";

const producer = kafka.producer()

export default async (topic: TOPICS, messages: Array<Message>) => {
    await producer.connect()

    await producer.send({
        topic,
        messages
    })
}
