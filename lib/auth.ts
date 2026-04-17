import { cookies } from "next/headers";
import { getAuthSession, getSubscriber } from "./kv";
import type { Subscriber } from "./types";

export const AUTH_COOKIE = "voxen_session";

export async function getSessionSubscriber(): Promise<Subscriber | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;
    if (!token) return null;

    const subscriberId = await getAuthSession(token);
    if (!subscriberId) return null;

    return getSubscriber(subscriberId);
  } catch {
    return null;
  }
}
