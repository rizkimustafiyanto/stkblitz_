export function generateUserAvatar(email: string): string {
  const index = Math.abs(email.length * 13) % 10

  return `https://randomuser.me/api/portraits/lego/${index}.jpg`
}
