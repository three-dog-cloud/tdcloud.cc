import { Wallet } from '@/api/personal/wallet'
import { defineStore } from "pinia"
import { Icon } from '@iconify/vue'
import { h, type VNodeTypes } from "vue"

export interface Wallet {
    user_no: string
    balance_no: string
    balance: number
    balance_format: {
        copper: number
        silver: number
        gold: number
    }
    is_passwd: boolean
}

export const useWalletStore = defineStore('personal-wallet', {
    state: () => ({
        wallet: {
            user_no: '',
            balance_no: '',
            balance: 0,
            balance_format: {
                copper: 0,
                silver: 0,
                gold: 0
            },
            is_passwd: false
        }
    }),
    getters: {
        getWallet(): Wallet {
            return this.wallet
        },
        getBalance(): number {
            return this.wallet.balance
        },
        getBalanceElements(): Array<VNodeTypes> {
            const balanceVNode = []
            if (this.wallet.balance_format.gold > 0) {
                balanceVNode.push(h('div', { class: 'text-color-primary dark:text-color-white' }, [
                    h('span', {}, this.wallet.balance_format.gold.toLocaleString()),
                    h(Icon, { icon: 'ri:copper-coin-fill', class: 'color-yellow-300 size-4 inline-block!', alt: `${this.wallet.balance_format.gold.toLocaleString()}金币` })
                ]))
            }

            if (this.wallet.balance_format.silver > 0) {
                balanceVNode.push(h('div', { class: 'text-color-primary dark:text-color-white' }, [
                    h('span', {}, this.wallet.balance_format.silver.toLocaleString()),
                    h(Icon, { icon: 'ri:copper-coin-fill', class: 'color-zinc-200 size-4 inline-block!', alt: `${this.wallet.balance_format.silver.toLocaleString()}银币` })
                ]))
            }

            if (this.wallet.balance_format.copper > 0) {
                balanceVNode.push(h('div', { class: 'text-color-primary dark:text-color-white' }, [
                    h('span', {}, this.wallet.balance_format.copper.toLocaleString()),
                    h(Icon, { icon: 'ri:copper-coin-fill', class: 'color-yellow-900 size-4 inline-block!', alt: `${this.wallet.balance_format.copper.toLocaleString()}铜币` })
                ]))
            }

            return balanceVNode
        }
    },
    actions: {
        async initWallet() {
            this.wallet = await Wallet.getWallet()
        },
        setWallet(wallet: Wallet) {
            this.wallet = wallet
        }
    }
})