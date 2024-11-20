import { createRouter, createWebHistory, type RouteRecordNameGeneric, type RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw } from './typeing'
import { useProviderStore, useTokenStore } from '@/stores'
import { nAlertMessage } from '@/naive'
import { $t } from '@/locales'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

const routeModules = import.meta.glob('@/**/route.ts', { import: 'default', eager: true })

const layoutMap = new Map<Symbol, AppRouteRecordRaw[]>()

const handleRoute = (route: AppRouteRecordRaw) => {
  if (route.parent) {
    const parent = layoutMap.get(route.parent)
    if (parent) {
      parent.push(route)
      layoutMap.set(route.parent, parent)
    } else {
      layoutMap.set(route.parent, [route])
    }
  } else {
    router.addRoute(route as RouteRecordRaw)
  }
}

for (const ModulePath in routeModules) {
  const module = routeModules[ModulePath]
  if (module instanceof Array) {
    module.forEach((subPath: AppRouteRecordRaw) => {
      handleRoute(subPath)
    })
  } else {
    handleRoute(module as AppRouteRecordRaw)
  }

  layoutMap.forEach((routes, parent) => {
    const parentRoute = router.getRoutes().find((route) => route.name === parent.description)
    if (parentRoute) {
      parentRoute.children = routes
      router.removeRoute(parent.description!)
      router.addRoute(parentRoute)
    }
  })
}

const AuthorRouter: Array<RouteRecordNameGeneric> = [
  "LoginPage"
]

router.beforeEach((to) => {
  useProviderStore().loadingBar?.start()
  if (!to.meta) {
    return true
  }

  if (AuthorRouter.includes(to.name) && useTokenStore().isLogin) {
    nAlertMessage($t('error.isLogin'), "Warning", "warning")
    return false
  }

  return true
})

router.afterEach(() => {
  useProviderStore().loadingBar?.finish()
})


export default router
