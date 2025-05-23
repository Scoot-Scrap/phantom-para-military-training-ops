// File: instrumentation-client.js

import * as Sentry from "@sentry/nextjs";        // Next.js SDK setup :contentReference[oaicite:6]{index=6}
import { datadogRum } from "@datadog/browser-rum"; // RUM SDK for frontend monitoring :contentReference[oaicite:7]{index=7}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,             // Capture 100% of transactions (tune in prod)
  replaysSessionSampleRate: 0.1,     // 10% session replay
  replaysOnErrorSampleRate: 1.0,     // 100% replay on error
});

datadogRum.init({
  applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID,
  clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
  site: "datadoghq.com",
  service: "nextjs-app",
  env: process.env.NODE_ENV,
  sampleRate: 100,                   // Capture all sessions
  trackInteractions: true,           // Track clicks, scrolls, etc.
});