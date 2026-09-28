/**
 * A mailto: link that carries the visitor's answers, for when a form could not
 * deliver them. The visitor sends the same details from their own mail client
 * and the lead still arrives.
 *
 * Percent-encoded by hand rather than with URLSearchParams: that encodes spaces
 * as "+", which several mail clients show literally in a mailto body. Line
 * breaks are CRLF, as RFC 6068 asks.
 */
export function fallbackMailto(
  email: string,
  subject: string,
  fields: ReadonlyArray<readonly [label: string, value: string | undefined]>,
): string {
  const body = fields.map(([label, value]) => `${label}: ${value ?? ""}`).join("\r\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${body}\r\n`)}`;
}
