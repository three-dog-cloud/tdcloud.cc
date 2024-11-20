<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { nextTick, ref, computed } from 'vue'
import type { IErrorResponse } from '@/api/error'
import { useSystemStore, useTokenStore } from '@/stores'
import { nAlertMessage, message } from '@/naive'
import { $t } from '@/locales'
import { User, OAuth } from '@/api/personal'
import { toast } from 'vue-sonner'

const systemStore = useSystemStore()
const router = useRouter()

function handleSubmit() {
  User.requestLogin(params.value)
    .then((res) => {
      message.success($t('login.success'))

      nextTick(() => {
        const tokenStore = useTokenStore()
        tokenStore.setToken(res.token, res.token_timeout)
        tokenStore.setRefreshToken(res.refresh_token, res.refresh_token_timeout)

        router.push({ name: 'HomePage' })
      })
    })
    .catch((err: IErrorResponse) => {
      nAlertMessage(err.error, $t('error.code') + err.code)
      params.value.password = ''
    })
}

function toRegister() {
  router.push({ name: 'RegisterPage' })
}

// 定义第三方登录图标
const thirdPartyIcons = [
  { icon: 'logos:discourse-icon', name: 'Discourse', show: systemStore.config?.discourse },
  { icon: 'logos:github-icon', name: 'Github', show: systemStore.config?.github },
  { icon: 'logos:google-icon', name: 'Google', show: systemStore.config?.google },
  { icon: 'logos:telegram', name: 'Telegram', show: systemStore.config?.telegram }
]

const isThirdPartyLogin = computed(() => thirdPartyIcons.some((item) => item.show))

const params = ref<User.LoginParams>({
  username: '',
  password: ''
})

const OAuthLoginTimer = ref<number | null>(null)
const accountLogin = (platform: string) => {
  OAuth.getLoginAccountOAuthURL(platform)
    .then((res) => {
      // OAuthLoginTimer.value = setInterval(() => {
      //   if (userTKStore.isLogin) {
      //     if (OAuthLoginTimer.value !== null) {
      //       clearInterval(OAuthLoginTimer.value)
      //       OAuthLoginTimer.value = null
      //     }

      //     nextTick(() => {
      //       setTimeout(() => {
      //         window.location.reload()
      //       }, 3000)
      //       router.push({ name: 'HomePage' })
      //     })
      //   }
      // }, 3000)
      window.location.replace(res.redirect)
    })
    .catch((err: IErrorResponse) => {
      toast.error(err.error)
    })
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-145px)] px-4"
  >
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl text-center"> 登录 </CardTitle>
        <CardDescription class="text-center" v-if="isThirdPartyLogin">
          请选择登录方式或输入您的账户信息
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <!-- 第三方登录图标 -->
          <div class="flex justify-center" v-if="isThirdPartyLogin">
            <div class="flex flex-wrap justify-center gap-2 max-w-[250px]">
              <Button
                v-for="item in thirdPartyIcons"
                :key="item.name"
                variant="outline"
                size="icon"
                class="w-10 h-10 dark:bg-gray-500"
                :title="item.name"
                v-show="item.show"
                @click="accountLogin(item.name.toLowerCase())"
              >
                <Icon :icon="item.icon" class="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase" v-if="isThirdPartyLogin">
              <span class="bg-background px-2 text-muted-foreground">或</span>
            </div>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <Label for="account">账户</Label>
                <Input
                  type="text"
                  placeholder="请输入账户"
                  name="account"
                  v-model="params.username"
                  required
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center justify-between">
                  <Label for="password">密码</Label>
                  <!-- <Button variant="link" class="px-0 h-auto">忘记密码?</Button> -->
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="请输入密码"
                  v-model="params.password"
                  required
                />
              </div>
              <Button type="submit" class="w-full" :disabled="OAuthLoginTimer !== null">
                登录
              </Button>
            </div>
          </form>

          <div class="text-center text-sm" v-if="systemStore.config?.register">
            还没有账户?
            <Button variant="link" class="px-0 h-auto" @click="toRegister">注册</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
