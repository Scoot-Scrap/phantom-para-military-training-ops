/**
 * Simple threshold‑based rep counter.
 * values: array of angle/velocity magnitudes over time
 */
export function countReps(values: number[], threshold = 0.6) {
  let count = 0, above = false;
  for (const v of values) {
    if (v > threshold && !above) {
      count++;
      above = true;
    } else if (v < threshold) {
      above = false;
    }
  }
  return count;
}