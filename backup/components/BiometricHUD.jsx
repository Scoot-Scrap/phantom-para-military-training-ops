// context/BiometricContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react'
import { fetchSampleVitals } from '../pages/api/biometric/sampleVitals'

/**
 * Shape of the raw data returned by the API.
 */
interface BiometricData {
  timestamps: number[]        // Unix‐epoch timestamps
  heartRate: number[]         // Heart‐rate readings aligned with timestamps
  // …add other arrays for additional vitals here (e.g., bloodPressure, spo2, etc.)
}

/**
 * Represents a single normalized reading for charting.
 */
interface NormalizedReading {
  time: string    // human-readable time (e.g. “10:05:32 AM”)
  value: number   // the vital’s numeric value at that time
}

/**
 * What the context will expose to consumers.
 */
interface BiometricsContextType {
  normalized: NormalizedReading[]
  // metrics?: { /*…computed metrics, if you add them in step 4*/ }
}

const BiometricsContext = createContext<BiometricsContextType | undefined>(undefined)

export const BiometricProvider = ({ children }: { children: ReactNode }) => {
  // 1. Local state for the raw vitals payload
  const [vitals, setVitals] = useState<BiometricData>({
    timestamps: [],
    heartRate: [],
  })

  // 2. Fetch sample data once, when the provider mounts
  useEffect(() => {
    fetchSampleVitals().then((data) => {
      setVitals(data)
      // ← if you compute metrics here, do setMetrics(...)
    })
  }, [])

  // 3. Transform raw arrays into an array of { time, value } objects
  const normalized = useMemo<NormalizedReading[]>(() => {
    const { timestamps, heartRate } = vitals
    return timestamps.map((t, i) => ({
      time: new Date(t).toLocaleTimeString(),
      value: heartRate[i],
    }))
  }, [vitals])

  // 4. Provide the transformed data (and any metrics) via context
  return (
    <BiometricsContext.Provider value={{ normalized }}>
      {children}
    </BiometricsContext.Provider>
  )
}

/**
 * Custom hook to consume the biometric context.
 * Throws if used outside the BiometricProvider.
 */
export function useBiometrics(): BiometricsContextType {
  const context = useContext(BiometricsContext)
  if (!context) {
    throw new Error('useBiometrics must be used within a BiometricProvider')
  }
  return context
}