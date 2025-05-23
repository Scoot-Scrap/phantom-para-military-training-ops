// utils/biometricUtils.ts

export interface NormalizedVitals {
  [key: string]: number
}

/**
 * Compute summary metrics from normalized vitals.
 */
export function computeMetrics(norm: NormalizedVitals): Record<string, number> {
  const keys = Object.keys(norm)
  const values = keys.map(k => norm[k])
  const count = values.length

  if (count === 0) return {}

  const sum = values.reduce((a, b) => a + b, 0)
  const mean = sum / count

  // basic stats
  const variance =
    values.reduce((a, v) => a + (v - mean) ** 2, 0) / count
  const stdDev = Math.sqrt(variance)
  const maxDev = Math.max(...values.map(v => Math.abs(v - mean)))

  const metrics: Record<string, number> = {
    averageNormalized: mean,
    stdDevNormalized:  stdDev,
    maxDeviation:      maxDev,
  }

  // example domain-specific metric: recoveryIndex
  if (norm.heartRate != null) {
    metrics.recoveryIndex = 1 - norm.heartRate
  }

  return metrics
}