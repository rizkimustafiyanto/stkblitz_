<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

import { Send } from 'lucide-vue-next'

import Button from '@/shared/ui/button.vue'

const emit = defineEmits<{
  (event: 'send', message: string): void
}>()

const draft = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const canSend = computed(() => {
  return draft.value.trim().length > 0
})

function autoResize() {
  const textarea = textareaRef.value

  if (!textarea) {
    return
  }

  textarea.style.height = 'auto'
  textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
}

async function submit() {
  const message = draft.value.trim()

  if (!message) {
    return
  }

  emit('send', message)

  draft.value = ''

  await nextTick()

  if (textareaRef.value) {
    textareaRef.value.style.height = '40px'
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter') {
    return
  }

  if (event.shiftKey) {
    return
  }

  event.preventDefault()

  submit()
}
</script>

<template>
  <div class="shrink-0 border-t border-border bg-background px-1 py-4 sm:px-4 sm:py-5">
    <form class="w-full" @submit.prevent="submit">
      <div class="relative">
        <textarea
          ref="textareaRef"
          v-model="draft"
          rows="1"
          placeholder="Type a message..."
          autocomplete="off"
          class="block min-h-10 max-h-40 w-full resize-none overflow-y-auto scrollbar-hide rounded-md border border-border bg-background px-3 py-2 pr-12 text-sm leading-6 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          @input="autoResize"
          @keydown="handleKeydown"
        />

        <Button
          type="submit"
          variant="icon"
          size="icon"
          :disabled="!canSend"
          class="absolute bottom-1.5 right-1.5 size-8"
          aria-label="Send message"
        >
          <Send class="size-4" />
        </Button>
      </div>
    </form>
  </div>
</template>
