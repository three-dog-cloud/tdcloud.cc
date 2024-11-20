<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

const dropdownOpen = ref(false)
const changeOpen = (value: boolean) => {
  dropdownOpen.value = value
}
</script>

<template>
  <DropdownMenu v-model:open="dropdownOpen" @update:open="changeOpen">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <icon-mdi:dots-horizontal class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuLabel>操作</DropdownMenuLabel>
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
