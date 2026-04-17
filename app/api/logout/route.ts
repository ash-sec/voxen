import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { deleteAuthSession } from "@/lib/kv";
import { AUTH_COOKIE } from "@/lib/auth";

export async function POST(_req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;

    if (token) {
      await deleteAuthSession(token);
    }

    const response = Response.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
    );
    return response;
  } catch (err) {
    console.error("logout error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
