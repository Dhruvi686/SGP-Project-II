import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility: className merger (UI-only)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
