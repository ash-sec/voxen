import { Suspense } from "react";
import LoginVerifyClient from "./LoginVerifyClient";

export default function LoginVerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#000000" }}>
        <div className="text-[#a1a1aa]">Loading...</div>
      </div>
    }>
      <LoginVerifyClient />
    </Suspense>
  );
}
