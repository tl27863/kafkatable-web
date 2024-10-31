import { Kafka, Consumer } from "kafkajs";
import { KafkaMessage } from "./types";
import { kafkaConfig } from "./config";

export class KafkaConsumer {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka(kafkaConfig);
    this.consumer = this.kafka.consumer({ groupId: "realtime-table2" });
  }

  async connect(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: "log", fromBeginning: true });
  }

  async consume(callback: (message: KafkaMessage) => void): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ message }: any) => {
        const messageValue = JSON.parse(message.value.toString());
        const kafkaMessage: KafkaMessage = {
          id: message.key?.toString() || "",
          timestamp: new Date(Number(message.timestamp)).toISOString(),
          data: messageValue,
        };
        callback(kafkaMessage);
      },
    });
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }
}
