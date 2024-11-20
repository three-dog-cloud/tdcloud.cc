import { ConsoleLayoutSymbol } from '@/layout/console/route'
import { defineRoute } from '@/router/typeing'

export default defineRoute({
    parent: ConsoleLayoutSymbol,
    path: '/shopping',
    name: 'ShoppingPage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: false,
        title: '商城',
        icon: 'material-symbols:shopping-bag',
    }
})
