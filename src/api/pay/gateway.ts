import type { Redirect } from "../redirect";
import request from "../request";
import type { IResponse } from "../response";

export namespace PayGateway {

    export interface ICreateOrderResponse extends Redirect {
        trade_no: string
        expire_time: number
    }

    export function createOrderPayGateway(payment: string, order_no: string): Promise<ICreateOrderResponse> {
        return request({
            url: `/pay/gateway/${payment}/${order_no}`,
            method: 'post'
        })
    }

    export function callbackPayGateway(params: { [string: string]: any }): Promise<IResponse> {
        return request({
            url: '/pay/callback/gateway',
            method: 'post',
            data: params
        })
    }
}