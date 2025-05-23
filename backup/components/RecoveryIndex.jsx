import React, { useEffect, useState } from "react";

export default function RecoveryIndex({ heartRate, sleepHours }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // simple formula: better HR & sleep → higher index
    const hrScore = Math.max(0, (100 - heartRate) / 100);
    const sleepScore = Math.min(1, sleepHours / 8);
    setIndex((((hrScore + sleepScore) / 2) * 100).toFixed(0));
  }, [heartRate, sleepHours]);

  return <div>Recovery Index: {index}/100</div>;
}
