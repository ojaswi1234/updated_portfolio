import { Redis } from "@upstash/redis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const VISITOR_COUNT_KEY = "portfolio:visitor_count";
const VISITOR_SET_KEY = "portfolio:visitor_ids";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "POST") {
      const { visitorId } = req.body ?? {};

      if (!visitorId || typeof visitorId !== "string" || visitorId.length > 64) {
        return res.status(400).json({ error: "Invalid visitorId" });
      }

      // SADD returns 1 if the member was added (new), 0 if already existed
      const isNew = await redis.sadd(VISITOR_SET_KEY, visitorId);

      if (isNew === 1) {
        const count = await redis.incr(VISITOR_COUNT_KEY);
        return res.status(200).json({ count, new: true });
      }

      // Returning user — just return current count
      const count = (await redis.get<number>(VISITOR_COUNT_KEY)) ?? 0;
      return res.status(200).json({ count, new: false });
    }

    // GET — just return the count
    const count = (await redis.get<number>(VISITOR_COUNT_KEY)) ?? 0;
    return res.status(200).json({ count });
  } catch (err) {
    console.error("Visitor counter error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
