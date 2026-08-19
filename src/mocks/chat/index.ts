import type { ChatMessage, ChatThread } from '@/types/chat'

const names = [
  'Ariana Stone',
  'Chris Evans',
  'Mila Hart',
  'Noah Bennett',
  'Zara Quinn',
  'Liam Carter',
  'Nina Brooks',
  'Ethan Cole',
  'Sofia Lane',
  'Lucas Reed',
  'Olivia Park',
  'Mason Gray',
  'Emma Fox',
  'Caleb Ward',
  'Ivy Moore',
  'Henry Wells',
  'Ella Scott',
  'Leo Turner',
  'Ruby Hayes',
  'Owen Brooks',
]

const createThread = (index: number): ChatThread => {
  const name = names[index] ?? `User ${index + 1}`

  const minutesAgo = index * 7 + 2
  const createdAt = new Date(Date.now() - minutesAgo * 60_000).toISOString()

  const message: ChatMessage = {
    id: `msg-${index}-1`,
    text: `Hey, this is message preview for ${name}.`,
    sender: 'them',
    createdAt,
  }

  return {
    id: `chat-${index + 1}`,
    name,
    username: `@${name.toLowerCase().replace(/\s+/g, '')}`,
    avatar: `https://randomuser.me/api/portraits/${
      index % 2 === 0 ? 'women' : 'men'
    }/${(index * 3) % 99}.jpg`,
    unreadCount: index % 4,
    updatedAt: createdAt,
    messages: [message],
  }
}

export const chatMockData: ChatThread[] = Array.from({ length: 20 }, (_, index) =>
  createThread(index),
)
