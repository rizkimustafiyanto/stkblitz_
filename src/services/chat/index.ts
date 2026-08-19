import type { MessagePayload } from '@/types/chat'
import { client } from '../http'

export const ChatService = () => {
  return {
    send(payload: MessagePayload) {
      return client.post('/chat/send', payload)
    },

    delete(id: string) {
      return client.delete(`/chat/delete/${id}`)
    },
  }
}
