// File: lib/metrics.js

import client from "prom-client";  // Prometheus client for Node.js :contentReference[oaicite:11]{index=11}

// Collect default system metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

// Custom counter for HTTP requests
export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests received",
  labelNames: ["method", "route", "status"],
});