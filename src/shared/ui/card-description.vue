<script setup lang="ts">
import { themeTokens } from '@/shared/constants'
</script>

<template>
  <p :class="[themeTokens.typography.body, themeTokens.color.mutedText]">
    <slot />
  </p>
</template>
