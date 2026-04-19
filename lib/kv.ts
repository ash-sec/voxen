import { Redis } from "@upstash/redis";
import type { Subscriber, OTPRecord, MagicLinkSession, PendingSignup } from "./types";

// Initialise Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// ── Subscriber ──────────────────────────────────────────────────────────────

export async function getSubscriber(id: string): Promise<Subscriber | null> {
  return redis.get<Subscriber>(`sub:${id}`);
}

export async function getSubscriberByEmail(email: string): Promise<Subscriber | null> {
  const id = await redis.get<string>(`email:${email.toLowerCase()}`);
  if (!id) return null;
  return getSubscriber(id);
}

export async function saveSubscriber(sub: Subscriber): Promise<void> {
  await redis.set(`sub:${sub.id}`, sub);
  await redis.set(`email:${sub.email.toLowerCase()}`, sub.id);
  // Index for cron jobs
  await redis.sadd("subscribers:active", sub.id);
}

export async function updateSubscriber(
  id: string,
  updates: Partial<Subscriber>
): Promise<Subscriber | null> {
  const existing = await getSubscriber(id);
  if (!existing) return null;
  const updated = { ...existing, ...updates };
  await redis.set(`sub:${id}`, updated);
  return updated;
}

export async function getAllActiveSubscriberIds(): Promise<string[]> {
  return redis.smembers("subscribers:active");
}

export async function removeFromActiveSet(id: string): Promise<void> {
  await redis.srem("subscribers:active", id);
}

// ── OTP ─────────────────────────────────────────────────────────────────────

export async function saveOTP(record: OTPRecord): Promise<void> {
  // Expire after 10 minutes
  await redis.set(`otp:${record.email.toLowerCase()}`, record, { ex: 600 });
}

export async function getOTP(email: string): Promise<OTPRecord | null> {
  return redis.get<OTPRecord>(`otp:${email.toLowerCase()}`);
}

export async function deleteOTP(email: string): Promise<void> {
  await redis.del(`otp:${email.toLowerCase()}`);
}

// ── Magic Link Session ───────────────────────────────────────────────────────

export async function saveMagicSession(
  token: string,
  session: MagicLinkSession
): Promise<void> {
  // Expire after 15 minutes
  await redis.set(`magic:${token}`, session, { ex: 900 });
}

export async function getMagicSession(token: string): Promise<MagicLinkSession | null> {
  return redis.get<MagicLinkSession>(`magic:${token}`);
}

export async function deleteMagicSession(token: string): Promise<void> {
  await redis.del(`magic:${token}`);
}

// ── Auth Session (after magic link consumed) ────────────────────────────────

export async function saveAuthSession(
  sessionToken: string,
  subscriberId: string
): Promise<void> {
  // Expire after 7 days
  await redis.set(`auth:${sessionToken}`, subscriberId, { ex: 604800 });
}

export async function getAuthSession(sessionToken: string): Promise<string | null> {
  return redis.get<string>(`auth:${sessionToken}`);
}

export async function deleteAuthSession(sessionToken: string): Promise<void> {
  await redis.del(`auth:${sessionToken}`);
}

// ── Pending Signups (pre-payment) ────────────────────────────────────────────

const PENDING_TTL = 7 * 24 * 60 * 60; // 7 days in seconds

export async function savePendingSignup(record: PendingSignup): Promise<void> {
  await redis.set(`pending:${record.token}`, record, { ex: PENDING_TTL });
}

export async function getPendingSignup(token: string): Promise<PendingSignup | null> {
  return redis.get<PendingSignup>(`pending:${token}`);
}

export async function deletePendingSignup(token: string): Promise<void> {
  await redis.del(`pending:${token}`);
  await redis.zrem("pending:all", token);
}

/** Add token to the sorted set used by the abandoned-flow cron. Score = questionnaire completion timestamp. */
export async function indexPendingSignup(token: string, score: number): Promise<void> {
  await redis.zadd("pending:all", { score, member: token });
}

/** Get tokens whose questionnaire was completed between (now - maxAgeMs) and (now - minAgeMs) */
export async function getAbandonedPendingTokens(
  minAgeMs: number,
  maxAgeMs: number
): Promise<string[]> {
  const now = Date.now();
  const min = now - maxAgeMs;
  const max = now - minAgeMs;
  return redis.zrange("pending:all", min, max, { byScore: true }) as Promise<string[]>;
}
