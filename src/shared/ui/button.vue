<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary'
    size?: 'default' | 'sm'
    class?: string
  }>(),
  {
    variant: 'default',
    size: 'default',
  },
)
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      props.variant === 'default' ? 'bg-primary text-primary-foreground hover:opacity-90' : '',
      props.variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : '',
      props.size === 'default' ? 'h-10 px-4 py-2' : '',
      props.size === 'sm' ? 'h-9 rounded-md px-3' : '',
      props.class,
    ]"
  >
    <slot />
  </button>
</template>
