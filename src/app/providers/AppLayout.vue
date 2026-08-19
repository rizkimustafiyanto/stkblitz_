<script setup lang="ts">
import { themeTokens } from '@/shared/constants'

defineProps<{
  title?: string
}>()
</script>

<template>
  <div :class="[themeTokens.color.background, themeTokens.color.foreground, 'min-h-screen']">
    <header class="border-b border-border bg-card/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p :class="[themeTokens.typography.caption, themeTokens.color.mutedText]">stkblitz</p>
          <h1 :class="[themeTokens.typography.h3]">{{ title ?? 'Modular Vue Starter' }}</h1>
        </div>
      </div>
    </header>

    <main
      :class="[
        'mx-auto',
        themeTokens.layout.shellWidth,
        themeTokens.spacing.pageX,
        themeTokens.spacing.pageY,
      ]"
    >
      <slot />
    </main>
  </div>
</template>
