<script setup lang="ts">
import { computed, ref } from 'vue'

import Button from '@/shared/ui/button.vue'
import Input from '@/shared/ui/input.vue'

const emit = defineEmits<{
  (event: 'send', message: string): void
}>()

const draft = ref('')

const canSend = computed(() => {
  return draft.value.trim().length > 0
})

function submit() {
  const message = draft.value.trim()

  if (!message) {
    return
  }

  emit('send', message)

  draft.value = ''
}
</script>

<template>
  <div class="shrink-0 border-t border-border bg-background px-1 py-4 sm:px-4 sm:py-5">
    <form class="flex w-full gap-3" @submit.prevent="submit">
      <Input
        v-model="draft"
        type="text"
        placeholder="Type a message..."
        autocomplete="off"
        class="min-w-0 flex-1"
      />

      <Button type="submit" class="shrink-0 px-5" :disabled="!canSend"> Send </Button>
    </form>
  </div>
</template>
