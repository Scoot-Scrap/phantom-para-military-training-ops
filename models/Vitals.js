// File: models/Vitals.js

import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';                         // Field-level encryption plugin :contentReference[oaicite:12]{index=12}

// Define your vitals schema
const VitalsSchema = new mongoose.Schema({
  heartRate:     { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature:   { type: Number, required: true },
  timestamp:     { type: Date,   default: () => new Date() },
});

// Load encryption keys from env vars (secure storage recommended)
const encKey = process.env.ENCRYPTION_KEY;                        // 32-byte base64 string :contentReference[oaicite:13]{index=13}
const sigKey = process.env.SIGNING_KEY;                           // 64-byte base64 string :contentReference[oaicite:14]{index=14}

// Apply encryption plugin: AES-256-CBC under the hood
VitalsSchema.plugin(encrypt, {
  encryptionKey:   encKey,
  signingKey:      sigKey,
  encryptedFields: ['heartRate', 'bloodPressure', 'temperature'],
});

export default mongoose.models.Vitals ||
  mongoose.model('Vitals', VitalsSchema);