<script setup lang="ts">
import { themeTokens } from '@/shared/constants'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary' | 'ghost'
    size?: 'default' | 'sm'
    class?: string
  }>(),
  {
    variant: 'default',
    size: 'default',
    class: undefined,
  },
)
</script>

<template>
  <button
    :class="[
      themeTokens.components.button.base,
      props.variant === 'default' ? themeTokens.components.button.variants.default : '',
      props.variant === 'secondary' ? themeTokens.components.button.variants.secondary : '',
      props.variant === 'ghost' ? themeTokens.components.button.variants.ghost : '',
      props.size === 'default' ? themeTokens.components.button.sizes.default : '',
      props.size === 'sm' ? themeTokens.components.button.sizes.sm : '',
      props.class,
    ]"
  >
    <slot />
  </button>
</template>
