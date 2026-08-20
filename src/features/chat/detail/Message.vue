<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { ChatMessage } from '@/types/chat'

import { themeTokens } from '@/shared/constants'
import { formatChatTime } from '@/shared/utils/date'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

defineProps<{
  messages: ChatMessage[]
  sender: string
}>()
</script>

<template>
  <div class="space-y-4 px-3 py-4 sm:px-4 sm:py-5">
    <div
      v-for="message in messages"
      :key="message.id"
      class="flex min-w-0"
      :class="message.sender === 'me' ? 'justify-end' : 'justify-start'"
    >
      <div
        :class="[
          'min-w-0 max-w-[86%] px-3 py-2.5 sm:max-w-[75%] sm:px-4 sm:py-3',
          themeTokens.radius.lg,
          themeTokens.shadow.subtle,
          message.sender === 'me'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground',
        ]"
      >
        <div class="flex min-w-0 items-center gap-3">
          <span
            :class="[
              'min-w-0 flex-1 truncate text-xs font-semibold',
              message.sender === 'me'
                ? 'text-primary-foreground/80'
                : 'text-secondary-foreground/70',
            ]"
            :title="message.sender === 'me' ? user?.name : sender"
          >
            {{ message.sender === 'me' ? (user?.name ?? 'You') : sender }}
          </span>

          <time
            :class="[
              'shrink-0 text-[11px] leading-none',
              message.sender === 'me'
                ? 'text-primary-foreground/60'
                : 'text-secondary-foreground/50',
            ]"
          >
            {{ formatChatTime(message.createdAt) }}
          </time>
        </div>

        <p class="mt-1 whitespace-pre-wrap break-words text-sm leading-6">
          {{ message.text }}
        </p>
      </div>
    </div>
  </div>
</template>
