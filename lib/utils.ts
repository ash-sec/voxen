import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Pick a random send hour between 7–10 and a random minute, stored per subscriber */
export function randomSendTime(): { sendHour: number; sendMinute: number } {
  const sendHour = 7 + Math.floor(Math.random() * 4); // 7, 8, 9 or 10
  const sendMinute = Math.floor(Math.random() * 60);
  return { sendHour, sendMinute };
}

/** Return next delivery day label */
export function nextDeliveryDay(): string {
  const now = new Date();
  const day = now.getDay(); // 0=Sun,1=Mon,...,6=Sat
  const deliveryDays = [1, 3, 5]; // Mon=1, Wed=3, Fri=5
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    if (deliveryDays.includes(next)) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      return date.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }
  }
  return "Monday";
}

/** Returns current day name in AEST (UTC+10) */
export function getCurrentDayName(): string {
  return new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    timeZone: "Australia/Sydney",
  });
}

/** Returns current hour in AEST (UTC+10) */
export function getAESTHour(): number {
  const now = new Date();
  const aestString = now.toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    hour: "2-digit",
    hour12: false,
  });
  return parseInt(aestString, 10);
}

/** Truncate text */
export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
