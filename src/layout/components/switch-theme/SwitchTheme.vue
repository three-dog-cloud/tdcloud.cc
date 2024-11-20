<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useColorMode } from '@vueuse/core'

defineOptions({
  name: 'SwitchTheme'
})

const mode = useColorMode()

const toggleTheme = (val: string | string[]) => {
  if (val && typeof val === 'string') {
    useColorMode({ initialValue: val })
    mode.value = val as 'light' | 'auto' | 'dark'
  }
}
</script>

<template>
  <ToggleGroup
    type="single"
    :defaultValue="mode"
    :value="['light', 'auto', 'dark']"
    @update:modelValue="toggleTheme"
    class="bg-gray-200 dark:bg-gray-700 flex items-center justify-center gap-1 w-fit rounded-full border p-0.5 *:rounded-full"
    size="sm"
  >
    <ToggleGroupItem
      v-for="item in ['light', 'auto', 'dark']"
      :key="item"
      :value="item"
      :aria-label="`Toggle ${item}`"
      class="rounded-full p-1 data-[state=on]:bg-white dark:data-[state=on]:bg-gray-600"
    >
      <icon-radix-icons:sun
        v-if="item === 'light'"
        class="size-5 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent h-8 px-1 w-8"
      />
      <icon-radix-icons:laptop
        v-else-if="item === 'auto'"
        class="size-5 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent h-8 px-1 w-8"
      />
      <icon-radix-icons:moon
        v-else
        class="size-5 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent h-8 px-1 w-8"
      />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
