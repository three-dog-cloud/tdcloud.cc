<script setup lang="ts">
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { AlertDialogProps, AlertDialogNodeType } from './types'

defineOptions({
  name: 'AlertDialogPage'
})

const props = withDefaults(defineProps<AlertDialogProps<AlertDialogNodeType>>(), {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  isShowConfirm: false,
  isShowCancel: true,

  title: 'Title'
})

const emits = defineEmits<{
  'update:open': [value: boolean]
  'update:close': [value: boolean]
}>()
</script>

<template>
  <Dialog @update:open="(value) => emits('update:open', value)" :open="props.open">
    <DialogTrigger>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogScrollContent :class="props.class">
      <DialogHeader>
        <DialogTitle>
          {{ props.title }}
        </DialogTitle>
        <DialogDescription v-if="props.description">
          {{ props.description }}
        </DialogDescription>
      </DialogHeader>

      <slot name="content" clas />

      <DialogFooter v-if="props.isShowCancel || props.isShowConfirm">
        <template v-if="props.isShowCancel">
          <DialogClose as="Button">
            <Button>
              {{ props.cancelText }}
            </Button>
          </DialogClose>
        </template>
        <template v-if="props.isShowConfirm">
          <slot name="">
            <Button
              @click="
                () => {
                  emits('update:close', false)
                }
              "
            >
              {{ props.confirmText }}
            </Button>
          </slot>
        </template>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>
