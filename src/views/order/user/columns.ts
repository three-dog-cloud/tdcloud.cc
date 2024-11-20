import { Order, Payment } from '@/api/order'
import { MoneyComponent } from '@/components/common/money'
import { TextOverflow } from '@/components/common/text-overflow'
import { formatCoinTranslation } from '@/lib'
import { Icon } from '@iconify/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import { OrderDetailCompent } from './components'
import type { IErrorResponse } from '@/api'
import { toast } from 'vue-sonner'
import { tableData } from './data'
import { Badge } from '@/components/ui/badge'
import { actionContinueProcessOrder, actionPayOrder, cancelOrder } from './action'

const payments = ref<Payment.IPayOrderPayment[]>()

export const setPayments = (value: Payment.IPayOrderPayment[]) => payments.value = value

const loading = ref(false)
const open = ref(false)
const setOpen = (value: boolean) => {
    open.value = value
}

const cancelRecord = (index: number) => {
    loading.value = true
    cancelOrder(tableData.value[index].order_no, loading, () => {
        const newData = [...tableData.value]

        newData[index].status = 2
        newData[index].status_label = "取消订单"

        tableData.value = newData
        open.value = false
    })
}

const payRecord = async (index: number, payment: string) => {
    loading.value = true

    if (tableData.value[index].status != 0 && tableData.value[index].is_auto) {
        await actionContinueProcessOrder(
            tableData.value[index].order_no,
            loading,
            () => {
                tableData.value[index].status = 3
                tableData.value[index].status_label = "订单完成"
                open.value = false
            }
        )
        return
    }

    if (payment == '') {
        toast.error('请选择支付方式')
        loading.value = false
        return
    }

    await actionPayOrder(
        tableData.value[index].order_no,
        loading,
        payment,
        () => {
            open.value = false
        },
    )
}

export const columns: ColumnDef<Order.IOrderItemResponse, any>[] = [
    {
        id: '订单编号',
        accessorKey: 'order_no',
        header: '订单编号',
        cell: ({ row }) => h(TextOverflow, { text: row.original.order_no, width: 20 }),
    },
    {
        id: '订单类型',
        accessorKey: 'order_type',
        header: '订单类型',
        cell: ({ row }) => row.original.order_type_label,
    },
    {
        id: '标题',
        accessorKey: 'title',
        header: '标题',
        cell: ({ row }) => {
            if (row.original.title.length == 0) {
                return '-'
            }

            return row.original.title
        }
    },
    {
        id: '支付方式',
        accessorKey: 'payment_name',
        header: '支付方式',
        cell: ({ row }) => row.original.payment_name,
    },
    {
        id: '支付金额',
        accessorKey: 'total_amount',
        header: '支付金额',
        cell: ({ row }) => {
            return h(MoneyComponent, { money: row.original.total_amount }, {
                trigger: () => {
                    return h('div', { class: 'flex items-center' }, [
                        formatCoinTranslation(row.original.pay_amount),
                        h(Icon, { icon: 'radix-icons:question-mark-circled', class: 'size-4 color-red-500' }),
                    ])
                },
                content: () => {
                    const moneyArr = [
                        h('div', { class: 'flex items-center' }, [
                            h('span', '总金额:'),
                            formatCoinTranslation(row.original.total_amount),
                        ])
                    ]

                    if (row.original.handling_amount > 0) {
                        moneyArr.push(h('div', { class: 'flex items-center' }, [
                            h('span', '手续费:'),
                            formatCoinTranslation(row.original.handling_amount),
                        ]))
                    }

                    if (row.original.discount_amount > 0) {
                        moneyArr.push(h('div', { class: 'flex items-center' }, [
                            h('span', '折扣:'),
                            formatCoinTranslation(row.original.discount_amount),
                        ]))
                    }

                    return h('div', moneyArr)
                }
            })
        }
    },
    {
        id: "状态",
        accessorKey: "status",
        header: "状态",
        cell: ({ row }) => {
            const colors = [
                'bg-gray-500',
                'bg-green-500',
                'bg-red-500',
                'bg-yellow-500'
            ]

            return h(Badge, {
                variant: 'outline', class: [
                    'dark:text-white text-nowrap',
                    colors[row.original.status]
                ]
            }, {
                default: () => row.original.status_label
            })
        },
    },
    {
        id: "支付时间",
        accessorKey: "paid_time",
        header: "支付时间",
        cell: ({ row }) => row.original.paid_time ?? '-',
    },
    {
        id: "创建时间",
        accessorKey: "created_at",
        header: "创建时间",
        cell: ({ row }) => row.original.created_at ?? '-',
    },
    {
        id: "更新时间",
        accessorKey: "updated_at",
        header: "更新时间",
        cell: ({ row }) => row.original.updated_at ?? '-',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return h('div', { class: 'relative' },
                h(OrderDetailCompent, {
                    open: open.value, loading: loading.value, order: row, payments: payments.value ?? [],
                    ['onUpdate:setOpen']: setOpen,
                    ['onUpdate:cancelRecord']: cancelRecord,
                    ['onUpdate:payRecord']: payRecord
                })
            )
        }
    }
]

export const hiddenFilters = {
    'sm': [
        '订单编号',
        '标题',
        '支付方式',
        '支付时间',
        '创建时间',
        '更新时间',
    ],
    'md': [
        '订单类型',
        '标题',
        '支付方式',
        '创建时间',
        '更新时间',
    ],
    'lg': [
        '订单类型',
        '标题',
        '更新时间',
    ]
}