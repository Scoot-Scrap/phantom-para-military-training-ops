// File: server/metrics.js

import client from 'prom-client';                                 // Prometheus client for Node.js :contentReference[oaicite:12]{index=12}

// Collect default metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics();

// Counter for processed biometric records
export const vitalsCounter = new client.Counter({
  name: 'biometric_vitals_processed_total',
  help: 'Total number of biometric vitals processed',
});

// Middleware to increment counter on each API hit
export function metricsMiddleware(req, res, next) {
  if (req.path.startsWith('/api/biometric')) {
    vitalsCounter.inc();
  }
  next();
}