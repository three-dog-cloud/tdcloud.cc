import { ConsoleLayoutSymbol } from '@/layout/console/route'
import { defineRoute } from '@/router/typeing'

export default defineRoute({
    parent: ConsoleLayoutSymbol,
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: false,
        title: '个人中心',
        icon: 'material-symbols:account-circle',
    }
})
