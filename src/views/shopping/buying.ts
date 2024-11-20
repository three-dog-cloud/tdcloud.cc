import type { IErrorResponse, IResponse } from "@/api";
import { Order } from "@/api/order";
import { PayGateway } from "@/api/pay";
import request from "@/api/request";
import { isValidUrl } from "@/lib";
import router from "@/router";
import { useWalletStore } from "@/stores/personal";
import type { Ref } from "vue";
import { toast } from "vue-sonner";


export default async (formData: Order.ICreateOrderParams, pageLoading: Ref<boolean>, payment: string, callback: () => void) => {
    // 等待支付结果
    const waitPayOrder = (order_no: string, timeout: number): Promise<Order.IOrderStatusResponse> => {
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                Order.getOrderStatus(order_no)
                    .then((statusRes) => {
                        if (statusRes.status != 0) {
                            clearInterval(timer)
                            clearInterval(timeoutTimer)
                            resolve(statusRes)
                        }
                    })
                    .catch((err: IErrorResponse) => {
                        clearInterval(timer)
                        clearTimeout(timeoutTimer)
                        reject(err)
                    })
            }, 4000)

            const timeoutTimer = setInterval(() => {
                timeout -= 1
                if (timeout <= 0) {
                    clearInterval(timer)
                    clearInterval(timeoutTimer)
                    reject({ error: '支付超时，请重新尝试', code: -408 })
                }
            }, 1000)
        })
    }

    // 系统支付
    const systemPayOrder = (order_no: string, uri: string): Promise<Order.IOrderStatusResponse> => {
        return new Promise((resolve, reject) => {
            request<IResponse>({
                url: uri,
                method: 'get'
            })
                .then((res: IResponse) => {
                    console.log(res)

                    Order.getOrderStatus(order_no)
                        .then((statusRes) => {
                            if (statusRes.status != 0) {
                                resolve(statusRes)
                            }
                        })
                        .catch((err: IErrorResponse) => {
                            reject(err)
                        })
                }).catch((err: IErrorResponse) => {
                    reject(err)
                })
        })
    }
    // 支付网关
    const createOrderPayGateway = (order_no: string) => {
        PayGateway.createOrderPayGateway(payment, order_no)
            .then((res: PayGateway.ICreateOrderResponse) => {
                const timeout = res.expire_time - Math.floor(Date.now() / 1000)

                toast.promise((): Promise<Order.IOrderStatusResponse> => {
                    setTimeout(() => {
                        let uri = res.redirect
                        if (!isValidUrl(uri)) {
                            uri = `${window.location.origin}` + uri
                            console.log(uri)
                        }
                        window.open(uri, '_blank')
                    }, 2000)

                    return waitPayOrder(order_no, timeout)
                }, {
                    loading: '等待支付中，请勿关闭页面......',
                    success: (data: Order.IOrderStatusResponse) => {
                        useWalletStore().initWallet()
                        setTimeout(() => {
                            pageLoading.value = false
                            callback()
                            router.push({ name: 'OrderUserPage' })
                        }, 3000)

                        return data.status == 1 ? '支付成功' : '支付取消'
                    },
                    error: (err: IErrorResponse) => {
                        pageLoading.value = false
                        return err.error
                    },
                    position: 'top-center'
                })
            })
            .catch((err: IErrorResponse) => {
                pageLoading.value = false;
                toast.error(err.error);
            })
    }

    pageLoading.value = true
    return Order.createOrder(formData)
        .then((res: Order.ICreateOrderResponse) => {
            createOrderPayGateway(res.order_no);
        })
        .catch((err) => {
            pageLoading.value = false;
            toast.error(err.error);
        })
}