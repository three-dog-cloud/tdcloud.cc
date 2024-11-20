<script setup lang="ts">
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { Toaster } from '@/components/ui/sonner'
import { RootHeader, RootFooter } from '@/layout/components/root'
import type { IRouter } from '@/layout/components/root'
import router from '@/router'
import { useTokenStore } from '@/stores'
import { computed } from 'vue'

defineOptions({
  name: 'RootLayout'
})

const props = withDefaults(
  defineProps<{
    routerMaps: IRouter[]
  }>(),
  {
    routerMaps: () => []
  }
)

const routerMaps = computed(() => props.routerMaps)
const tkStore = useTokenStore()
const isLogin = computed(() => tkStore.isLogin)

const logout = () => {
  tkStore.clearAllTokens()
  router.push('/login')
}

const position = computed(() => {
  return window.innerWidth > 768 ? 'bottom-right' : 'top-right'
})
</script>
<template>
  <ScrollArea :class="['h-dvh', 'max-h-screen', 'w-dvw', 'max-w-full']">
    <RootHeader
      v-model:router-maps.lazy="routerMaps"
      v-model:is-login.lazy="isLogin"
      v-on:logout="logout"
    />
    <main
      class="relative min-h-[calc(100dvh-162px-env(safe-area-inset-top))] mr-4 ml-4 sm:mr-6 sm:ml-6 md:mr-8 md:ml-8 lg:ml-12 lg-mr-12"
    >
      <slot name="content" />
    </main>
    <RootFooter />
    <Toaster :close-button="true" :rich-colors="true" dir="auto" :gap="3" :position="position" />
  </ScrollArea>
</template>
