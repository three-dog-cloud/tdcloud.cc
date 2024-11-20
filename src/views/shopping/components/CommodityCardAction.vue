<script setup lang="ts">
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import type { Commodity } from '@/api/shopping'
import { formatCoinTranslation } from '@/lib'

const { commodity } = defineProps<{
  commodity: Commodity.ICommodityResponse
}>()
</script>

<template>
  <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white flex">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger class="flex flex-row items-center">
          <span class="line-through">
            <component :is="formatCoinTranslation(commodity.actual_price)" />
          </span>
          /
          <component :is="formatCoinTranslation(commodity.retail_price)" />
        </TooltipTrigger>
        <TooltipContent class="text-lg">
          {{
            $t('shopping.discounted.original_cost') +
            commodity.actual_price.toLocaleString() +
            $t('console.wallet_card.unit')
          }},
          {{
            $t('shopping.discounted.sell_price') +
            commodity.retail_price.toLocaleString() +
            $t('console.wallet_card.unit')
          }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </p>

  <slot />
</template>
