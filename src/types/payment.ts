export interface Payment {
    uuid: string
    name: string
    icon: string
    payment: string
    handling_fee_fixed: number
    handling_fee_percent: number
    handling_fee_percent_max: number
}