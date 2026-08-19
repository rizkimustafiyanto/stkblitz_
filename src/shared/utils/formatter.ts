export function toTitleCaseFromEmail(email: string): string {
  const localPart = email.split('@')[0] ?? ''

  return localPart
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}
