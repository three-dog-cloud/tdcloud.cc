import type { ColumnDef, PaginationState } from '@tanstack/vue-table'
import { h, nextTick, ref, shallowRef, watchEffect } from 'vue'
import { TopUp } from '@/api/personal'
import { PayPayment, TopUpPayMoneyTooltip, TopUpRecordDetail } from '.'
import type { IErrorResponse, IResponse, Redirect } from '@/api'
import type { Pagination, PaginationSearchItem } from '@/types'
import { toast } from 'vue-sonner'
import { useWalletStore } from '@/stores/personal'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@iconify/vue'

export const totalResultCount = ref(-1)
export const totalResultCountTotal = ref(-1)

export const pagination = ref<PaginationState>({
    pageIndex: 0,
    pageSize: 10
})

export const loading = ref(false)

export const fetchData = (page: number, limit: number) => {
    loading.value = true
    TopUp.getTopUpHistory({ limit: limit, page: page })
        .then((res: Pagination<TopUp.TopUpHistory, PaginationSearchItem>) => {
            nextTick(() => {
                if (Array.isArray(res.items)) {
                    data.value = res.items
                }
                totalResultCount.value = Math.ceil(res.total / limit)
                totalResultCountTotal.value = res.total
                loading.value = false
            })
        })
        .catch((err: IErrorResponse) => {
            toast.error(err.error)
            loading.value = false
        })
}

export const setPagination = ({ pageIndex, pageSize }: PaginationState) => {
    pagination.value.pageIndex = pageIndex
    pagination.value.pageSize = pageSize
}

watchEffect(() => {
    fetchData(pagination.value.pageIndex + 1, pagination.value.pageSize)
})

const open = ref(false)
const setOpen = (value: boolean) => {
    open.value = value
}


const cancelRecord = (index: number) => {
    loading.value = true
    TopUp.cancelTopUp(data.value[index].number)
        .then((res: IResponse) => {
            const newData = [...data.value]

            newData[index].pay_status = 3
            newData[index].pay_status_label = '取消支付'

            data.value = newData

            loading.value = false
            open.value = false
            toast.success(res.message || '取消成功')
        })
        .catch((err: IErrorResponse) => {
            loading.value = false
            toast.error(err.error)
        })
}

const waitPayRecord = (index: number, trade_no: string, timeout: number = 3600, isCreate: boolean = false) => {
    toast.promise(
        () => new Promise<TopUp.CheckPayStatusResponse>((resolve, reject) => {
            const timeoutTimer = setInterval(() => {
                timeout -= 1
                if (timeout <= 0) {
                    clearInterval(timer)
                    clearInterval(timeoutTimer)
                    reject({ error: '支付超时，请重新尝试', code: -408 })
                }
            }, 1000)

            const timer = setInterval(() => {
                TopUp.checkPayStatus({
                    session: trade_no,
                    payment: payment.value
                }).then((res) => {
                    if (res.status === 1002) {
                        clearInterval(timer)
                        clearTimeout(timeoutTimer)
                        resolve(res)
                    }
                }).catch((err: IErrorResponse) => {
                    clearInterval(timer)
                    clearTimeout(timeoutTimer)
                    reject(err)
                })
            }, 4000)
        }),
        {
            loading: '等待支付中，请勿关闭页面......',
            success: (res: TopUp.CheckPayStatusResponse) => {
                useWalletStore().initWallet()
                loading.value = false
                payment.value = ''
                open.value = false

                if (!isCreate) {
                    const newData = [...data.value]

                    newData[index].pay_status = 1
                    newData[index].pay_status_label = '支付成功'

                    data.value = newData
                } else {
                    fetchData(pagination.value.pageIndex + 1, pagination.value.pageSize)
                }

                return res.status_label
            },
            error: (err: IErrorResponse) => {
                useWalletStore().initWallet()
                loading.value = false
                return err.error
            },
            position: 'top-center'
        }
    )
}

const continuePayRecord = (index: number) => {
    loading.value = true
    TopUp.continuePayRecord(data.value[index].number).
        then((res: Redirect) => {
            setTimeout(() => {
                window.open(res.redirect, '_blank')
            }, 2000)

            const timeout = (new Date().getTime()) - (new Date(data.value[index].expire_time).getTime())

            waitPayRecord(index, data.value[index].trade_no, timeout / 1000)
        }).
        catch((err: IErrorResponse) => {
            loading.value = false
            toast.error(err.error)
        })
}

