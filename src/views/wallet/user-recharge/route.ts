import { ConsoleLayoutSymbol } from '@/layout/console/route'
import { defineRoute } from '@/router/typeing'

export default defineRoute({
    parent: ConsoleLayoutSymbol,
    path: '/wallet/top-up',
    name: 'UserWalletTopUpPage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: false,
        title: '在线充值',
        icon: 'material-symbols:add-card-outline',
    }
})
