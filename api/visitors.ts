import { Redis } from "@upstash/redis";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHash } from "crypto";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const VISITOR_SET_KEY = "portfolio:visitor_ip_hashes";
const IP_HASH_SALT = process.env.VISITOR_IP_HASH_SALT ?? "";

function extractClientIp(req: VercelRequest): string | null {
  const forwardedFor = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];

  const forwardedIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0]?.trim();

  const ip =
    forwardedIp ||
    (Array.isArray(realIp) ? realIp[0] : realIp) ||
    req.socket?.remoteAddress ||
    null;

  if (!ip) {
    return null;
  }

  return ip.replace("::ffff:", "");
}

function hashIp(ip: string): string {
  return createHash("sha256").update(`${IP_HASH_SALT}:${ip}`).digest("hex");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "POST") {
      const clientIp = extractClientIp(req);

      if (!clientIp) {
        return res.status(400).json({ error: "Could not determine client IP" });
      }

      const hashedIp = hashIp(clientIp);

      // Store only a salted hash of the IP for privacy-safe deduplication.
      // SADD returns 1 if the member was added (new), 0 if already existed.
      const isNew = await redis.sadd(VISITOR_SET_KEY, hashedIp);

      if (isNew === 1) {
        const count = await redis.scard(VISITOR_SET_KEY);
        return res.status(200).json({ count, new: true });
      }

      // Returning user: just return unique count.
      const count = await redis.scard(VISITOR_SET_KEY);
      return res.status(200).json({ count, new: false });
    }

    // GET: return unique visitor count.
    const count = await redis.scard(VISITOR_SET_KEY);
    return res.status(200).json({ count });
  } catch (err) {
    console.error("Visitor counter error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
