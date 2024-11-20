<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Icon } from '@iconify/vue'
import type { IRouter } from '@/layout/components/root'
import { Logo } from '@/layout/components/logo'
import { computed, ref } from 'vue'
import router from '@/router'
import { DISCOURSE_HOST, DOCS_HOST } from '@/config/client'

const routerName = computed(() => router.currentRoute.value.name)

defineOptions({
  name: 'RootHeader'
})

const props = withDefaults(
  defineProps<{
    isLogin: boolean
    routerMaps: Array<IRouter>
  }>(),
  {
    isLogin: false,
    routerMaps: () => []
  }
)

const routerMaps = computed(() => props.routerMaps)
const isLogin = computed(() => props.isLogin)

const navRouterMaps: IRouter[] = [
  {
    title: '导航',
    icon: 'mdi:navigation-variant-outline',
    type: 'menu'
  },
  {
    title: '论坛',
    icon: 'bxl:discourse',
    path: DISCOURSE_HOST,
    type: 'link'
  },
  {
    title: '文档',
    icon: 'material-symbols:book-2',
    path: DOCS_HOST,
    type: 'link'
  }
]

const headerRouters = computed(() =>[
  routerMaps.value[0] ?? null,
  ...navRouterMaps,
  ...routerMaps.value.slice(1, routerMaps.value.length)
])

const emit = defineEmits<{
  logout: [] // logout event
}>()

const userLogout = () => {
  emit('logout')
}

const open = ref(false)
const setOpen = (value: boolean) => {
  open.value = value
}
</script>

<template>
  <header
    class="h-16 sticky top-0 z-50 flex w-full items-center justify-between border-b bg-muted/40 backdrop-blur-md lg:h-[60px] dark:bg-gray-700"
  >
    <div
      class="flex h-full w-full items-center mr-4 ml-4 sm:mr-6 sm:ml-6 md:mr-8 md:ml-8 lg:ml-12 lg:mr-12"
    >
      <Sheet @update:open="setOpen" :open="open">
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 lg:hidden bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <icon-mdi:menu class="size-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="flex flex-col">
          <ScrollArea class="h-full">
            <nav class="grid gap-2 text-sm font-medium mt-8">
              <div v-for="routerMap in headerRouters" :key="routerMap.path">
                <RouterLink
                  @click="setOpen(false)"
                  :to="{ name: routerMap.path }"
                  v-if="routerMap.type == 'router-link'"
                  class="flex items-center gap-4 rounded-xl px-4 py-2 hover:text-foreground"
                  :class="[
                    $route.name === routerMap.path ? 'bg-muted text-primary' : 'text-foreground'
                  ]"
                >
                  <Icon v-if="routerMap.icon" :icon="routerMap.icon" class="mr-2 size-5" />
                  {{ routerMap.title }}
                </RouterLink>

                <span v-if="routerMap.type == 'menu'" class="text-muted-foreground">
                  {{ routerMap.title }}
                </span>

                <template v-if="routerMap.type == 'button'">
                  <Separator class="my-1" />
                  <Button
                    variant="outline"
                    @click="
                      () => {
                        $router.push({ name: routerMap.path })
                        setOpen(false)
                      }
                    "
                    class="flex items-center gap-2 text-lg font-semibold hover:text-foreground hover:bg-transparent w-full mt-2"
                  >
                    {{ routerMap.title }}
                  </Button>
                </template>

                <template v-if="routerMap.type == 'link'">
                  <a
                    :href="routerMap.path"
                    target="_blank"
                    class="text-foreground flex items-center gap-4 rounded-xl px-4 py-2 hover:text-foreground"
                  >
                    <Icon v-if="routerMap.icon" :icon="routerMap.icon" class="mr-2 size-5" />
                    {{ routerMap.title }}
                  </a>
                </template>
              </div>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div class="flex flex-1 justify-center lg:justify-start">
        <Logo />
      </div>

      <div
        class="hidden lg:flex flex-1 items-center gap-4 justify-center absolute left-1/2 transform -translate-x-1/2"
      >
        <NavigationMenu>
          <NavigationMenuList class="space-x-4">
            <NavigationMenuItem
              v-for="navRouterMap in navRouterMaps.filter((item) => item.type === 'link')"
              :key="navRouterMap.title"
            >
              <a
                :href="navRouterMap.path"
                target="_blank"
                class="flex items-center gap-1 rounded-xl"
              >
                <Icon v-if="navRouterMap.icon" :icon="navRouterMap.icon" class="size-5" />
                <span>{{ navRouterMap.title }}</span>
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div class="justify-end flex items-center">
        <slot name="right">
          <template v-if="isLogin">
            <slot name="login">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" class="rounded-full border">
                    <icon-mdi:user class="size-5" />
                    <span class="sr-only">Toggle User Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    v-for="routerMap in routerMaps.filter(
                      (item, key) =>
                        (key == 0 || item.type === 'button') && routerName !== item.path
                    )"
                    :key="routerMap.path"
                    @click="
                      () => {
                        $router.push({ name: routerMap.path })
                      }
                    "
                  >
                    <Icon v-if="routerMap.icon" :icon="routerMap.icon" class="mr-2 size-5" />
                    <span>{{ routerMap.title }}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator class="my-1" />
                  <DropdownMenuItem @click="userLogout">
                    <icon-lets-icons:sign-out class="mr-2 size-5" /> {{ $t('logout.text') }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </slot>
          </template>

          <template v-else>
            <slot name="not-login">
              <RouterLink to="/login">
                <Button>{{ $t('login.text') }}</Button>
              </RouterLink>
            </slot>
          </template>
        </slot>
      </div>
    </div>
  </header>
</template>