const createPayRecord = (index: number) => {
    loading.value = true
    TopUp.createTopUpRedirect({
        payment: payment.value,
        money: price.value,
    }).then((res: TopUp.TopUpRedirectResponse) => {
        setTimeout(() => {
            window.open(res.redirect, '_blank')
        }, 2000)

        waitPayRecord(index, res.trade_no, res.expire_time, true)
    }).catch((err: IErrorResponse) => {
        loading.value = false
        toast.error(err.error)
    })
}

const payRecord = (index: number) => {
    if (!payment.value || payment.value === "" || !payments.value.some(item => item.uuid === payment.value)) {
        toast.error('请选择支付方式')
        return
    }

    if (payment.value === data.value[index].payment_no) {
        continuePayRecord(index)
        return
    }

    if (price.value === 0) {
        toast.error('支付金额错误，请联系管理员查看')
        return
    }

    createPayRecord(index)
}

const price = ref(0)
const payment = ref('')
const payments = ref<TopUp.Payment[]>([])
export function setPayments(res: TopUp.Payment[]) {
    payments.value = res
}
export const data = shallowRef<TopUp.TopUpHistory[]>([])
export const columns: ColumnDef<TopUp.TopUpHistory, any>[] = [
    {
        id: 'pay_name',
        accessorKey: 'payment_name',
        header: '支付渠道',
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.original.payment_name),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'pay_money',
        accessorKey: 'pay_money',
        header: '支付金额',
        cell: ({ row }) => {
            const formatted = new Intl.NumberFormat('zh-CN', {
                style: 'currency',
                currency: 'CNY'
            }).format(Number(row.getValue('pay_money')) / 100)

            return h(TopUpPayMoneyTooltip, { row: row }, {
                default: () => h('div', { class: 'flex space-x-1 justify-center items-center' }, [
                    h('span', formatted),
                    h(Icon, { icon: 'radix-icons:question-mark-circled', class: 'size-4' })
                ])
            })
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: '支付状态',
        accessorKey: 'pay_status',
        header: '支付状态',
        cell: ({ row }) => {
            const colors = [
                'bg-gray-500',
                'bg-green-500',
                'bg-red-500',
                'bg-yellow-500'
            ]

            return h(Badge, {
                variant: 'outline',
                class: [
                    'dark:text-white text-black',
                    colors[row.original.pay_status]
                ]
            }, {
                default: () => row.original.pay_status_label
            })
        }
    },
    {
        id: '发起时间',
        accessorKey: 'created_at',
        header: () => '发起时间',
        cell: ({ row }) => row.original.created_at,
    },
    {
        id: '超时时间',
        accessorKey: 'expire_time',
        header: '超时时间',
        cell: ({ row }) => {
            if (row.original.pay_status === 0 || row.original.pay_status === 2) {
                return row.original.expire_time
            }

            return '-'
        },
    },
    {
        id: '更新时间',
        accessorKey: 'updated_at',
        header: '更新时间',
        cell: ({ row }) => row.original.updated_at,
    },
    {
        id: 'actions',
        cell: ({ row }) => h('div', { class: 'relative' }, [
            h(TopUpRecordDetail, {
                open: open.value, row: row, loading: loading.value,
                ['onUpdate:setOpen']: setOpen,
                ['onUpdate:cancelRecord']: cancelRecord,
                ['onUpdate:payRecord']: payRecord
            }, {
                'pay-slot': () => h(PayPayment, {
                    payments: payments.value,
                    oldPayment: row.original.payment_no,
                    payment: payment.value,
                    price: row.original.actual_amount,
                    loading: loading.value,
                    ['onUpdate:payment']: (value: string) => {
                        payment.value = value
                    },
                    ['onUpdate:price']: (value: number) => price.value = value,
                })
            })
        ]),
        enableHiding: false,
    }
]

export const hiddenVisibleColumns = {
    'sm': [
        '支付状态',
        '发起时间',
        '超时时间',
        '更新时间'
    ],
    'lg': [
        '发起时间',
        '超时时间',
    ]
}