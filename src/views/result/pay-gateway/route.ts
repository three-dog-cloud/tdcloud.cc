import { defineRoute } from '@/router/typeing'

export default defineRoute({
    path: '/pay/callback/gateway',
    name: 'ResultPayGatewayPage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: true,
        title: '支付回调确认',
    }
})
