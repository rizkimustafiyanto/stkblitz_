<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import AppLayout from '@/app/providers/AppLayout.vue'
import { themeTokens } from '@/shared/constants'
import Button from '@/shared/ui/button.vue'
import Card from '@/shared/ui/card.vue'
import CardContent from '@/shared/ui/card-content.vue'
import CardDescription from '@/shared/ui/card-description.vue'
import CardHeader from '@/shared/ui/card-header.vue'
import CardTitle from '@/shared/ui/card-title.vue'
import Input from '@/shared/ui/input.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
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
  <AppLayout>
    <section
      :class="[
        'mx-auto grid items-stretch',
        themeTokens.layout.contentWidth,
        themeTokens.spacing.sectionGap,
        'lg:grid-cols-[1.1fr_0.9fr]',
      ]"
    >
      <div
        :class="[
          'border border-border bg-gradient-to-br from-primary via-slate-900 to-slate-800 text-white',
          themeTokens.radius.xl,
          'p-6 sm:p-8',
          themeTokens.shadow.strong,
        ]"
      >
        <p :class="[themeTokens.typography.overline, themeTokens.color.whiteMuted]">
          stkblitz chat
        </p>
        <h2 :class="['mt-6 max-w-lg', themeTokens.typography.display, 'leading-tight']">
          Sign in to continue the conversation experience.
        </h2>
        <p :class="['mt-4 max-w-md', themeTokens.typography.body, themeTokens.color.whiteSoft]">
          Use any email and password. Login always succeeds as long as both fields are filled.
        </p>

        <div
          :class="[
            'mt-8 flex flex-col gap-4 border border-white/10 bg-white/5 p-4 sm:mt-10 sm:flex-row sm:items-center',
            themeTokens.radius.lg,
          ]"
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile preview"
            :class="['h-14 w-14 object-cover ring-2 ring-white/20', themeTokens.radius.pill]"
          />
          <div>
            <p :class="[themeTokens.typography.caption, themeTokens.color.whiteMuted]">
              Example user
            </p>
            <p class="text-lg font-medium">Chris Evans</p>
          </div>
        </div>
      </div>

      <Card class="self-center">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password to continue.</CardDescription>
        </CardHeader>
        <CardContent :class="themeTokens.spacing.sectionGap">
          <div :class="themeTokens.spacing.fieldStack">
            <label :class="themeTokens.typography.label">Email</label>
            <Input v-model="email" type="email" placeholder="rizki_mustafiyanto@gmail.com" />
          </div>

          <div :class="themeTokens.spacing.fieldStack">
            <label :class="themeTokens.typography.label">Password</label>
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
