// pages/api/socketio.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    io.on("connection", (socket) => {
      console.log("⚡ Socket connected:", socket.id);

      socket.on("share-detections", (data) => {
        // Broadcast to all others in same room
        socket.broadcast.emit("peer-detections", data);
      });

      socket.on("disconnect", () => {
        console.log("🛑 Socket disconnected:", socket.id);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
}
