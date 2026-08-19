<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border bg-card/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p class="text-sm font-medium text-muted-foreground">stkblitz</p>
          <h1 class="text-xl font-semibold">{{ title ?? 'Modular Vue Starter' }}</h1>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>
