export type ChatMessage = {
  id: string
  text: string
  sender: 'me' | 'them'
  createdAt: string
}

export type ChatThread = {
  id: string
  name: string
  username: string
  avatar: string
  unreadCount: number
  updatedAt: string
  messages: ChatMessage[]
}
