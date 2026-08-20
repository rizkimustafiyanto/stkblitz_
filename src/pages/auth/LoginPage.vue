<script setup lang="ts">
import { computed, ref } from 'vue'

import AuthLayout from '@/app/providers/AuthLayout.vue'
import { themeTokens } from '@/shared/constants'

import Button from '@/shared/ui/button.vue'
import Card from '@/shared/ui/card.vue'
import CardContent from '@/shared/ui/card-content.vue'
import CardDescription from '@/shared/ui/card-description.vue'
import CardHeader from '@/shared/ui/card-header.vue'
import CardTitle from '@/shared/ui/card-title.vue'
import Input from '@/shared/ui/input.vue'

import { useAuth } from '@/composables/useAuth'
import { useSubmitGuard } from '@/composables/useSubmitGuard'

const email = ref('')
const password = ref('')

const { loading, wrap } = useSubmitGuard()
const { login, errors } = useAuth()

const canSubmit = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0 && !loading.value
})

const onSubmit = async () => {
  if (!canSubmit.value) {
    return
  }

  await wrap(() =>
    login({
      email: email.value.trim(),
      password: password.value,
    }),
  )
}
</script>

<template>
  <AuthLayout>
    <section
      :class="[
        'mx-auto flex w-full min-w-0 flex-1 flex-col justify-center',
        themeTokens.layout.contentWidth,
        'gap-5 sm:gap-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8',
      ]"
    >
      <div
        :class="[
          'w-full min-w-0 border border-border bg-gradient-to-br from-primary via-slate-900 to-slate-800 text-white',
          themeTokens.radius.xl,
          'p-5 sm:p-7 lg:p-8',
          themeTokens.shadow.strong,
        ]"
      >
        <p :class="[themeTokens.typography.overline, themeTokens.color.whiteMuted]">
          stkblitz chat
        </p>

        <h2
          :class="[
            'mt-3 max-w-xl',
            'text-2xl font-bold leading-tight sm:mt-5 sm:text-3xl lg:text-4xl',
          ]"
        >
          Sign in to continue the conversation experience.
        </h2>

        <p
          :class="[
            'mt-3 max-w-lg',
            'text-sm leading-6 sm:mt-4 sm:text-base',
            themeTokens.color.whiteSoft,
          ]"
        >
          Use any email and password. Login always succeeds as long as both fields are filled.
        </p>

        <div
          :class="[
            'mt-5 flex items-center gap-3 border border-white/10 bg-white/5 p-3 sm:mt-8 sm:gap-4 sm:p-4',
            themeTokens.radius.lg,
          ]"
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile preview"
            :class="[
              'h-11 w-11 shrink-0 object-cover sm:h-14 sm:w-14',
              'ring-2 ring-white/20',
              themeTokens.radius.pill,
            ]"
          />

          <div class="min-w-0">
            <p :class="[themeTokens.typography.caption, themeTokens.color.whiteMuted]">
              Example user
            </p>

            <p class="truncate text-sm font-semibold sm:text-lg">Rizki Mustfiyanto</p>
          </div>
        </div>
      </div>

      <Card class="w-full min-w-0 max-w-md self-center lg:justify-self-end">
        <CardHeader class="space-y-1.5">
          <CardTitle>Login</CardTitle>

          <CardDescription> Enter your email and password to continue. </CardDescription>
        </CardHeader>

        <form @submit.prevent="onSubmit">
          <CardContent :class="[themeTokens.spacing.sectionGap, 'pt-2 sm:pt-3']">
            <div :class="themeTokens.spacing.fieldStack">
              <label for="email" :class="themeTokens.typography.label"> Email </label>
              <Input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="rizki.mustafiyanto@gmail.com"
                :disabled="loading"
                :aria-invalid="Boolean(errors.email)"
                :aria-describedby="errors.email ? 'email-error' : undefined"
              />
              <p v-if="errors.email" id="email-error" :class="themeTokens.components.p.error">
                {{ errors.email }}
              </p>
            </div>

            <div :class="themeTokens.spacing.fieldStack">
              <label for="password" :class="themeTokens.typography.label"> Password </label>
              <Input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                placeholder="••••••••"
                show-password-toggle
                :disabled="loading"
                :aria-invalid="Boolean(errors.password)"
                :aria-describedby="errors.password ? 'password-error' : undefined"
              />
              <p v-if="errors.password" id="password-error" :class="themeTokens.components.p.error">
                {{ errors.password }}
              </p>
            </div>

            <Button type="submit" class="w-full" :disabled="!canSubmit">
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </Button>
          </CardContent>
        </form>
      </Card>
    </section>
  </AuthLayout>
</template>
