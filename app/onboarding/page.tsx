import { Suspense } from "react";
import OnboardingClient from "./OnboardingClient";

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#000000" }}>
        <div className="text-[#a1a1aa]">Loading...</div>
      </div>
    }>
      <OnboardingClient />
    </Suspense>
  );
}
