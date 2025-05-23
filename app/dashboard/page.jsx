// app/dashboard/page.jsx

'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useLocale } from '../context/LocaleContext'
import VitalsSkeleton from '../components/VitalsSkeleton'
import VitalCard from '../components/VitalCard'
import { useCollaboration } from '../components/CollaborationProvider'
import NewFeature from '../components/NewFeature'

const GET_VITALS = gql`
  query GetVitals {
    getVitals {
      timestamp
      heartRate
      bloodPressure {
        systolic
        diastolic
      }
      oxygenSaturation
      respiratoryRate
      skinTemperature
    }
  }
`

const UPDATE_VITALS = gql`
  mutation UpdateVitals($input: VitalsInput!) {
    updateVitals(input: $input) {
      timestamp
      heartRate
      bloodPressure {
        systolic
        diastolic
      }
      oxygenSaturation
      respiratoryRate
      skinTemperature
    }
  }
`

export default function Dashboard() {
  const { t, formatDate } = useLocale()
  const { data, loading, error } = useQuery(GET_VITALS)
  const [updateVitals] = useMutation(UPDATE_VITALS)
  const { users, remoteVitals, sendVitalsUpdate } = useCollaboration()
  const [hrInput, setHrInput] = useState('')

  if (loading) return <VitalsSkeleton />
  if (error)
    return (
      <div role="alert" className="error">
        <p>Error loading vitals: {error.message}</p>
      </div>
    )

  const vitals = data.getVitals

  const handleSend = async () => {
    const input = {
      heartRate: Number(hrInput),
      bloodPressure: vitals.bloodPressure,
      oxygenSaturation: vitals.oxygenSaturation,
      respiratoryRate: vitals.respiratoryRate,
      skinTemperature: vitals.skinTemperature
    }
    await updateVitals({ variables: { input } })
    sendVitalsUpdate(input)
    setHrInput('')
  }

  return (
    <div aria-live="polite" className="vitals-grid">
      <h1>{t('dashboard.title')}</h1>

      {remoteVitals && (
        <div>
          <strong>{t('vitals.label.heartRate')}:</strong>{' '}
          {remoteVitals.heartRate} bpm
        </div>
      )}

      <VitalCard
        label={t('vitals.label.heartRate')}
        value={`${vitals.heartRate} bpm`}
      />
      <VitalCard
        label={t('vitals.label.bloodPressure')}
        value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg`}
      />
      <VitalCard
        label={t('vitals.label.oxygenSaturation')}
        value={`${vitals.oxygenSaturation} %`}
      />
      <VitalCard
        label={t('vitals.label.respiratoryRate')}
        value={`${vitals.respiratoryRate} breaths/min`}
      />
      <VitalCard
        label={t('vitals.label.skinTemperature')}
        value={`${vitals.skinTemperature} °C`}
      />
      <VitalCard
        label={t('vitals.label.timestamp')}
        value={formatDate(vitals.timestamp)}
      />

      {users.length > 0 && (
        <div>
          <strong>Online Users:</strong> {users.join(', ')}
        </div>
      )}

      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="hr-input">{t('vitals.label.heartRate')}:</label>
        <input
          id="hr-input"
          type="number"
          value={hrInput}
          onChange={(e) => setHrInput(e.target.value)}
        />
        <button onClick={handleSend} style={{ marginLeft: '0.5rem' }}>
          {t('widget.overview')}
        </button>
      </div>

      {t('showNewFeature') && <NewFeature />}
    </div>
  )
}