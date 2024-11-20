import { defineRoute } from '@/router/typeing'

export default defineRoute({
    path: '/console',
    name: 'ConsoleLayout',
    component: () => import('@/layout/console/Index.vue'),
    redirect: { path: '/console' },
    meta: {
        ignoreAuth: false,
        isAnchored: false,
        title: '控制台',
        icon: 'mdi:console',
    },
    children: []
})

export const ConsoleLayoutSymbol = Symbol('ConsoleLayout')
