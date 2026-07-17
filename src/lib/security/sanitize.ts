/**
 * Escapes HTML characters in a string to prevent XSS injection.
 */
export function sanitizeString(val: string): string {
  if (!val) return "";
  return val
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
