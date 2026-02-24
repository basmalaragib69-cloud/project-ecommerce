"use server"

import { getMyToken } from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";

export async function getUserOrders() {
    const token = await getMyToken();
    if (!token) return { status: "fail", message: "Unauthorized" };


    try {
        const decoded = jwtDecode<{ id: string }>(token);
        const userId = decoded.id;

        const res = await fetch(`${process.env.API}/orders/user/${userId}`, {
            method: "GET"
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return { status: "fail", message: "Failed to fetch orders" };
    }
}

