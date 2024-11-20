import { h, type VNode } from "vue"
import { Icon } from '@iconify/vue'

export function formatCoin(value: number) {
    return h('div', {}, [
        h('span', { class: 'text-color-dark dark:text-color-white' }, value.toLocaleString()),
        h(Icon, { icon: 'ri:copper-coin-fill', class: 'color-yellow-900 size-4 inline-block!', alt: `${value.toLocaleString()}铜币` })
    ])
}

export function formatCoinTranslation(value: number): VNode {
    const coinArr = []
    const g = Math.floor(value / 10000)
    if (g) {
        coinArr.push(h('div', { class: 'flex items-center' }, [
            h('span', { class: 'text-color-dark dark:text-color-white' }, g.toLocaleString()),
            h(Icon, { icon: 'ri:copper-coin-fill', class: 'color-yellow-300 size-4 inline-block!', alt: `${g.toLocaleString()}金币` })
        ]))
    }

    const s = Math.floor((value % 10000) / 100)
    if (s) {
        coinArr.push(h('div', { class: 'flex items-center' }, [
            h('span', { class: 'text-color-dark dark:text-color-white' }, s.toLocaleString()),
            h(Icon, { icon: 'ri:copper-coin-fill', class: 'color-gray-300 size-4 inline-block!', alt: `${s.toLocaleString()}银币` })
        ]))
    }

    const c = value % 100
    if (c) {
        coinArr.push(h('div', { class: 'flex items-center' }, [
            h('span', { class: 'text-color-dark dark:text-color-white' }, c.toLocaleString()),
            h(Icon, { icon: 'ri:copper-coin-fill', class: 'color-yellow-900 size-4 inline-block!', alt: `${c.toLocaleString()}铜币` })
        ]))
    }

    return h('div', { class: 'flex items-center justify-center' }, coinArr)
}