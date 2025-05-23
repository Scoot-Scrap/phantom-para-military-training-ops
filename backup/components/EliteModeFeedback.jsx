import React from "react";

export default function EliteModeFeedback({ anomalyCount }) {
  let msg = "Keep pushing—the elite grind never stops.";
  if (anomalyCount > 5)
    msg = "Alert: High stress detected. Initiate cool-down.";
  return (
    <div className="elite-feedback">
      <strong>Elite Mode:</strong> {msg}
    </div>
  );
}
