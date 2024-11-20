import { HomeLayoutSymbol } from '@/layout/home/route'
import { defineRoute } from '@/router/typeing'

export default defineRoute({
    parent: HomeLayoutSymbol,
    path: '/login',
    name: 'LoginPage',
    component: () => import('./LoginPage.vue'),
    meta: {
        ignoreAuth: true,
        title: '登录'
    }
})
