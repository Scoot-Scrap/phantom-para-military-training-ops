'use client';
import React, { useState, useEffect } from 'react';
import { useBiometric } from '../context/BiometricContext';
import VitalsSkeleton from '../components/VitalsSkeleton';
import VitalCard from '../components/VitalCard';

export default function Dashboard() {
  const { vitals, loading, error, retry, updateVitals } = useBiometric();
  const [hrInput, setHrInput] = useState(vitals?.heartRate || 75);
  const [liveData, setLiveData] = useState(vitals);

  useEffect(() => {
    if (vitals) setLiveData(vitals);
  }, [vitals]);

  if (loading) return <VitalsSkeleton />;
  if (error)
    return (
      <div role="alert" className="error">
        <p>Error: {error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );

  const handleSend = () => {
    updateVitals({
      heartRate: hrInput,
      bloodPressure: vitals.bloodPressure,
      oxygenSaturation: vitals.oxygenSaturation,
      respiratoryRate: vitals.respiratoryRate,
      skinTemperature: vitals.skinTemperature,
    });
  };

  return (
    <div aria-live="polite" className="vitals-grid">
      <VitalCard label="Heart Rate" value={`${liveData.heartRate} bpm`} />
      <VitalCard
        label="Blood Pressure"
        value={`${liveData.bloodPressure.systolic}/${liveData.bloodPressure.diastolic} mmHg`}
      />
      <VitalCard label="O₂ Saturation" value={`${liveData.oxygenSaturation} %`} />
      <VitalCard
        label="Respiratory Rate"
        value={`${liveData.respiratoryRate} breaths/min`}
      />
      <VitalCard label="Skin Temp" value={`${liveData.skinTemperature} °C`} />
      <VitalCard
        label="Timestamp"
        value={new Date(liveData.timestamp).toLocaleTimeString()}
      />
      <div>
        <label htmlFor="hr-input">New Heart Rate:</label>
        <input
          id="hr-input"
          type="number"
          value={hrInput}
          onChange={e => setHrInput(Number(e.target.value))}
        />
        <button onClick={handleSend}>Send Update</button>
      </div>
    </div>
  );
}






'use client';
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function DashboardLayout({ children }) {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className="dashboard-container">
      <Header />
      <Sidebar />
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        ref={mainRef}
        className="main"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}