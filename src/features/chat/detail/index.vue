<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useChatStore } from '@/stores/chat'

import ChatDetailLayout from '../layout/index.vue'

const route = useRoute()
const chatStore = useChatStore()

const chatId = computed(() => {
  return String(route.params.id ?? '')
})

const chat = computed(() => {
  return chatStore.getChatById(chatId.value)
})

function sendMessage(message: string) {
  if (!chat.value) {
    return
  }

  chatStore.sendMessage(chat.value.id, message)
}

onMounted(() => {
  if (chat.value) {
    chatStore.markAsRead(chat.value.id)
  }
})
</script>

<template>
  <ChatDetailLayout v-if="chat" :chat="chat" @send="sendMessage" />

  <section v-else class="rounded-xl border border-border p-6">Chat not found.</section>
</template>
