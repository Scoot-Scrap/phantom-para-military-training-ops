
// File: lib/heavyModule.js

/**
 * Simulate a CPU-intensive operation.
 */
export async function process() {
  // Example: compute a large sum
  let sum = 0;
  for (let i = 0; i < 1e6; i++) {
    sum += i;
  }
  return { sum };
}