import React, { useState } from "react";

export default function CalibrationMode({ onCalibrated }) {
  const [steps, setSteps] = useState(0);

  function handleNext() {
    if (steps < 3) setSteps(steps + 1);
    else onCalibrated(true);
  }

  const prompts = [
    "Stand still for baseline capture",
    "Perform a light jog in place",
    "Simulate high-stress breathing",
    "Hold for final baseline",
  ];

  return (
    <div className="calibration">
      <p>{prompts[steps]}</p>
      <button onClick={handleNext}>
        {steps < 3 ? "Next Step" : "Finish Calibration"}
      </button>
    </div>
  );
}
