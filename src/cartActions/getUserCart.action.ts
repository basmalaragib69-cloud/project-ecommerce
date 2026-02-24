"use server"
import { getMyToken } from "@/utilities/getMyToken";




export async function getUserCart() {
    const token = await getMyToken()
    if (!token) return { status: "fail", message: "You must be logged in first" };
    const res = await fetch(`${process.env.API}/cart`, {
        method: "GET",
        headers: {
            token,
            "content-type": "application/json"
        }
    })
    const payload = await res.json()
    return payload
}
