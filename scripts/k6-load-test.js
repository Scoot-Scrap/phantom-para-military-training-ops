// scripts/k6-load-test.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s'
};

export default function () {
  const res = http.get('https://your-custom-domain.com/api/biometric/sampleVitals');
  check(res, {
    'status is 200': (r) => r.status === 200
  });
  sleep(1);
}