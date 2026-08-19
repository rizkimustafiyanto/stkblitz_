import { defineStore } from 'pinia'

import type { ChatMessage, ChatThread } from '@/types/chat'
import { chatMockData } from '@/mocks'
import { cloneChats } from '@/shared/utils'

type ChatState = {
  chats: ChatThread[]
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chats: cloneChats(chatMockData),
  }),

  getters: {
    sortedChats: (state): ChatThread[] => {
      return [...state.chats].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
    },

    unreadTotal: (state): number => {
      return state.chats.reduce((total, chat) => total + chat.unreadCount, 0)
    },

    getChatById:
      (state) =>
      (chatId: string): ChatThread | undefined => {
        return state.chats.find((chat) => chat.id === chatId)
      },

    searchChats:
      (state) =>
      (keyword: string): ChatThread[] => {
        const normalized = keyword.trim().toLowerCase()

        return [...state.chats]
          .filter((chat) => {
            if (!normalized) {
              return true
            }

            return chat.name.toLowerCase().includes(normalized)
          })
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      },

    getLastMessage:
      (state) =>
      (chatId: string): ChatMessage | null => {
        const chat = state.chats.find((item) => item.id === chatId)

        return chat?.messages[chat.messages.length - 1] ?? null
      },
  },

  actions: {
    sendMessage(chatId: string, text: string): void {
      const chat = this.chats.find((item) => item.id === chatId)

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
    },

    markAsRead(chatId: string): void {
      const chat = this.chats.find((item) => item.id === chatId)

      if (!chat) {
        return
      }

      chat.unreadCount = 0
    },
  },
})
