import type { Pagination, PaginationSearchItem } from "@/types"
import type { Redirect } from "../redirect"
import request from "../request"
import type { IResponse } from "../response"
import type { Payment as CommonPayment } from "@/types/payment"

export namespace TopUp {
    export interface Payment extends CommonPayment { }

    export function getPaymentList(): Promise<Payment[]> {
        return request({
            url: '/pay/top-up/payment',
            method: 'get'
        })
    }

    export interface TopUpParams {
        payment: string
        money: number
    }

    export interface TopUpRedirectResponse {
        trade_no: string
        redirect: string
        expire_time: number
    }

    export function createTopUpRedirect(params: TopUpParams): Promise<TopUpRedirectResponse> {
        return request({
            url: '/pay/top-up',
            method: 'post',
            data: params
        })
    }

    export function payTopUpSuccess(data: any): Promise<Redirect> {
        return request({
            url: '/pay/top-up/success',
            method: 'post',
            data: data
        })
    }

    export interface CheckPayStatusParams {
        payment: string
        session: string
    }

    export interface CheckPayStatusResponse {
        status: number
        status_label: string
    }

    export function checkPayStatus(params: CheckPayStatusParams): Promise<CheckPayStatusResponse> {
        return request({
            url: '/pay/status',
            method: 'post',
            data: params
        })
    }

    export interface TopUpHistory {
        id: number
        number: string
        trade_no: string
        payment: string
        payment_no: string
        payment_name: string
        pay_money: number
        handling_fee: number
        handling_fee_fixed: number
        handling_fee_percent: number
        actual_amount: number
        pay_status: number
        pay_status_label: string
        expire_time: string
        created_at: string
        updated_at: string
    }

    export function getTopUpHistory(params: any): Promise<Pagination<TopUpHistory, PaginationSearchItem>> {
        return request({
            url: '/pay/record',
            method: 'get',
            params: params
        })
    }

    export function cancelTopUp(id: string): Promise<IResponse> {
        return request({
            url: `/pay/top-up/${id}`,
            method: 'delete'
        })
    }

    export function continuePayRecord(id: string): Promise<Redirect> {
        return request({
            url: `/pay/top-up/${id}`,
            method: 'post'
        })
    }
}