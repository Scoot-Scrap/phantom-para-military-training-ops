// File: server.js

import fs from "fs";
import path from "path";
import express from "express";
import next from "next";
import compression from "compression";
import http2 from "http2";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Load TLS certs (use real CA-signed certs in prod)
const tlsOptions = {
  key: fs.readFileSync(path.join(__dirname, "certs/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "certs/server.crt")),
  allowHTTP1: true, // fallback for HTTP/1.1 clients
};

app.prepare().then(() => {
  const server = express();

  // Enable Brotli & Gzip compression (see next section)
  server.use(
    compression({
      level: 9,
      threshold: 0,
    }),
  );

  // Advertise HTTP/3 (QUIC) support to browsers
  server.use((req, res, next) => {
    res.setHeader("Alt-Svc", 'h3=":443"; ma=86400'); // instructs clients to use HTTP/3
    next();
  });

  // Delegate everything else to Next.js
  server.all("*", (req, res) => handle(req, res));

  // Create an HTTP/2 (and HTTP/3-capable) secure server
  http2.createSecureServer(tlsOptions, server).listen(3000, () => {
    console.log(
      "> Server listening on https://localhost:3000 (HTTP/3 & HTTP/2)",
    );
  });
});
