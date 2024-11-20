import { defineRoute } from '@/router/typeing'

export default defineRoute({
    path: '/',
    name: 'HomeLayout',
    component: () => import('./Index.vue'),
    redirect: { path: '/' },
    meta: {
        ignoreAuth: true,
        isAnchored: true,
        title: '主页',
        icon: 'material-symbols:home-rounded'
    },
    children: []
})

export const HomeLayoutSymbol = Symbol('HomeLayout')
