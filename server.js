// File: server.js

import { createServer } from 'https';                            // HTTPS for secure WebSocket transport :contentReference[oaicite:0]{index=0}
import { parse } from 'url';                                     // URL parsing for Next.js handler :contentReference[oaicite:1]{index=1}
import next from 'next';                                         // Next.js custom server support :contentReference[oaicite:2]{index=2}
import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';                              // Socket.IO for WebSocket communication :contentReference[oaicite:3]{index=3}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Load TLS certificates for HTTPS (replace with your cert paths)
const httpsOptions = {
  key : fs.readFileSync(path.join(__dirname, 'certs', 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'server.crt')),
};

app.prepare().then(() => {
  const httpsServer = createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Attach Socket.IO to the same HTTPS server
  const io = new Server(httpsServer, {
    path: '/api/socket.io',                                    // Matches client config :contentReference[oaicite:4]{index=4}
    transports: ['websocket'],
  });

  io.on('connection', socket => {
    console.log('Client connected:', socket.id);
    // Push a new biometric update every 5s
    const interval = setInterval(() => {
      socket.emit('vital-update', {
        heartRate: Math.floor(60 + Math.random() * 40),         // Random heart rate for demo
        bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 10)}`,
        temperature: (36 + Math.random()).toFixed(1),
        timestamp: new Date().toISOString(),
      });
    }, 5000);

    socket.on('disconnect', () => {
      clearInterval(interval);
      console.log('Client disconnected:', socket.id);
    });
  });

  const port = process.env.PORT || 3000;
  httpsServer.listen(port, () => {
    console.log(`> HTTPS server ready on https://localhost:${port}`);  // Secure WebSockets require HTTPS :contentReference[oaicite:5]{index=5}
  });
});