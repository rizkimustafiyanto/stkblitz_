import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import type { ChatMessage, ChatThread } from '@/types/chat'
import { useAuthStore } from '@/stores/auth'

function makeThread(index: number): ChatThread {
  const name = [
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
  ][index]

  const minutesAgo = index * 7 + 2
  const now = Date.now()
  const createdAt = new Date(now - minutesAgo * 60_000).toISOString()

  const messages: ChatMessage[] = [
    {
      id: `msg-${index}-1`,
      text: `Hey, this is message preview for ${name}.`,
      sender: 'them',
      createdAt,
    },
  ]

  return {
    id: `chat-${index + 1}`,
    name,
    username: `@${name.toLowerCase().replace(/\s+/g, '')}`,
    avatar: `https://randomuser.me/api/portraits/${
      index % 2 === 0 ? 'women' : 'men'
    }/${(index * 3) % 99}.jpg`,
    unreadCount: index % 4,
    updatedAt: createdAt,
    messages,
  }
}

const seedChats = Array.from({ length: 20 }, (_, index) => makeThread(index))

function formatPreview(message: ChatMessage) {
  return message.text
}

function cloneChats(chats: ChatThread[]) {
  return chats.map((chat) => ({
    ...chat,
    messages: chat.messages.map((message) => ({ ...message })),
  }))
}

export const useChatStore = defineStore('chat', () => {
  const chats = reactive<ChatThread[]>(cloneChats(seedChats))

  const auth = useAuthStore()

  const sortedChats = computed(() =>
    [...chats].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)),
  )

  const unreadTotal = computed(() => chats.reduce((total, chat) => total + chat.unreadCount, 0))

  function getChatById(chatId: string) {
    return chats.find((chat) => chat.id === chatId)
  }

  function searchChats(keyword: string) {
    const normalized = keyword.trim().toLowerCase()

    if (!normalized) {
      return sortedChats.value
    }

    return sortedChats.value.filter((chat) => chat.name.toLowerCase().includes(normalized))
  }

  function getLastMessage(chat: ChatThread) {
    return chat.messages[chat.messages.length - 1] ?? null
  }

  function sendMessage(chatId: string, text: string) {
    const chat = getChatById(chatId)
    if (!chat || !text.trim()) {
      return
    }

    const message: ChatMessage = {
      id: `msg-${chat.id}-${Date.now()}`,
      text: text.trim(),
      sender: 'me',
      createdAt: new Date().toISOString(),
    }

    chat.messages.push(message)
    chat.updatedAt = message.createdAt
    chat.unreadCount = 0
  }

  function resetUnread(chatId: string) {
    const chat = getChatById(chatId)
    if (chat) {
      chat.unreadCount = 0
    }
  }

  function markAsRead(chatId: string) {
    resetUnread(chatId)
  }

  function currentUserName() {
    return auth.user?.name ?? 'You'
  }

  return {
    chats,
    sortedChats,
    unreadTotal,
    searchChats,
    getChatById,
    getLastMessage,
    sendMessage,
    markAsRead,
    currentUserName,
    formatPreview,
  }
})
