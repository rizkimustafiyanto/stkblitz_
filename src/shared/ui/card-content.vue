<script setup lang="ts">
import { themeTokens } from '@/shared/constants'
</script>

<template>
  <div :class="[themeTokens.spacing.cardContentPadding]">
    <slot />
  </div>
</template>
