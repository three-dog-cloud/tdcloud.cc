export type RouterType = 'button' | 'link' | 'router-link' | 'menu'
export interface IRouter {
    title: string
    type: RouterType
    icon?: string
    path?: string
}

export { default as RootHeader } from './Header.vue'
export { default as RootFooter } from './Footer.vue'
export { default as RootLayout } from './Layout.vue'