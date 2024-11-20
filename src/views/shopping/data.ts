import type { IErrorResponse } from "@/api"
import { Order, Payment } from "@/api/order"
import { Commodity, type ShoppingTypes } from "@/api/shopping"
import type { Pagination } from "@/types"
import { computed, ref, watch, watchEffect, type Ref } from "vue"
import { toast } from "vue-sonner"

export default (params: Ref<Commodity.ICommodityParams>) => {
    const loading = ref(false)
    const total = ref(params.value.limit)
    const data = ref<Commodity.ICommodityResponse[]>([])
    const noMore = computed(() => {
        return data.value.length >= total.value
    })

    const requestParams = computed(() => {
        return {
            ...params.value
        }
    })

    watchEffect(() => {
        loading.value = true
        Commodity.searchCommodityList(requestParams.value)
            .then((res: Pagination<Commodity.ICommodityResponse, null>) => {
                if (total.value != res.total) {
                    total.value = res.total
                }

                if (Array.isArray(res.items) && res.items.length > 0) {
                    data.value.push(...res.items)
                }
            })
            .catch((err: IErrorResponse) => {
                toast.error(err.error)
            })
            .finally(() => {
                loading.value = false
            })
    })

    return {
        loading,
        noMore,
        data,
    }
}

export const usePaymentService = () => {
    const paymentSignal = ref(false)
    const payments = ref<Payment.IPayOrderPayment[]>([])

    watchEffect(() => {
        if (paymentSignal.value) {
            paymentSignal.value = false
            Payment.getPayOrderPayment()
                .then((res) => {
                    payments.value = res
                })
                .catch((err: IErrorResponse) => {
                    toast.error(err.error)
                })
        }
    })

    return {
        paymentSignal,
        payments
    }
}

export interface ICommodityResponse
    extends Omit<Commodity.ICommodityDetailResponse, 'wholesale_price_cnf' | 'other_ipu_cnf'> {
    wholesale_price_cnf: Array<ShoppingTypes.WholesalePriceCnf>
    other_ipu_cnf: Array<ShoppingTypes.OtherIpuCnf>
}

export const useCommodityDetailService = (gd_no: string) => {
    const loading = ref(false)
    const commodityDetailsignal = ref(false)
    const product = ref<ICommodityResponse>()
    const formData = ref<Order.ICreateOrderParams>({
        gd_no: product?.value?.gd_no ?? gd_no,
        quantity: 1,
        other_ipu: {}
    })

    const validator = () => {
        if (product.value) {
            product.value.other_ipu_cnf.forEach((item) => {
                if (item.isRequired && !formData.value.other_ipu[item.key]) {
                    item.status = '请输入' + item.label
                } else {
                    item.status = ''
                }
            })
        }
    }

    watch(formData, validator)

    watchEffect(() => {
        if (commodityDetailsignal.value === true) {
            loading.value = true
            commodityDetailsignal.value = false
            Commodity.getCommodityDetail(gd_no)
                .then((res) => {
                    product.value = {
                        ...res,
                        wholesale_price_cnf: (res.wholesale_price_cnf || []).map((item: string) => {
                            const arr = item.split('=')
                            return {
                                buy_number: Number(arr[0]),
                                price: Number(arr[1])
                            }
                        }),
                        other_ipu_cnf: (res.other_ipu_cnf || []).map((item) => {
                            const arr = item.split('=')
                            return {
                                key: arr[0],
                                label: arr[1],
                                isRequired: arr[2] == 'true'
                            }
                        })
                    }
                })
                .catch((err) => {
                    toast.error(err.error)
                })
                .finally(() => {
                    loading.value = false
                })
        }
    })

    return {
        loading,
        commodityDetailsignal,
        product,
        formData,
        validator
    }
}