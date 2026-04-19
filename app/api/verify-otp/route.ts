import { NextRequest } from "next/server";
import { getOTP, deleteOTP, savePendingSignup } from "@/lib/kv";
import { generateToken } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return Response.json({ error: "Missing email or code." }, { status: 400 });
    }

    const record = await getOTP(email);

    if (!record) {
      return Response.json(
        { error: "Code expired or not found. Please request a new one." },
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt) {
      await deleteOTP(email);
      return Response.json({ error: "Code has expired. Please request a new one." }, { status: 400 });
    }

    if (record.code !== code.toString().trim()) {
      return Response.json({ error: "Incorrect code. Please try again." }, { status: 400 });
    }

    await deleteOTP(email);

    // Create a pending signup record — questionnaire + payment come next
    const signupToken = generateToken();
    await savePendingSignup({
      token: signupToken,
      name: record.name,
      email: email.toLowerCase(),
      profession: record.profession,
      verifiedAt: Date.now(),
    });

    return Response.json({ signupToken });
  } catch (err) {
    console.error("verify-otp error:", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
