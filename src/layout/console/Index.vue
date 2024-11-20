<script setup lang="ts">
import router from '@/router'
import type { IRouter } from '@/layout/components/root'
import { RootLayout } from '@/layout/components/root'
import { computed, h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { type MenuOption } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useUserStore, useWalletStore } from '@/stores/personal'
import { nAlertMessage } from '@/naive'
import { toast } from 'vue-sonner'
import type { IErrorResponse } from '@/api/error'
import { $t } from '@/locales'
import { Wallet } from '@/api/personal'
import { Input } from '@/components/ui/input'
import { watchEffect } from 'vue'
import { useProviderStore } from '@/stores'
import { loadingBar } from '@/naive'

defineOptions({
  name: 'ConsoleLayout'
})

const uStore = useUserStore()
const walletStore = useWalletStore()
const providerStore = useProviderStore()

async function init() {
  await uStore.initUserInfo()
  await walletStore.initWallet()

  providerStore.setLoadingBar(loadingBar)
}

init()

const routerMaps = computed<IRouter[]>(() => [
  {
    title: '主页',
    path: 'HomePage',
    icon: 'material-symbols:home-rounded',
    type: 'router-link'
  },
  {
    title: '控制台',
    path: 'ConsolePage',
    icon: 'material-symbols:home',
    type: 'menu'
  },
  {
    title: '仪表盘',
    path: 'DashboardPage',
    icon: 'mage:dashboard-bar-fill',
    type: 'router-link'
  },
  {
    title: '商城',
    path: 'ShoppingPage',
    icon: 'material-symbols:shopping-bag-sharp',
    type: 'router-link'
  },
  {
    title: '财务中心',
    path: 'FinanceMenu',
    icon: 'material-symbols:account-balance-wallet-outline',
    type: 'menu'
  },
  {
    title: '在线充值',
    path: 'UserWalletTopUpPage',
    icon: 'material-symbols:add-card-outline',
    type: 'router-link'
  },
  {
    title: '我的订单',
    path: 'OrderUserPage',
    icon: 'material-symbols:assignment-outline-rounded',
    type: 'router-link'
  },
  {
    title: '设置',
    path: 'SettingMenu',
    icon: 'material-symbols:account-circle',
    type: 'menu'
  },
  {
    title: '个人中心',
    path: 'ProfilePage',
    icon: 'material-symbols:settings-account-box-outline',
    type: 'router-link'
  }
])

const renderIcon = (icon: string) => {
  return () => h(Icon, { icon: icon, class: 'size-5' })
}

const renderMenu = (title: string) => {
  return () => h('span', { class: 'text-muted-forground' }, title)
}

const renderLink = (routeName: string, title: string) => {
  if (router.hasRoute(routeName)) {
    return () =>
      h(
        RouterLink,
        {
          to: { name: routeName },
          class: 'flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:text-primary'
        },
        { default: () => title }
      )
  }
}

const activeMenu = ref<string>()

watchEffect(() => {
  activeMenu.value = router.currentRoute.value.name?.toString()
})

const menus: MenuOption[] = []

routerMaps.value.slice(1).forEach((item) => {
  let mo: any = {
    type: item.type == 'menu' ? 'group' : 'item',
    title:
      item.type != 'menu' && item.path ? renderLink(item.path, item.title) : renderMenu(item.title),
    name: item.path || item.title,
    icon: item.icon ? renderIcon(item.icon) : () => null
  }

  if (mo.type != 'group') {
    let obj = menus.pop()
    if (obj && obj.children) {
      obj.children.push(mo)
      menus.push(obj)
      return
    }
  }

  menus.push({
    children: [],
    ...mo
  })
})

// ------------------ redemption code incident ------------------
const redemptionCode = ref<string>('')
const redemptionCodeIncident = () => {
  if (redemptionCode.value.length != 26) {
    nAlertMessage($t('console.redemption_code_card.fotmat_error'))
    return
  }

  Wallet.useWalletCode(redemptionCode.value)
    .then((res) => {
      toast.success('兑换成功')
      redemptionCode.value = ''
      walletStore.setWallet(res)
    })
    .catch((err: IErrorResponse) => {
      nAlertMessage(err.error, $t('error.code') + err.code)
    })
}
</script>

<template>
  <RootLayout :routerMaps="routerMaps">
    <template #content>
      <div class="flex w-full flex-wrap-reverse gap-6 align-top md:flex-nowrap">
        <nav
          class="sticky top-[84px] hidden h-96 w-52 shrink-0 flex-col gap-2 text-muted-foreground lg:flex"
        >
          <n-menu
            :accordion="true"
            :options="menus"
            key-field="name"
            label-field="title"
            v-model:value="activeMenu"
          />
        </nav>
        <div
          class="min-h-[calc(100dvh-162px-env(safe-area-inset-top))] w-full flex-auto gap-6 py-4 md:py-6"
        >
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
        <div
          class="top-[84px] mt-4 grid size-full md:max-w-48 min-w-48 shrink-0 grid-cols-2 gap-2 md:sticky md:w-auto md:grid-cols-1 md:flex-col md:w-52 lg:justify-end"
        >
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                {{ $t('console.wallet_card.title') }}
              </CardTitle>
              <Button
                variant="link"
                class="p-0"
                @click="$router.push({ name: 'UserWalletTopUpPage' })"
              >
                {{ $t('console.wallet_card.button') }}
              </Button>
            </CardHeader>
            <CardContent class="text-2xl md:text-xl">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger class="flex flex-row">
                    <component
                      v-for="(item, index) in walletStore.getBalanceElements"
                      :key="index"
                      :is="item"
                    />
                  </TooltipTrigger>
                  <TooltipContent class="text-lg font-semibold">
                    {{ walletStore.getBalance.toLocaleString() + $t('console.wallet_card.unit') }}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                {{ $t('console.redemption_code_card.title') }}
              </CardTitle>
              <Button variant="link" class="p-0" @click="redemptionCodeIncident">
                {{ $t('console.redemption_code_card.button') }}
              </Button>
            </CardHeader>
            <CardContent class="text-2xl md:text-xl">
              <Input
                type="text"
                v-model="redemptionCode"
                :placeholder="$t('console.redemption_code_card.placeholder')"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </template>
  </RootLayout>
</template>
