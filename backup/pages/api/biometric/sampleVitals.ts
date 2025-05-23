






// File: pages/api/biometric/sampleVitals.js

import dbConnect from '../../lib/dbConnect';                       // Your MongoDB connection utility
import Vitals from '../../models/Vitals';

/**
 * Returns the newest vitals record with decrypted fields.
 */
export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const vitals = await Vitals.findOne().sort({ timestamp: -1 });
    return res.status(200).json(vitals);
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}