export function validateUrl(url) {
  try {
    const parsedUrl = new URL(url);

    // Check protocol
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('URL must use HTTP or HTTPS protocol');
    }

    // Check for IP addresses (Google doesn't index IP addresses)
    const ipv4Regex = /^\d{1,3}(\.\d{1,3}){3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    if (
      ipv4Regex.test(parsedUrl.hostname) ||
      ipv6Regex.test(parsedUrl.hostname)
    ) {
      throw new Error('IP addresses are not allowed');
    }

    // Check for localhost and test domains
    const invalidDomains = [
      'localhost',
      '127.0.0.1',
      'test',
      'example',
      'invalid',
    ];
    if (invalidDomains.some((domain) => parsedUrl.hostname.includes(domain))) {
      throw new Error('Invalid domain name');
    }

    return true;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Invalid URL format');
    }
    throw error;
  }
}
