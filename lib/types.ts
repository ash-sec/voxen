export interface Subscriber {
  id: string;
  name: string;
  email: string;
  profession: string;
  plan: string;
  subscriptionId: string;
  stripeCustomerId: string;
  status: "active" | "cancelled" | "past_due";
  signupDate: string;
  onboardingCompleted: boolean;
  onboarding?: OnboardingAnswers;
  nextBillingDate?: string;
  // Randomised send time (hour 7–10 AEST, consistent per subscriber)
  sendHour?: number;
  sendMinute?: number;
}

export interface OnboardingAnswers {
  jobTitle: string;
  wantKnownFor: string;
  personality: "straight" | "warm" | "funny" | "passionate";
  topics: string[];
  frustration: string;
  recentWin: string;
  audience: "professionals" | "employers" | "public" | "clients";
  slang: string;
}

export interface MagicLinkSession {
  email: string;
  subscriberId: string;
  expiresAt: number;
}

export interface OTPRecord {
  email: string;
  code: string;
  name: string;
  profession: string;
  expiresAt: number;
  verified: boolean;
}

export const PROFESSIONS = [
  "Registered Nurse",
  "Pharmacist",
  "Tradie / Electrician",
  "Tradie / Plumber",
  "Tradie / Builder",
  "Other Healthcare Worker",
  "Other",
] as const;

export type Profession = (typeof PROFESSIONS)[number];

export const PERSONALITY_OPTIONS = [
  { value: "straight", label: "Straight to the point" },
  { value: "warm", label: "Warm and supportive" },
  { value: "funny", label: "Funny and casual" },
  { value: "passionate", label: "Passionate and motivated" },
] as const;

export const TOPIC_OPTIONS = [
  "Patient care",
  "Mental health",
  "Work-life balance",
  "Career growth",
  "Industry news",
  "Workplace culture",
  "Skills and training",
  "Other",
] as const;

export const AUDIENCE_OPTIONS = [
  { value: "professionals", label: "Other professionals in my field" },
  { value: "employers", label: "Employers and recruiters" },
  { value: "public", label: "General public" },
  { value: "clients", label: "Future clients" },
] as const;
