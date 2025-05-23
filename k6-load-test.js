// File: k6-load-test.js

import http from 'k6/http';
import { sleep, check } from 'k6';

// Test options
export let options = {
  vus: 100,          // 100 virtual users
  duration: '2m',    // 2 minutes total test duration
  thresholds: {
    // 95% of request durations must be below 500ms
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  // Replace with your deployment URL
  const res = http.get('https://your-domain.com/');
  
  // Validate that the response status is 200
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Pause for 1 second between iterations to simulate user think-time
  sleep(1);
}