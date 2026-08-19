<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

import Message from '../detail/Message.vue'
import Form from '../detail/Form.vue'

import type { ChatThread } from '@/types/chat'

const props = defineProps<{
  chat: ChatThread
}>()

const emit = defineEmits<{
  (event: 'send', message: string): void
}>()

const messageContainer = ref<HTMLElement | null>(null)

function handleSend(message: string) {
  emit('send', message)
}

async function scrollToBottom(smooth = false) {
  await nextTick()

  const element = messageContainer.value

  if (!element) {
    return
  }

  element.scrollTo({
    top: element.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  })
}

onMounted(() => {
  scrollToBottom(false)
})

watch(
  () => props.chat.messages.length,
  async () => {
    await scrollToBottom(true)
  },
  {
    flush: 'post',
  },
)
</script>

<template>
  <section class="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto]">
    <div ref="messageContainer" class="min-h-0 overflow-y-auto overscroll-contain">
      <Message :messages="chat.messages" :sender="chat.name" />
    </div>

    <Form @send="handleSend" />
  </section>
</template>
