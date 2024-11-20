import { defineRoute } from '@/router/typeing'

export default defineRoute({
    path: '/wallet/pay',
    name: 'ResultWalletPayPage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: true,
        title: '关联账号',
    }
})
