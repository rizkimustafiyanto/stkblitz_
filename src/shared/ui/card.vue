<script setup lang="ts">
import { themeTokens } from '@/shared/constants'
</script>

<template>
  <div :class="themeTokens.components.card.base">
    <slot />
  </div>
</template>
