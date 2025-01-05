import { kafka } from "."


export default async () => {

    const consumer = kafka.consumer({ groupId: 'log-grp' })
    consumer.connect()

    await consumer.subscribe({ topics: ['send-log'], fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition = 1, message, heartbeat, pause }) => {
            console.log("Message Arrived : ", {
                topic,
                key: message.key?.toString(),
                value: message.value?.toString(),
                headers: message.headers,
                partition
            })
            await heartbeat()
        },
    })
}