import type { Order } from "@/api/order";
import type { Payment } from "@/types";
import { ref, watchEffect, type Ref } from "vue";

export default (unitCost: number, payment: Ref<string>, formData: Ref<Order.ICreateOrderParams>, payments: Ref<Payment[]>) => {
    const price = ref<number>(0)

    watchEffect(() => {
        const total = ref(unitCost * (formData.value?.quantity ?? 1)) // calculate the total price

        if (payment.value && payment.value.length > 0) {
            const payHandle = payments.value.find((item) => item.uuid === payment.value)
            if (payHandle) {
                let tmpPrice = total.value
                if (payHandle.handling_fee_fixed > 0) {
                    tmpPrice += payHandle.handling_fee_fixed
                }

                if (payHandle.handling_fee_percent > 0) {
                    let tmpPercentPrice = parseFloat(
                        (tmpPrice * (payHandle.handling_fee_percent / 100)).toFixed(0)
                    )
                    if (tmpPercentPrice > payHandle.handling_fee_percent_max * 100) {
                        tmpPercentPrice = payHandle.handling_fee_percent_max * 100
                    }

                    tmpPrice += tmpPercentPrice
                }
                total.value = tmpPrice
            }
        }

        if (total.value != price.value) {
            price.value = total.value // convert to cents
        }
    })

    return {
        price
    }
}