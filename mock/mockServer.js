// File: mock/mockServer.js

const MockServer = require('mockttp').getLocal();                // Mockttp for HTTP mocking :contentReference[oaicite:16]{index=16}

(async () => {
  await MockServer.start(1080);

  // Stub GET and POST for /api/biometric/sampleVitals
  await MockServer.forGet('/api/biometric/sampleVitals').thenReply(200, JSON.stringify({
    heartRate: 75,
    bloodPressure: '120/80',
    temperature: 36.7,
    timestamp: new Date().toISOString(),
  }));
  await MockServer.forPost('/api/biometric/sampleVitals').thenReply(200);

  console.log('MockServer running on port 1080');
})();