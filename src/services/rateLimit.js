const rateLimits = new Map();

export function checkRateLimit(userId, limitMs = 60000, maxRequests = 10) {
  const now = Date.now();
  const userRequests = rateLimits.get(userId) || [];

  // Clean up old requests
  const recentRequests = userRequests.filter((time) => now - time < limitMs);

  if (recentRequests.length >= maxRequests) {
    const oldestRequest = recentRequests[0];
    const timeToWait = Math.ceil((limitMs - (now - oldestRequest)) / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${timeToWait} seconds.`);
  }

  // Add new request timestamp
  recentRequests.push(now);
  rateLimits.set(userId, recentRequests);

  return true;
}
