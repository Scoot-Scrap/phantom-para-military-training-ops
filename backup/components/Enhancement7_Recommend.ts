// lib/Enhancement7_Recommend.ts
interface Interaction {
  userId: string;
  itemId: string;
  rating: number;
}

export function recommend(userId: string, interactions: Interaction[]) {
  // Simple item‑item cosine similarity (demo) :contentReference[oaicite:0]{index=0}
  const byItem: Record<string, Record<string, number>> = {};
  interactions.forEach(({ userId, itemId, rating }) => {
    byItem[itemId] = byItem[itemId] || {};
    byItem[itemId][userId] = rating;
  });

  function cosine(a: number[], b: number[]) {
    const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
    const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
    const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
    return dot / (magA * magB);
  }

  const userRatings = interactions
    .filter((i) => i.userId === userId)
    .map((i) => i.itemId);
  // For brevity: find top‑similar items and return...
  return []; // implement your ranking
}
