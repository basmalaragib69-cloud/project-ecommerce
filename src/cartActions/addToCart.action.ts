"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addToCart(id: string) {
    const token = await getMyToken()
    if (!token) return { status: "fail", message: "You must be logged in first" };
    const res = await fetch(`${process.env.API}/cart`, {
        method: "post",
        headers: {
            token,
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            productId: id
        })
    })
    const payload = await res.json()

    return payload

}
