<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

import { themeTokens } from '@/shared/constants'
import Button from '@/shared/ui/button.vue'

const props = defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  class?: string
  showPasswordToggle?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)

const inputType = () => {
  if (props.type === 'password' && props.showPasswordToggle) {
    return showPassword.value ? 'text' : 'password'
  }

  return props.type ?? 'text'
}
</script>

<template>
  <div class="relative w-full">
    <input
      :type="inputType()"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :class="[
        themeTokens.components.input.base,
        props.showPasswordToggle && props.type === 'password' ? 'pr-11' : '',
        props.class,
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <Button
      v-if="props.showPasswordToggle && props.type === 'password'"
      type="button"
      variant="icon"
      size="icon"
      class="absolute right-2 top-1/2 size-8 -translate-y-1/2"
      :aria-label="showPassword ? 'Hide password' : 'Show password'"
      :aria-pressed="showPassword"
      @click="showPassword = !showPassword"
    >
      <EyeOff v-if="showPassword" class="size-4" />
      <Eye v-else class="size-4" />
    </Button>
  </div>
</template>
