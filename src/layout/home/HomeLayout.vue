<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/layout/components/nav/NavBar.vue'
import { ref } from 'vue'
import Footer from '@/layout/components/root/Footer.vue'
import NavigationItems from '@/layout/components/nav/NavigationItems.vue'
import MobileDrawer from '@/layout/components/mobile/MobileDrawer.vue'
import router from '@/router'
import { useTokenStore } from '@/stores'
import { Button } from '@/components/ui/button'

const tokenStore = useTokenStore()

const showDrawer = ref(false)

function toLogin() {
  if (tokenStore.isLogin) {
    router.push({ name: 'DashboardPage' })
  } else {
    router.push({ name: 'LoginPage' })
  }

  if (showDrawer.value) {
    showDrawer.value = false
  }
}
</script>

<template>
  <n-layout class="min-h-screen flex flex-col">
    <n-layout-header
      class="h-16 w-full bg-coolgray-50 dark:bg-gray-800 top-0 z-50 bg-muted/40 backdrop-blur-md lg:h-[60px] fixed"
    >
      <NavBar>
        <template #center>
          <NavigationItems class="hidden sm:flex" />
        </template>

        <template #right>
          <div class="hidden sm:block">
            <Button @click="toLogin">{{ tokenStore.isLogin ? '控制台' : '登录' }}</Button>
          </div>
          <Button class="sm:hidden" @click="showDrawer = true">菜单</Button>
        </template>
      </NavBar>
    </n-layout-header>

    <MobileDrawer v-model:show="showDrawer" @jumpToPage="toLogin" />

    <n-layout-content class="flex-grow pt-16 lg:pt-[60px]">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-layout-content>

    <n-layout-footer class="mt-auto">
      <Footer />
    </n-layout-footer>
  </n-layout>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
