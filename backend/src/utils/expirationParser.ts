function parseExpirationTime(expiration: string): number {
  const timeRegex = /(\d+)([d|h|m])/g;
  let totalSeconds = 0;

  let match: RegExpExecArray | null;
  while ((match = timeRegex.exec(expiration)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit === "d") {
      totalSeconds += value * 24 * 3600; // Days to seconds
    } else if (unit === "h") {
      totalSeconds += value * 3600; // Hours to seconds
    } else if (unit === "m") {
      totalSeconds += value * 60; // Minutes to seconds
    }
  }

  return totalSeconds;
}

export { parseExpirationTime };
export default parseExpirationTime;
