interface Step {
  number: number;
  label: string;
  sublabel: string;
}

const STEPS: Step[] = [
  { number: 1, label: "Verify email",       sublabel: "Quick & secure" },
  { number: 2, label: "Tell us about you",  sublabel: "5 min questionnaire" },
  { number: 3, label: "Subscribe",          sublabel: "$250/month AUD" },
];

export default function SignupStepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <div className="w-full mb-8">
      {/* Desktop: horizontal stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Connector line behind dots */}
        <div
          className="absolute top-4 left-0 right-0 h-px"
          style={{ background: "rgba(59,130,246,0.15)" }}
        />
        {/* Progress fill */}
        <div
          className="absolute top-4 left-0 h-px transition-all duration-500"
          style={{
            background: "rgba(59,130,246,0.5)",
            width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
          }}
        />

        {STEPS.map((step) => {
          const done    = step.number < currentStep;
          const active  = step.number === currentStep;
          const pending = step.number > currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10 flex-1">
              {/* Circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 mb-2"
                style={{
                  background: done
                    ? "rgba(34,197,94,0.15)"
                    : active
                    ? "#3B82F6"
                    : "rgba(15,23,42,0.8)",
                  border: done
                    ? "1.5px solid rgba(34,197,94,0.5)"
                    : active
                    ? "none"
                    : "1.5px solid rgba(59,130,246,0.2)",
                  color: done ? "#4ade80" : active ? "#fff" : "#475569",
                  boxShadow: active ? "0 0 16px rgba(59,130,246,0.4)" : "none",
                }}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              {/* Labels */}
              <span
                className="text-xs font-semibold text-center leading-tight"
                style={{ color: active ? "#ffffff" : done ? "#4ade80" : "#475569" }}
              >
                {step.label}
              </span>
              <span className="text-xs text-slate-600 text-center mt-0.5 hidden sm:block">
                {step.sublabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: compact pill */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-white">
            Step {currentStep} of {STEPS.length} — {STEPS[currentStep - 1].label}
          </span>
          <span className="text-xs text-slate-500">
            {Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100)}% complete
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(59,130,246,0.12)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
              minWidth: currentStep === 1 ? "12px" : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}
