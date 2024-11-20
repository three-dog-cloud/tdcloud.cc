export namespace ShoppingTypes {
    export interface WholesalePriceCnf {
        buy_number: number
        price: number
    }

    export interface OtherIpuCnf {
        key: string
        label: string
        isRequired: boolean
        status?: string
    }
}