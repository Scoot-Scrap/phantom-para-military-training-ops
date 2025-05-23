// File: k6-script.js

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 50,                       // 50 virtual users :contentReference[oaicite:17]{index=17}
  duration: '1m',               // 1 minute test
  rps: 100,                     // throttle to 100 requests/sec
};

export default function () {
  const res = http.get('https://localhost:3000/api/biometric/sampleVitals');
  if (res.status !== 200) {
    console.error(`Unexpected status ${res.status}`);
  }
  sleep(1);                      // 1s pause between iterations
}