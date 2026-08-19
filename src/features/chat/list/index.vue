<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { themeTokens } from '@/shared/constants'
import Card from '@/shared/ui/card.vue'
import Input from '@/shared/ui/input.vue'
import { formatChatTime } from '@/shared/utils/date'
import { useChatStore } from '@/stores/chat'

const router = useRouter()
const chatStore = useChatStore()

const query = ref('')

const filteredChats = computed(() => {
  return chatStore.searchChats(query.value)
})

const openChat = async (chatId: string) => {
  await router.push({
    name: 'chat-detail',
    params: {
      id: chatId,
    },
  })
}
</script>

<template>
  <section class="flex min-h-0 min-w-0 flex-1 flex-col">
    <div class="w-full shrink-0 pb-4 sm:pb-5">
      <Input
        v-model="query"
        type="search"
        placeholder="Search by contact name..."
        aria-label="Search chats"
        class="w-full"
      />
    </div>

    <div
      v-if="filteredChats.length > 0"
      class="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto"
    >
      <div class="grid min-w-0 w-full gap-3 sm:gap-4">
        <Card
          v-for="chat in filteredChats"
          :key="chat.id"
          class="w-full min-w-0 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
          role="button"
          tabindex="0"
          @click="openChat(chat.id)"
          @keydown.enter="openChat(chat.id)"
          @keydown.space.prevent="openChat(chat.id)"
        >
          <div class="flex min-w-0 w-full items-center gap-3 p-3 sm:gap-4 sm:p-4">
            <img
              :src="chat.avatar"
              :alt="chat.name"
              :class="['h-11 w-11 shrink-0 object-cover sm:h-14 sm:w-14', themeTokens.radius.pill]"
            />

            <div class="min-w-0 flex-1">
              <div class="flex min-w-0 items-center justify-between gap-2 sm:gap-4">
                <div class="min-w-0 flex-1">
                  <h3 class="truncate text-sm font-semibold sm:text-base">
                    {{ chat.name }}
                  </h3>

                  <p
                    :class="[themeTokens.typography.body, themeTokens.color.mutedText, 'truncate']"
                  >
                    {{ chatStore.getLastMessage(chat.id)?.text ?? '' }}
                  </p>
                </div>

                <div class="flex w-auto shrink-0 flex-col items-end gap-1 sm:gap-2">
                  <span
                    :class="[
                      themeTokens.typography.caption,
                      themeTokens.color.mutedText,
                      'whitespace-nowrap',
                    ]"
                  >
                    {{ formatChatTime(chat.updatedAt) }}
                  </span>

                  <span
                    v-if="chat.unreadCount > 0"
                    class="inline-flex min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground sm:min-w-6 sm:px-2 sm:py-1 sm:text-[11px]"
                  >
                    {{ chat.unreadCount }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <Card
      v-else
      class="flex min-h-40 w-full min-w-0 flex-1 items-center justify-center p-6 text-center"
    >
      <div class="min-w-0">
        <p class="font-medium">No chats found</p>

        <p :class="[themeTokens.typography.body, themeTokens.color.mutedText, 'mt-1']">
          Try searching with another name.
        </p>
      </div>
    </Card>
  </section>
</template>
