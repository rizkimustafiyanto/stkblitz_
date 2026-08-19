import type { ChatMessage, ChatThread } from '@/types/chat'

export const cloneChats = (chats: ChatThread[]): ChatThread[] => {
  return chats.map((chat) => ({
    ...chat,
    messages: chat.messages.map((message): ChatMessage => ({
      ...message,
    })),
  }))
}

export const formatPreview = (message: ChatMessage): string => {
  return message.text
}
