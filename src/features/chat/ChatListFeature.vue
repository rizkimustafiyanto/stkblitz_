<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { themeTokens } from '@/shared/constants'
import Card from '@/shared/ui/card.vue'
import Input from '@/shared/ui/input.vue'
import { formatChatTime } from '@/shared/utils/date'
import { useChatStore } from '@/stores/chat'

const router = useRouter()
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
</script>

<template>
  <section :class="themeTokens.spacing.sectionGap">
    <div>
      <Input v-model="query" placeholder="Search by user name..." />
    </div>

    <div class="grid gap-3 sm:gap-4">
      <Card
        v-for="chat in filteredChats"
        :key="chat.id"
        class="cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
        @click="openChat(chat.id)"
      >
        <div class="flex items-start gap-3 p-3 sm:items-center sm:gap-4 sm:p-4">
          <img
            :src="chat.avatar"
            :alt="chat.name"
            :class="['h-12 w-12 shrink-0 object-cover sm:h-14 sm:w-14', themeTokens.radius.pill]"
          />

          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3 sm:gap-4">
              <div class="min-w-0">
                <h3 class="truncate text-sm font-semibold sm:text-base">{{ chat.name }}</h3>
                <p :class="[themeTokens.typography.body, themeTokens.color.mutedText]">
                  {{ chatStore.formatPreview(chat.messages[chat.messages.length - 1]) }}
                </p>
              </div>

              <div class="flex shrink-0 flex-col items-end gap-1 sm:gap-2">
                <span :class="[themeTokens.typography.caption, themeTokens.color.mutedText]">{{
                  formatChatTime(chat.updatedAt)
                }}</span>
                <span
                  v-if="chat.unreadCount > 0"
                  class="inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-2 py-1 text-[11px] font-semibold text-primary-foreground"
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
