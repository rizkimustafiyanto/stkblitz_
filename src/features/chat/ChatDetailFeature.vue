<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { themeTokens } from '@/shared/constants'
import Button from '@/shared/ui/button.vue'
import Card from '@/shared/ui/card.vue'
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
  <section v-if="chat" :class="themeTokens.spacing.sectionGap">
    <div class="flex items-center justify-between gap-4">
      <button
        :class="[
          themeTokens.typography.caption,
          themeTokens.color.mutedText,
          'font-medium hover:text-foreground',
        ]"
        @click="backToList"
      >
        Back to chats
      </button>
      <div class="text-right">
        <p :class="[themeTokens.typography.caption, themeTokens.color.mutedText]">Chat with</p>
        <h2 :class="[themeTokens.typography.h2]">{{ chat.name }}</h2>
      </div>
    </div>

    <Card class="overflow-hidden">
      <div class="border-b border-border p-4">
        <div class="flex items-center gap-3">
          <img
            :src="chat.avatar"
            :alt="chat.name"
            :class="['h-12 w-12 object-cover', themeTokens.radius.pill]"
          />
          <div>
            <h3 class="font-semibold">{{ chat.name }}</h3>
            <p :class="[themeTokens.typography.body, themeTokens.color.mutedText]">
              {{ chat.username }}
            </p>
          </div>
        </div>
      </div>

      <div class="max-h-[60vh] space-y-4 overflow-y-auto p-4">
        <div
          v-for="message in chat.messages"
          :key="message.id"
          class="flex"
          :class="message.sender === 'me' ? 'justify-end' : 'justify-start'"
        >
          <div
            :class="[
              'max-w-[75%] px-4 py-3 text-sm leading-6',
              themeTokens.radius.lg,
              themeTokens.shadow.subtle,
              message.sender === 'me'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground',
            ]"
          >
            <p class="font-medium" v-if="message.sender === 'them'">{{ chat.name }}</p>
            <p>{{ message.text }}</p>
            <p :class="['mt-1', themeTokens.typography.caption, 'opacity-70']">
              {{ formatChatTime(message.createdAt) }}
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-border p-4">
        <div class="flex gap-3">
          <Input
            v-model="draft"
            placeholder="Type a message and press Enter..."
            @keyup.enter="send"
          />
          <Button @click="send">Send</Button>
        </div>
      </div>
    </Card>
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
