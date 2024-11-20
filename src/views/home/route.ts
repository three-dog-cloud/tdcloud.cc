import { HomeLayoutSymbol } from '@/layout/home/route'
import { defineRoute } from '@/router/typeing'

export default defineRoute({
  parent: HomeLayoutSymbol,
  path: '/',
  name: 'HomePage',
  component: () => import('./HomePage.vue'),
  meta: {
    ignoreAuth: true,
    isAnchored: true,
    title: '主页',
    icon: 'material-symbols:home-rounded'
  }
})
