<script setup lang="ts">
import { themeTokens } from '@/shared/constants'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary' | 'ghost' | 'icon'
    size?: 'default' | 'sm' | 'icon'
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
      props.variant === 'icon' ? themeTokens.components.button.variants.icon : '',
      props.size === 'default' ? themeTokens.components.button.sizes.default : '',
      props.size === 'sm' ? themeTokens.components.button.sizes.sm : '',
      props.size === 'icon' ? themeTokens.components.button.sizes.icon : '',
      props.class,
    ]"
  >
    <slot />
  </button>
</template>
