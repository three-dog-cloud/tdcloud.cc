import request from "../request";
import type { Payment as CommonPayment } from "@/types/payment";

export namespace Payment {
    export interface IPaymentHandlingFeeResponse {
        handling_fee: number;
    }

    export function getPaymentHandlingFee(payment: string, order_no: string): Promise<IPaymentHandlingFeeResponse> {
        return request({
            url: `/pay/gateway/${payment}/${order_no}`,
            method: 'get'
        })
    }

    export interface IPayOrderPayment extends CommonPayment { }

    export function getPayOrderPayment(): Promise<IPayOrderPayment[]> {
        return request({
            url: 'pay/order/payment',
            method: 'get',
        })
    }
}