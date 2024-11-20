<template>
  <NConfigProvider
    :date-locale="dateZhCN"
    :locale="zhCN"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <NGlobalStyle />
    <NLoadingBarProvider>
      <NMessageProvider :max="3" keep-alive-on-hover closable>
        <NNotificationProvider>
          <NModalProvider>
            <NDialogProvider>
              <RouterView />
            </NDialogProvider>
          </NModalProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { dateZhCN, zhCN, lightTheme, darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { ref, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import {
  NMessageProvider,
  NLoadingBarProvider,
  NConfigProvider,
  NGlobalStyle,
  NNotificationProvider,
  NModalProvider,
  NDialogProvider
} from 'naive-ui'

defineOptions({ name: 'App' })
const mode = useColorMode()
const theme = ref<BuiltInGlobalTheme>(mode.value === 'dark' ? darkTheme : lightTheme)

const themeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '1rem',
    borderRadiusSmall: '1rem',
    scrollbarBorderRadius: '1rem'
  }
}

watchEffect(() => {
  if (mode.value == 'dark') {
    theme.value = darkTheme
  }

  if (mode.value == 'light') {
    theme.value = lightTheme
  }
})
</script>

<style scoped></style>
