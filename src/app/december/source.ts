/** Reads the ?ref= tag from a promo link, so registrations show which channel they came from. */
export function sourceFrom(ref: string | string[] | undefined) {
  return typeof ref === "string" && /^[\w-]{1,40}$/.test(ref) ? ref : "";
}
