import { getDbClient } from "../../lib/db/geoDbClient";

export default async function handler(req, res) {
  const regionHeader = req.headers["x-vercel-ip-country"] || "US";
  const region = regionHeader.toLowerCase() === "eu" ? "eu" : "us";
  const client = await getDbClient(region);
  const data = await client.db().collection("items").find().toArray();
  await client.close();
  res.status(200).json(data);
}
