"use server"

import { getMyToken } from "@/utilities/getMyToken";
import { checkoutType } from "@/schema/checkout";

export async function checkPayment(cardid: string, formValues: checkoutType, url: string) {
    const token = await getMyToken();
    if (!token) throw new Error("you are not authenticated")
    const res = await fetch(`${process.env.API}/orders/checkout-session/${cardid}?url=${url}`, {
        method: "POST",
        headers: {
            "token": `${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            shippingAddress: formValues,
        })
    })
    const data = await res.json();
    return data;
}

export async function createCashOrder(cardid: string, formValues: checkoutType) {
    const token = await getMyToken();
    if (!token) throw new Error("you are not authenticated")
    const res = await fetch(`${process.env.API}/orders/${cardid}`, {
        method: "POST",
        headers: {
            "token": `${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            shippingAddress: formValues,
        })
    })
    const data = await res.json();
    return data;
}


