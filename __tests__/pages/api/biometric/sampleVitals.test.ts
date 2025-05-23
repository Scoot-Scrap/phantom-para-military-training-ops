// __tests__/pages/api/biometric/sampleVitals.test.ts
import request from 'supertest';
import handler from '../../../pages/api/biometric/sampleVitals';
import { createMocks } from 'node-mocks-http';

test('GET /api/biometric/sampleVitals returns JSON array', async () => {
  const { req, res } = createMocks({ method: 'GET' });
  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
  const data = JSON.parse(res._getData());
  expect(Array.isArray(data)).toBe(true);
});