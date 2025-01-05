import { Kafka } from "kafkajs"
import { TOPICS } from "../constants"


export const kafka = new Kafka({
    clientId: 'logger',
    brokers: ['192.168.0.71:9092'],
    logLevel: 4
})
const admin = kafka.admin()


export default async () => {
    const { topics } = await admin.fetchTopicMetadata()
    // console.log(topics)
    if (topics.some(topic => topic.name === TOPICS.SEND_LOG)) {
        return
    }
    const topicName = TOPICS.SEND_LOG
    try {
        await admin.connect();
        await admin.createTopics({
            topics: [{
                topic: topicName,
                numPartitions: 3,
                replicationFactor: 1,
            }],
        });
        console.log('Topic created');
    } catch (error) {
        console.error('Error creating topic:', error);
    } finally {
        await admin.disconnect();
    }


}