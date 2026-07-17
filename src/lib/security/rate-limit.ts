type RateLimitRecord = {
  timestamps: number[];
};

const requestsStore = new Map<string, RateLimitRecord>();

/**
 * Checks if a request from an IP should be rate limited.
 * Uses a sliding-window log.
 *
 * @param ip Client IP address
 * @param limit Max number of requests allowed
 * @param windowMs Window duration in milliseconds (default: 1 minute)
 * @returns true if rate limit exceeded, false otherwise
 */
export function isRateLimited(ip: string, limit = 10, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const record = requestsStore.get(ip) || { timestamps: [] };

  // Keep only timestamps within sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    return true;
  }

  record.timestamps.push(now);
  requestsStore.set(ip, record);
  return false;
}
