<script setup lang="ts">
import { themeTokens } from '@/shared/constants'
</script>

<template>
  <h3 :class="[themeTokens.typography.h2]">
    <slot />
  </h3>
</template>
