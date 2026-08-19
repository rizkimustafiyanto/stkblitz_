<script setup lang="ts">
import AppLayout from '@/app/providers/AppLayout.vue'
import ChatListFeature from '@/features/chat/ChatListFeature.vue'
</script>

<template>
  <AppLayout title="Messages">
    <ChatListFeature />
  </AppLayout>
</template>
