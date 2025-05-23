import { MongoClient } from "mongodb";

export async function getDbClient(region) {
  const urlMap = {
    us: process.env.MONGODB_URI_US,
    eu: process.env.MONGODB_URI_EU,
    ap: process.env.MONGODB_URI_AP,
  };
  const uri = urlMap[region] || process.env.MONGODB_URI_US;
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}
