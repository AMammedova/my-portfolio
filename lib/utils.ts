import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateAz(date: string): string {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  const day = parsed.getDate().toString().padStart(2, "0");
  const month = monthNames[parsed.getMonth()];
  const year = parsed.getFullYear();
  return `${day} ${month} ${year}`;
}

export function estimateReadAz(text: string): string {
  const words = text?.split(/\s+/).length || 120;
  const minutes = Math.max(3, Math.round(words / 180));
  return `${minutes} minutes read`;
}
