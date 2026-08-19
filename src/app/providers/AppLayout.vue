<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ChevronDown, ChevronLeft, LogOut, User } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

import { themeTokens } from '@/shared/constants'
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const chatStore = useChatStore()

const { logout } = useAuth()

const showAccountMenu = ref(false)

const displayName = computed(() => {
  return authStore.user?.name ?? ''
})

const resolvedTitle = computed(() => {
  switch (route.name) {
    case 'chat-detail': {
      const chatId = String(route.params.id ?? '')

      return chatStore.getChatById(chatId)?.name ?? 'Chat'
    }

    case 'home':
      return 'Messages'

    default:
      return 'stkblitz'
  }
})

const isChatDetail = computed(() => {
  return route.name === 'chat-detail'
})

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
}

const backToHome = async () => {
  await router.push({
    name: 'home',
  })
}

const handleLogout = async () => {
  showAccountMenu.value = false

  await logout()
}

watch(
  () => route.fullPath,
  () => {
    showAccountMenu.value = false
  },
)
</script>

<template>
  <div
    :class="[
      themeTokens.color.background,
      themeTokens.color.foreground,
      'flex h-screen flex-col overflow-hidden',
    ]"
  >
    <header class="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
      <div
        :class="[
          'mx-auto flex items-center gap-3',
          themeTokens.layout.shellWidth,
          'px-4 py-3 sm:px-6 sm:py-4',
        ]"
      >
        <div class="min-w-0 flex-1">
          <p :class="[themeTokens.typography.caption, themeTokens.color.mutedText]">stkblitz</p>

          <h1 :class="[themeTokens.typography.h3, 'truncate text-balance']">
            {{ resolvedTitle }}
          </h1>
        </div>

        <button
          v-if="isChatDetail"
          type="button"
          class="inline-flex h-10 items-center justify-center rounded-md border border-border px-3 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground md:h-11 md:px-4"
          @click="backToHome"
        >
          <ChevronLeft class="h-4 w-4 md:mr-2" />

          <span class="hidden md:inline"> Back </span>
        </button>

        <div v-else-if="authStore.isLoggedIn" class="relative flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            class="inline-flex h-10 items-center gap-2 rounded-md border border-border px-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-3"
            :aria-expanded="showAccountMenu"
            aria-haspopup="menu"
            @click="toggleAccountMenu"
          >
            <User class="h-4 w-4" />

            <span class="max-w-[7rem] truncate sm:max-w-none">
              {{ displayName }}
            </span>

            <ChevronDown
              :class="['h-4 w-4 opacity-60 transition-transform', showAccountMenu && 'rotate-180']"
            />
          </button>

          <div
            v-if="showAccountMenu"
            class="absolute right-0 top-12 z-40 w-56 rounded-xl border border-border bg-card p-2 shadow-lg"
            role="menu"
          >
            <div class="px-3 py-2">
              <p :class="[themeTokens.typography.caption, themeTokens.color.mutedText]">
                Signed in as
              </p>

              <p :class="[themeTokens.typography.label, 'truncate']">
                {{ displayName }}
              </p>

              <p :class="[themeTokens.typography.caption, themeTokens.color.mutedText, 'truncate']">
                {{ authStore.user?.email }}
              </p>
            </div>

            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
              role="menuitem"
              @click="handleLogout"
            >
              <LogOut class="h-4 w-4" />

              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main
      :class="[
        'flex min-h-0 flex-1 flex-col overflow-hidden',
        'w-full',
        themeTokens.layout.shellWidth,
        'mx-auto',
        'px-4 py-4 sm:px-6 sm:py-6',
      ]"
    >
      <slot />
    </main>
  </div>
</template>
