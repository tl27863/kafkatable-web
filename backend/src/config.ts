import { KafkaConfig } from "kafkajs";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });
const kafkaConfig: KafkaConfig = {
  clientId: process.env.CLIENT || "",
  brokers: [process.env.HOST || ""],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.CF_USERNAME || "",
    password: process.env.PASS || "",
  },
};

export { kafkaConfig };
