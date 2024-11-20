import type { IErrorResponse } from "@/api";
import type { Pagination, PaginationSearchItem } from "@/types";
import { Order } from "@/api/order";
import type { PaginationState } from "@tanstack/vue-table";
import { type Ref, ref, computed, watchEffect } from "vue";
import { toast } from "vue-sonner";

export const tableData = ref<Order.IOrderItemResponse[]>([]);

export default (pagination: Ref<PaginationState>, params: Ref<{ [key: string]: any }>) => {
    const loading = ref(false)
    const totalResultCount = ref(-1)
    const totalResultCountTotal = ref(-1)

    const request = ref<Promise<any> | null>(null)

    const filter = ref<PaginationSearchItem[]>()

    const requestParams = computed(() => {
        const { pageSize, pageIndex } = pagination.value

        const currentPage = pageIndex + 1

        return {
            ...params.value.value,
            limit: pageSize,
            page: currentPage,
        }
    })

    watchEffect(() => {
        loading.value = true

        request.value = Order.getOrders(requestParams.value)
            .then((res: Pagination<Order.IOrderItemResponse, PaginationSearchItem>) => {
                if (res.items) {
                    tableData.value = res.items
                }

                if (res.filter) {
                    filter.value = res.filter
                }

                totalResultCount.value = Math.ceil(res.total / res.limit)
                totalResultCountTotal.value = res.total
            })
            .catch((err: IErrorResponse) => {
                toast.error(err.error)
            })
            .finally(() => loading.value = false)
    })

    return {
        loading,
        filter,
        tableData,
        totalResultCount,
        totalResultCountTotal,
    }
}