// File: instrumentation.js

/**
 * Dynamically load the appropriate Sentry config
 * based on the Next.js runtime environment.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config.js");
  } else {
    await import("./instrumentation-client.js");
  }
}