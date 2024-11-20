import { ConsoleLayoutSymbol } from '@/layout/console/route'
import { defineRoute } from '@/router/typeing'

export default defineRoute({
    parent: ConsoleLayoutSymbol,
    path: '/dashboard',
    name: 'DashboardPage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: false,
        title: '仪表盘',
        icon: 'mage:dashboard-bar-fill',
    }
})
