<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { themeTokens } from '@/shared/constants'
import Button from '@/shared/ui/button.vue'
import Input from '@/shared/ui/input.vue'
import { formatChatTime } from '@/shared/utils/date'
import { useChatStore } from '@/stores/chat'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()

const draft = ref('')

const chatId = computed(() => String(route.params.id ?? ''))
const chat = computed(() => chatStore.getChatById(chatId.value))

function send() {
  if (!draft.value.trim() || !chat.value) {
    return
  }

  chatStore.sendMessage(chat.value.id, draft.value)
  draft.value = ''
}

function backToList() {
  router.push({ name: 'home' })
}

onMounted(() => {
  if (chat.value) {
    chatStore.markAsRead(chat.value.id)
  }
})
</script>

<template>
  <section v-if="chat" class="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
    <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div class="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5">
        <div
          v-for="message in chat.messages"
          :key="message.id"
          class="flex"
          :class="message.sender === 'me' ? 'justify-end' : 'justify-start'"
        >
          <div
            :class="[
              'max-w-[86%] px-3 py-2.5 text-sm leading-6 sm:max-w-[75%] sm:px-4 sm:py-3',
              themeTokens.radius.lg,
              themeTokens.shadow.subtle,
              message.sender === 'me'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground',
            ]"
          >
            <p>{{ message.text }}</p>
            <p :class="['mt-1', themeTokens.typography.caption, 'opacity-70']">
              {{ formatChatTime(message.createdAt) }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="mt-auto shrink-0 border-t border-border bg-background/95 px-1 py-4 backdrop-blur-sm sm:px-4 sm:py-5"
      >
        <div class="flex gap-3">
          <Input
            v-model="draft"
            placeholder="Type a message and press Enter..."
            class="min-w-0 flex-1"
            @keyup.enter="send"
          />
          <Button class="shrink-0 px-5" @click="send">Send</Button>
        </div>
      </div>
    </div>
  </section>

  <section
    v-else
    :class="[
      'rounded-xl border border-border p-6',
      themeTokens.typography.body,
      themeTokens.color.mutedText,
    ]"
  >
    Chat not found.
  </section>
</template>
