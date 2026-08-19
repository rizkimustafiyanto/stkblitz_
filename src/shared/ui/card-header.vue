<script setup lang="ts">
import { themeTokens } from '@/shared/constants'
</script>

<template>
  <div
    :class="[
      'flex flex-col',
      themeTokens.spacing.sectionGap,
      themeTokens.spacing.cardHeaderPadding,
    ]"
  >
    <slot />
  </div>
</template>
