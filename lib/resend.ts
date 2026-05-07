import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export const FROM_EMAIL = "Voxen <hello@voxen.co>";
export const REPLY_TO = "voxensupport.au@gmail.com";
export const SUPPORT_EMAIL = "voxensupport.au@gmail.com";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://voxen.co";

export const SUBJECT_LINES = [
  "Your LinkedIn post for today 📝",
  "Fresh content just dropped 👋",
  "Here's your post for {day}",
  "Your Voxen post is ready ✍️",
  "New post, ready to go 🚀",
];

export function randomSubjectLine(day: string): string {
  const lines = [
    "Your LinkedIn post for today 📝",
    "Fresh content just dropped 👋",
    `Here's your post for ${day}`,
    "Your Voxen post is ready ✍️",
    "New post, ready to go 🚀",
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

export const OPENERS = [
  "Hope your week's going well! Here's your post for today:",
  "Morning! Your post's ready to go 👇",
  "Here's this week's content drop:",
  "Your post just landed. Copy, paste, done:",
  "Another week, another great post. Here you go:",
  "Keeping your LinkedIn ticking along 🙌 Here's today's post:",
];

export function randomOpener(): string {
  return OPENERS[Math.floor(Math.random() * OPENERS.length)];
}
