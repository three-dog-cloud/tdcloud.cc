<script setup lang="ts">
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { copyToClipboard } from '@/lib'
import { computed } from 'vue'

const { text, width = 8 } = defineProps({
  text: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 30
  }
})

const lgWidth = computed(() => {
  return width - 4
})

const smWidth = computed(() => {
  return width - 8
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot name="trigger">
          <div
            :class="[`w-${smWidth}`, `lg:w-${lgWidth}`, `xl:w-${width}`, 'flex items-center gap-4']"
          >
            <span
              class="text-ellipsis overflow-hidden"
              :class="[`w-${width / 2}`, `lg:w-${width}`]"
              >{{ text }}</span
            >
            <icon-material-symbols:content-copy-outline
              class="size-4 hover:text-gray-500 cursor-pointer"
              v-if="text.length > 0"
              @click="copyToClipboard(text)"
            />
          </div>
        </slot>
      </TooltipTrigger>
      <TooltipContent class="text-lg">
        <slot name="content">
          {{ text }}
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
