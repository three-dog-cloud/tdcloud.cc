import type { IResponse, Redirect } from ".."
import type { Pagination, PaginationSearchItem, Params } from "@/types"
import request from "../request"

export namespace Order {
    export interface IOrderSearchParams extends Params { }

    export interface IOrderItemResponse {
        order_no: string
        order_type: number
        order_type_label: string
        is_auto: boolean
        title: string
        payment_name: string
        gd_no: string | null
        total_amount: number
        handling_amount: number
        discount_amount: number
        pay_amount: number
        quantity: number
        status: number
        status_label: string
        paid_time: string
        created_at: string
        updated_at: string
    }

    export function getOrders(params: IOrderSearchParams): Promise<Pagination<IOrderItemResponse, PaginationSearchItem>> {
        return request({
            url: '/order',
            method: 'get',
            params: params
        })
    }

    export function getOrder(order_no: string): Promise<IOrderItemResponse> {
        return request({
            url: `/order/${order_no}`,
            method: 'get',
        })
    }

    export interface ICreateOrderParams {
        gd_no: string
        quantity: number
        other_ipu: {
            [key: string]: number | string
        }
    }

    export interface ICreateOrderResponse {
        order_no: string
    }

    export function createOrder(params: ICreateOrderParams): Promise<ICreateOrderResponse> {
        return request({
            url: "/order",
            method: 'post',
            data: params
        })
    }

    export interface IOrderStatusResponse {
        status: number
    }

    // get order status
    export function getOrderStatus(order_no: string): Promise<IOrderStatusResponse> {
        return request({
            url: `/order/${order_no}/status`,
            method: 'get',
        })
    }

    // get order pay status
    export function getOrderPayStatus(order_no: string): Promise<IOrderStatusResponse> {
        return request({
            url: `/order/${order_no}/pay/status`,
            method: 'get',
        })
    }

    // cancel order
    export function cancelOrder(order_no: string): Promise<IResponse> {
        return request({
            url: `/order/${order_no}/cancel`,
            method: 'put',
        })
    }

    // continue process order
    export function continueProcessOrder(order_no: string): Promise<Redirect> {
        return request({
            url: `/order/${order_no}`,
            method: 'post',
        })
    }
}