// File: pages/api/metrics.js

import client from "prom-client";           // Shared registry :contentReference[oaicite:13]{index=13}
import { httpRequestCounter } from "../../lib/metrics";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.setHeader("Content-Type", client.register.contentType);
    // Expose all collected metrics for Prometheus scraping
    return res.status(200).send(await client.register.metrics());
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).end("Method Not Allowed");
}