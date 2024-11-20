<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useTokenStore } from '@/stores'

const token = useTokenStore()

defineProps<{
  show: boolean
}>()

defineEmits<{
  'update:show': [value: boolean]
  jumpToPage: []
}>()
</script>

<template>
  <n-drawer :show="show" @update:show="$emit('update:show', $event)" closable placement="left">
    <n-drawer-content>
      <nav class="grid gap-6 text-lg font-medium">
        <div @click="$router.push('/')" class="flex items-center justify-center cursor-pointer">
          <icon-logos:apidog-icon
            class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mr-2 transition-transform duration-300 hover:scale-110"
          />
          <span class="text-lg font-bold">三狗云</span>
        </div>
        <Separator class="my-1" />
        <a
          href="https://tdcloud.cc"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-foreground"
          >论坛</a
        >
        <a
          href="https://docs.tdcloud.cc"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground hover:text-foreground"
          >文档</a
        >
        <Separator class="my-1" />
        <Button
          variant="outline"
          @click="$emit('jumpToPage')"
          class="flex items-center gap-2 text-lg font-semibold hover:text-foreground hover:bg-transparent"
        >
          {{ token.isLogin ? '控制台' : '登录' }}
        </Button>
        <template v-if="token.isLogin">
          <Button
            variant="outline"
            @click="
              () => {
                token.clearAllTokens()
              }
            "
            class="flex items-center gap-2 text-lg font-semibold hover:text-foreground hover:bg-transparent"
          >
            {{ $t('logout.text') }}
          </Button>
        </template>
      </nav>
    </n-drawer-content>
  </n-drawer>
</template>
