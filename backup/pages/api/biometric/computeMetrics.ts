// pages/api/biometric/computeMetrics.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import sampleVitals from '../../../app/biometrics/data/sampleVitals.json'
import { normalizeVitals, RawVitals } from '../../../utils/normalizeVitals'
import { computeMetrics } from '../../../utils/biometricUtils'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Accept POST body or fall back to sample data
  const vitals: RawVitals =
    req.method === 'POST' ? req.body : (sampleVitals as RawVitals)

  const normalized = normalizeVitals(vitals)
  const metrics = computeMetrics(normalized)

  res.status(200).json({ normalized, metrics })
}