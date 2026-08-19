<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { themeTokens } from '@/shared/constants'
import Button from '@/shared/ui/button.vue'
import Card from '@/shared/ui/card.vue'
import Input from '@/shared/ui/input.vue'
import { formatChatTime } from '@/shared/utils/date'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

const router = useRouter()
const auth = useAuthStore()
const chatStore = useChatStore()

const query = ref('')
const filteredChats = computed(() => chatStore.searchChats(query.value))

watch(
  () => chatStore.chats.length,
  () => {
    if (!query.value) {
      return
    }
    filteredChats.value
  },
)

function openChat(chatId: string) {
  router.push({ name: 'chat-detail', params: { id: chatId } })
}

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <section :class="themeTokens.spacing.sectionGap">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p :class="[themeTokens.typography.caption, themeTokens.color.mutedText]">Logged in as {{ auth.user?.name }}</p>
        <h2 :class="[themeTokens.typography.h1]">Messages</h2>
        <p :class="['mt-2', themeTokens.typography.body, themeTokens.color.mutedText]">
          {{ chatStore.unreadTotal }} unread messages across all chats.
        </p>
      </div>

      <div class="flex gap-3">
        <Button variant="secondary" @click="logout">Logout</Button>
      </div>
    </div>

    <div :class="themeTokens.layout.formWidth">
      <Input v-model="query" placeholder="Search by user name..." />
    </div>

    <div class="grid gap-4">
      <Card
        v-for="chat in filteredChats"
        :key="chat.id"
        class="cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
        @click="openChat(chat.id)"
      >
        <div class="flex items-center gap-4 p-4">
          <img :src="chat.avatar" :alt="chat.name" :class="['h-14 w-14 object-cover', themeTokens.radius.pill]" />

          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <h3 class="truncate text-base font-semibold">{{ chat.name }}</h3>
                <p :class="[themeTokens.typography.body, themeTokens.color.mutedText]">{{ chatStore.formatPreview(chat.messages[chat.messages.length - 1]) }}</p>
              </div>

              <div class="flex flex-col items-end gap-2">
                <span :class="[themeTokens.typography.caption, themeTokens.color.mutedText]">{{ formatChatTime(chat.updatedAt) }}</span>
                <span
                  v-if="chat.unreadCount > 0"
                  class="inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground"
                >
                  {{ chat.unreadCount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>
