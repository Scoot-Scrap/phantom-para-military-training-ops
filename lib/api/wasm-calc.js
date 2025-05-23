import { computeHeavy } from "../../lib/utils/wasmCalc";

export default async function handler(req, res) {
  const x = parseInt(req.query.x || "1", 10);
  const y = parseInt(req.query.y || "2", 10);
  const result = await computeHeavy(x, y);
  res.status(200).json({ result });
}
