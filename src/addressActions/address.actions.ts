"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addAddress(addressData: { name: string, details: string, phone: string, city: string }) {
    const token = await getMyToken();
    if (!token) return { status: "fail", message: "Unauthorized" };

    const res = await fetch(`${process.env.API}/addresses`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addressData)
    });
    return await res.json();
}

export async function removeAddress(addressId: string) {
    const token = await getMyToken();
    if (!token) return { status: "fail", message: "Unauthorized" };

    const res = await fetch(`${process.env.API}/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
            token
        }
    });
    return await res.json();
}

export async function getUserAddresses() {
    const token = await getMyToken();
    if (!token) return { status: "fail", message: "Unauthorized" };

    const res = await fetch(`${process.env.API}/addresses`, {
        method: "GET",
        headers: {
            token
        }
    });
    return await res.json();
}

