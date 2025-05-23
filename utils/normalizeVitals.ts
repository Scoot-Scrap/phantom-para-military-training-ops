// utils/normalizeVitals.ts

export interface RawVitals {
  heartRate?: number
  oxygenSaturation?: number
  respirationRate?: number
  [key: string]: number | undefined
}

interface Range {
  min: number
  max: number
}

// sensible physiological ranges for normalization
const RANGES: Record<string, Range> = {
  heartRate:        { min: 40,  max: 180 },
  oxygenSaturation: { min: 70,  max: 100 },
  respirationRate:  { min: 10,  max: 30  },
}

function clamp01(x: number) {
  return Math.min(Math.max(x, 0), 1)
}

/**
 * Turn raw vitals into 0–1 values based on expected min/max.
 * Any unknown key is passed through unchanged.
 */
export function normalizeVitals(vitals: RawVitals): Record<string, number> {
  const out: Record<string, number> = {}

  for (const key of Object.keys(vitals)) {
    const v = vitals[key]!
    const range = RANGES[key]
    if (range) {
      out[key] = clamp01((v - range.min) / (range.max - range.min))
    } else {
      out[key] = v
    }
  }

  return out
}