import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { KafkaConsumer } from "./kafka-consumer";
import { KafkaMessage } from "./types";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://kafka-table.web.app",
      "https://kafka-table.firebaseapp.com/",
    ],
    methods: ["GET", "POST"],
  },
});

const kafkaConsumer = new KafkaConsumer();

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

async function startServer() {
  try {
    await kafkaConsumer.connect();
    await kafkaConsumer.consume((message: KafkaMessage) => {
      io.emit("kafka-message", message);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
