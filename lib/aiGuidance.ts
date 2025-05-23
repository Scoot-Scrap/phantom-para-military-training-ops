// lib/aiGuidance.ts
export function generateGuidance(metrics: {
  fatigue: number;
  blinkRate: number;
  grf: number[];
}) {
  const tips: string[] = [];
  if (metrics.fatigue > 0.2) tips.push('You’re showing high fatigue—take a micro‐break.');
  if (metrics.blinkRate < 5) tips.push('Focus looks intense—remember to blink fully.');
  if (_.mean(metrics.grf) < 10) tips.push('Push more force into your stances.');
  return tips;
}