<script setup lang="ts">
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from '@/components/ui/tooltip'
import { formatCoinTranslation } from '@/lib'
defineOptions({
  name: 'MoneyComponent'
})

const { money } = defineProps({
  money: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot name="trigger">
          <component :is="formatCoinTranslation(money)" />
        </slot>
      </TooltipTrigger>
      <TooltipContent class="text-lg z-99999999">
        <slot name="content">
          {{ money.toLocaleString() + $t('console.wallet_card.unit') }}
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
