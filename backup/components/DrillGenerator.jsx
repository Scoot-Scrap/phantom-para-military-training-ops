import React, { useState, useEffect } from "react";

export default function DrillGenerator({ performanceScore }) {
  const [drill, setDrill] = useState("");

  useEffect(() => {
    if (performanceScore < 50) setDrill("Basic form repetition x20");
    else if (performanceScore < 75) setDrill("Mixed drill circuit 3 rounds");
    else setDrill("Advanced tactical scenario simulation");
  }, [performanceScore]);

  return (
    <div className="drill">
      <h3>Next Drill:</h3>
      <p>{drill}</p>
    </div>
  );
}
