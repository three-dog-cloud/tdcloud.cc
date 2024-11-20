<script setup lang="ts">
import { RootLayout, type IRouter } from '@/layout/components/root'
import { useTokenStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

defineOptions({
  name: 'HomeLayout'
})

const tkStore = computed(() => storeToRefs(useTokenStore()))

const routerMaps = computed<Array<IRouter>>(() => [
  {
    title: '主页',
    path: 'HomePage',
    icon: 'material-symbols:home-rounded',
    type: 'router-link'
  },
  tkStore.value.isLogin
    ? {
        title: '控制台',
        path: 'DashboardPage',
        icon: 'mage:dashboard-bar-fill',
        type: 'button'
      }
    : {
        title: '登录',
        path: 'LoginPage',
        icon: 'material-symbols:login-rounded',
        type: 'button'
      }
])
</script>

<template>
  <RootLayout v-model:routerMaps.lazy="routerMaps">
    <template #content>
      <router-view />
    </template>
  </RootLayout>
</template>
