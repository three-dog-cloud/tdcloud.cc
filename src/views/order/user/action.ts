import type { IErrorResponse, Redirect } from "@/api"
import { Order } from "@/api/order"
import { PayGateway } from "@/api/pay"
import { isValidUrl } from "@/lib"
import router from "@/router"
import { useWalletStore } from "@/stores/personal"
import type { Ref } from "vue"
import { toast } from "vue-sonner"

// 继续处理订单
export async function actionContinueProcessOrder(orderNo: string, pageLoading: Ref<boolean>, callback: () => void) {
    const checkOrderStatus = (order_no: string, timeout: number): Promise<Order.IOrderStatusResponse> => {
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                Order.getOrderStatus(order_no)
                    .then((statusRes) => {
                        if (statusRes.status > 1) {
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
                    reject({ error: '等待超时，请联系管理员操作', code: -408 })
                }
            }, 1000)
        })
    }

    pageLoading.value = true
    return Order.continueProcessOrder(orderNo)
        .then((res: Redirect) => {
            toast.promise((): Promise<Order.IOrderStatusResponse> => {
                setTimeout(() => {
                    let uri = res.redirect
                    if (!isValidUrl(uri)) {
                        uri = `${window.location.origin}` + uri
                        console.log(uri)
                    }
                    window.open(uri, '_blank')
                }, 2000)

                return checkOrderStatus(orderNo, 360)
            }, {
                loading: '请在新打开的页面等待处理结果，请勿关闭页面......',
                success: (data: Order.IOrderStatusResponse) => {
                    setTimeout(() => {
                        callback()
                    }, 3000)

                    return data.status == 3 ? '处理成功' : '处理失败'
                },
                error: (err: IErrorResponse) => {
                    pageLoading.value = false
                    return err.error
                },
                position: 'top-center'
            })
        })
        .catch((err: IErrorResponse) => {
            pageLoading.value = false
            toast.error(err.error)
        })
}

// 支付订单
export async function actionPayOrder(orderNo: string, pageLoading: Ref<boolean>, payment: string, callback: () => void) {
    const waitPayOrder = (order_no: string, timeout: number): Promise<Order.IOrderStatusResponse> => {
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                Order.getOrderPayStatus(order_no)
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

    pageLoading.value = true
    return PayGateway.createOrderPayGateway(payment, orderNo)
        .then((res: PayGateway.ICreateOrderResponse) => {
            const timeout = res.expire_time - Math.floor(Date.now() / 1000)

            toast.promise((): Promise<Order.IOrderStatusResponse> => {
                setTimeout(() => {
                    let uri = res.redirect
                    if (!isValidUrl(uri)) {
                        uri = `${window.location.origin}` + uri
                    }
                    window.open(uri, '_blank')
                }, 2000)

                return waitPayOrder(orderNo, timeout)
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

export async function cancelOrder(orderNo: string, pageLoading: Ref<boolean>, callback: () => void) {
    return Order.cancelOrder(orderNo)
        .then(() => {
            callback()
            toast.success('订单已取消')
        })
        .catch((err: IErrorResponse) => {
            toast.error(err.error)
        })
        .finally(() => {
            pageLoading.value = false
        })
}