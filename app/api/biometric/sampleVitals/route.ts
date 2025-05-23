// app/api/biometric/sampleVitals/route.ts

import { NextResponse } from 'next/server'

// Utility to generate a random value within ±variance of a base
function randomAround(base: number, variance: number): number {
  return Math.round(base + (Math.random() * 2 - 1) * variance)
}

// Simulate a “live” vitals payload
function generateSampleVitals() {
  const now = new Date().toISOString()
  return {
    timestamp: now,
    heartRate: randomAround(75, 5),              // bpm
    bloodPressure: {
      systolic: randomAround(120, 8),            // mmHg
      diastolic: randomAround(80, 5),            // mmHg
    },
    oxygenSaturation: randomAround(98, 1),       // %
    respiratoryRate: randomAround(16, 2),        // breaths/min
    skinTemperature: (36 + Math.random()).toFixed(1), // °C
  }
}

// GET handler: returns simulated vitals with random delay
export async function GET() {
  await new Promise((res) => setTimeout(res, 300 + Math.random() * 300))
  const vitals = generateSampleVitals()
  return NextResponse.json(vitals)
}

// POST handler: accepts incoming vitals, returns merged object
export async function POST(request: Request) {
  const incoming = await request.json()

  // Build updated vitals object
  const updated = {
    timestamp: new Date().toISOString(),
    heartRate: incoming.heartRate,
    bloodPressure: incoming.bloodPressure,
    oxygenSaturation: incoming.oxygenSaturation,
    respiratoryRate: incoming.respiratoryRate,
    skinTemperature: incoming.skinTemperature,
  }

  // Simulate network/write delay
  await new Promise((res) => setTimeout(res, 200))

  return NextResponse.json(updated)
}