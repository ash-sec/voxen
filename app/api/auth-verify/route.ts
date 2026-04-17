import { NextRequest } from "next/server";
import { getMagicSession, deleteMagicSession, saveAuthSession } from "@/lib/kv";
import { generateToken } from "@/lib/utils";
import { AUTH_COOKIE } from "@/lib/auth";

const SEVEN_DAYS = 7 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return Response.json({ error: "Missing token." }, { status: 400 });
    }

    const session = await getMagicSession(token);

    if (!session) {
      return Response.json({ error: "Link has expired or already been used. Please request a new one." }, { status: 400 });
    }

    if (Date.now() > session.expiresAt) {
      await deleteMagicSession(token);
      return Response.json({ error: "Link has expired. Please request a new one." }, { status: 400 });
    }

    await deleteMagicSession(token);

    // Create auth session
    const sessionToken = generateToken();
    await saveAuthSession(sessionToken, session.subscriberId);

    const response = Response.json({ success: true, subscriberId: session.subscriberId });

    // Set secure HTTP-only cookie
    const cookieHeader = `${AUTH_COOKIE}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SEVEN_DAYS}${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;
    response.headers.set("Set-Cookie", cookieHeader);

    return response;
  } catch (err) {
    console.error("auth-verify error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
