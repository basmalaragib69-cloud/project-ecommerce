"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function removeItemCart(id: string) {
    const token = await getMyToken()
    if (!token) return { status: "unauthorized" }
    const res = await fetch(`${process.env.API}/cart/${id}`, {
        method: "DELETE",
        headers: {
            token: `${token}`,
            "content-type": "application/json"
        }
    })
    const payload = await res.json()
    return payload
}

