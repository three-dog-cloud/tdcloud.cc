<script setup lang="ts">
import { $t } from '@/locales'
</script>
<template>
  <RouterLink to="/" class="flex items-center gap-2 text-lg font-semibold md:text-base md:ml-8">
    <icon-logos:apidog-icon class="h-6 w-6 md:h-8 md:w-8 size-12" alt="logo" />
    <span>{{ $t('page.server.title') }}</span>
  </RouterLink>
</template>
