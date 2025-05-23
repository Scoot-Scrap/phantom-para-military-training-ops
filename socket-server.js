// socket-server.js
import { createServer } from "http";
import { Server } from "socket.io";
import { smoothMetrics } from "./lib/metricsFilter";
import { detectAnomaly } from "./lib/anomalyDetector";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
  pingInterval: 10000,
  pingTimeout: 5000,
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("raw-metrics", async (data) => {
    // 1. Smooth incoming noisy data
    const filtered = smoothMetrics(data);

    // 2. Run anomaly detection
    const isAnomaly = await detectAnomaly(filtered);

    // 3. Emit back both filtered and anomaly flag
    socket.emit("metrics-update", { filtered, anomaly: isAnomaly });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.SOCKET_IO_PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🔊 Socket.io server listening on port ${PORT}`);
});
