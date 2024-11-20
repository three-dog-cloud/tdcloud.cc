import { defineRoute } from '@/router/typeing'

export default defineRoute({
    path: '/oauth/:platform/:func',
    name: 'ResultOAuthPage',
    component: () => import('./IndexPage.vue'),
    meta: {
        ignoreAuth: true,
        title: '关联账号',
    }
})
