<script setup lang="ts">
import { themeTokens } from '@/shared/constants'
</script>

<template>
  <div
    :class="[
      themeTokens.color.background,
      themeTokens.color.foreground,
      'flex min-h-screen w-full items-center justify-center overflow-y-auto',
      'px-4 py-6 sm:px-6 sm:py-10',
    ]"
  >
    <main :class="['w-full min-w-0', 'max-w-5xl']">
      <slot />
    </main>
  </div>
</template>
