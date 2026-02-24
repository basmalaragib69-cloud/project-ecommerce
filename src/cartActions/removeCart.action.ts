"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function removeCartClear() {
    const token = await getMyToken()
    if (!token) return { status: "unauthorized" }

    const res = await fetch(`${process.env.API}/cart`, {
        method: "DELETE",
        headers: {
            token: `${token}`,
            "content-type": "application/json"
        }
    })
    const payload = await res.json()
    return payload
}

