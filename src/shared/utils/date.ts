const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function formatChatTime(value: string) {
  const date = new Date(value)
  const now = new Date()

  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()

  const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60_000)

  if (diffMinutes < 1) {
    return 'just now'
  }

  if (isSameDay) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  return `${date.getDate()} ${monthNames[date.getMonth()]}`
}
