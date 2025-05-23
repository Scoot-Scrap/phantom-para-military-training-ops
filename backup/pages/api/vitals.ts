export default function handler(req, res) {
  res.status(200).json({
    heartRate: Math.floor(Math.random() * 40) + 60,
    stress: Math.floor(Math.random() * 50),
    fatigue: Math.floor(Math.random() * 30),
  });
}
