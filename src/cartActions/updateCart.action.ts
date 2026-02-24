"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function updateCart(id: string, count: string) {
    const token = await getMyToken()
    if (!token) return { status: "unauthorized" }
    const res = await fetch(`${process.env.API}/cart/${id}`, {
        method: "PUT",
        headers: {
            token: `${token}`,
            "content-type": "application/json"
        }, body: JSON.stringify({
            count
        })
    })
    const payload = await res.json()
    return payload
}

