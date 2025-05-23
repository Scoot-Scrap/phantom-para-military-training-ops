import { onCLS, onFID, onLCP } from "web-vitals";

function sendMetric(metric) {
  fetch("/api/web-vitals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(metric),
  });
}

export function reportWebVitals() {
  onCLS(sendMetric);
  onFID(sendMetric);
  onLCP(sendMetric);
}
