import { Suspense } from "react";
import LoginVerifyClient from "./LoginVerifyClient";

export default function LoginVerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0F1E" }}>
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <LoginVerifyClient />
    </Suspense>
  );
}
