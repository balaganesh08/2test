/**
 * Date utility functions following the Single Responsibility Principle
 * Each function handles one specific date operation
 */

/**
 * Format a date string or Date object to a localized date string
 */
export function formatDate(date: string | Date, locale = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date string or Date object to a localized time string
 */
export function formatTime(date: string | Date, locale = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a date string or Date object to a localized date and time string
 */
export function formatDateTime(date: string | Date, locale = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Check if a date is in the past
 */
export function isPast(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() < Date.now();
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() > Date.now();
}

/**
 * Get the difference between two dates in days
 */
export function getDaysDifference(date1: string | Date, date2: string | Date): number {
  const dateObj1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? new Date(date2) : date2;
  
  const differenceInTime = Math.abs(dateObj2.getTime() - dateObj1.getTime());
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
}

/**
 * Return a relative time string (e.g., "2 days ago", "in 3 hours")
 */
export function getRelativeTimeString(date: string | Date, locale = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const now = new Date();
  const diffInSeconds = Math.round((dateObj.getTime() - now.getTime()) / 1000);
  
  // Time units in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  if (Math.abs(diffInSeconds) < minute) {
    return rtf.format(Math.sign(diffInSeconds), 'second');
  } else if (Math.abs(diffInSeconds) < hour) {
    return rtf.format(Math.round(diffInSeconds / minute), 'minute');
  } else if (Math.abs(diffInSeconds) < day) {
    return rtf.format(Math.round(diffInSeconds / hour), 'hour');
  } else if (Math.abs(diffInSeconds) < week) {
    return rtf.format(Math.round(diffInSeconds / day), 'day');
  } else if (Math.abs(diffInSeconds) < month) {
    return rtf.format(Math.round(diffInSeconds / week), 'week');
  } else if (Math.abs(diffInSeconds) < year) {
    return rtf.format(Math.round(diffInSeconds / month), 'month');
  } else {
    return rtf.format(Math.round(diffInSeconds / year), 'year');
  }
}
