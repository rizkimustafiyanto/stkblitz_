<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/app/providers/AppLayout.vue'
import Button from '@/shared/ui/button.vue'
import Card from '@/shared/ui/card.vue'
import CardContent from '@/shared/ui/card-content.vue'
import CardDescription from '@/shared/ui/card-description.vue'
import CardHeader from '@/shared/ui/card-header.vue'
import CardTitle from '@/shared/ui/card-title.vue'
import Input from '@/shared/ui/input.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('chris_evans@example.com')
const password = ref('password')
const errorMessage = ref('')

const canSubmit = computed(() => email.value.trim().length > 0 && password.value.trim().length > 0)

watch([email, password], () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
})

function handleLogin() {
  if (!canSubmit.value) {
    errorMessage.value = 'Please fill email and password.'
    return
  }

  const success = auth.login(email.value, password.value)

  if (!success) {
    errorMessage.value = 'Please fill email and password.'
    return
  }

  router.push({ name: 'home' })
}
</script>

<template>
  <AppLayout title="Welcome back">
    <section class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="rounded-3xl border border-border bg-gradient-to-br from-primary via-slate-900 to-slate-800 p-8 text-white shadow-xl">
        <p class="text-sm uppercase tracking-[0.3em] text-white/60">stkblitz chat</p>
        <h2 class="mt-6 max-w-lg text-4xl font-semibold leading-tight">
          Sign in to continue the conversation experience.
        </h2>
        <p class="mt-4 max-w-md text-sm leading-6 text-white/75">
          Use any email and password. Login always succeeds as long as both fields are filled.
        </p>

        <div class="mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile preview"
            class="h-14 w-14 rounded-full object-cover ring-2 ring-white/20"
          />
          <div>
            <p class="text-sm text-white/60">Example user</p>
            <p class="text-lg font-medium">Chris Evans</p>
          </div>
        </div>
      </div>

      <Card class="self-center">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password to continue.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <Input v-model="email" type="email" placeholder="chris_evans@example.com" />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Password</label>
            <Input v-model="password" type="password" placeholder="••••••••" />
          </div>

          <p v-if="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
          </p>

          <Button class="w-full" :disabled="!canSubmit" @click="handleLogin">Sign in</Button>
        </CardContent>
      </Card>
    </section>
  </AppLayout>
</template>
