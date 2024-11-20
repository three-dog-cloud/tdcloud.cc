<script setup lang="ts">
import { SwitchTheme } from '@/layout/components/switch-theme'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

defineOptions({ name: 'LayoutFooter' })

const links = [
  {
    icon: 'material-symbols:mail',
    href: 'mailto:support@tdcloud.cc'
  },
  {
    icon: 'mdi:github',
    href: 'https://github.com/three-dog-cloud'
  }
]
</script>

<template>
  <footer class="border-t">
    <div
      class="flex flex-col items-center justify-between gap-4 py-4 text-sm text-muted-foreground md:flex-row mr-4 ml-4 sm:mr-6 sm:ml-6 md:mr-8 md:ml-8 lg:ml-12 lg:mr-12"
    >
      <div class="flex flex-col items-center gap-4 md:items-start">
        <p>
          © 2024 All rights reserved
          <RouterLink to="/" class="text-primary">TD Cloud</RouterLink>
          .
        </p>
        <nav class="flex h-4 flex-wrap items-center">
          <n-button text v-for="(item, index) in links" :key="index" tag="a" :href="item.href">
            <n-divider vertical v-if="index !== 0" class="h-1" />
            <Icon :icon="item.icon" class="size-5" />
          </n-button>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <SwitchTheme />
      </div>
    </div>
  </footer>
</template>
