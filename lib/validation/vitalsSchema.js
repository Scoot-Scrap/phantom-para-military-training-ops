// File: lib/validation/vitalsSchema.js

import Ajv from 'ajv';                          // Fast JSON schema validator :contentReference[oaicite:8]{index=8}

const ajv = new Ajv({ allErrors: true, strict: false });

export const vitalsSchema = {
  type: 'object',
  properties: {
    heartRate:     { type: 'number', minimum: 30, maximum: 220 },
    bloodPressure: { type: 'string', pattern: '^[0-9]{2,3}\\/[0-9]{2,3}$' },
    temperature:   { type: 'number', minimum: 34, maximum: 42 },
    timestamp:     { type: 'string', format: 'date-time' },
  },
  required: ['heartRate','bloodPressure','temperature','timestamp'],
  additionalProperties: false,
};

export const validateVitals = ajv.compile(vitalsSchema);  // Returns a function to validate payloads :contentReference[oaicite:9]{index=9}