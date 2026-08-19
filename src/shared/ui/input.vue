<script setup lang="ts">
import { themeTokens } from '@/shared/constants'

const props = defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  class?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <input
    :type="props.type ?? 'text'"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :class="[themeTokens.components.input.base, props.class]"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
