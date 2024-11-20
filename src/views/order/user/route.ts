import { ConsoleLayoutSymbol } from '@/layout/console/route'
import { defineRoute } from '@/router/typeing'

export default defineRoute({
    parent: ConsoleLayoutSymbol,
    path: '/order/user',
    name: 'OrderUserPage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: false,
        title: '我的订单',
        icon: 'material-symbols:assignment-outline-rounded',
    }
})
