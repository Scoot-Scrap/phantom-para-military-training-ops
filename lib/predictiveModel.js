// File: lib/predictiveModel.js

/**
 * Stub predictive model: in production, replace with real ML inference
 * (e.g., TensorFlow.js or a remote prediction API).
 */
export async function getTopNextPages(currentPage, count) {
  // Example hardcoded probabilities; in reality you'd infer these.
  return [
    { page: "/dashboard", probability: 0.8 },
    { page: "/settings", probability: 0.6 },
    { page: "/profile", probability: 0.55 },
  ].slice(0, count);
}
