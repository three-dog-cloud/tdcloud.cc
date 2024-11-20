<script setup lang="ts">
import {
  Dialog,
  DialogHeader,
  DialogScrollContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const { open, title } = defineProps<{
  open: boolean
  title: string
}>()

console.log(open)

const emits = defineEmits<{
  'update:open': [boolean]
}>()
</script>

<template>
  <Dialog @update:open="(value) => emits('update:open', value)" :open="open">
    <DialogTrigger as-child>
      <Button>详情</Button>
    </DialogTrigger>
    <DialogContent
      :class="[
        'min-h-[100vh]!',
        'min-w-full!',
        'my-0',
        'mx-0',
        'md:w-180!',
        'md:h-140!',
        'md:min-h-auto!',
        'md:min-w-auto!',
        'lg:w-240!',
        'max-w-full!'
      ]"
    >
      <DialogHeader class="flex justify-center">
        <DialogTitle> 商品详情 </DialogTitle>
        <DialogDescription>
          {{ title }}
        </DialogDescription>
      </DialogHeader>

      <slot />
    </DialogContent>
  </Dialog>
</template>
