import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { BiometricProvider, useBiometrics } from '../BiometricContext'

jest.useFakeTimers()

// mock the global fetch before tests run
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          heartRate: 60,
          spo2: 98,
          bp: { systolic: 110, diastolic: 70 },
          temp: 37,
        }),
    })
  ) as jest.Mock
})

afterAll(() => {
  jest.restoreAllMocks()
})

function TestConsumer() {
  const { normalized, metrics } = useBiometrics()
  return (
    <div data-testid="vals">
      {[
        normalized.heartRate.toFixed(2),
        metrics.min.heartRate.toFixed(2),
        metrics.max.heartRate.toFixed(2),
      ].join(',')}
    </div>
  )
}

test('fetches and normalizes vitals on mount', async () => {
  const { getByTestId } = render(
    <BiometricProvider>
      <TestConsumer />
    </BiometricProvider>
  )

  // run the immediate fetch
  jest.advanceTimersByTime(0)

  // wait for the state to update
  await waitFor(() => {
    const txt = getByTestId('vals').textContent || ''
    // 60/100 = 0.6, so normalized HR should be "0.60"
    expect(txt.split(',')[0]).toBe('0.60')
  })
})