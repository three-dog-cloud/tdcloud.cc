import request from "../request"

export namespace Wallet {
    export interface IWalletResponse {
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

    export function getWallet(): Promise<IWalletResponse> {
        return request({
            url: "/account/wallet",
            method: "get"
        })
    }

    export function useWalletCode(code: string): Promise<IWalletResponse> {
        return request({
            url: `/account/wallet/use/${code}`,
            method: "post",
        })
    }
}