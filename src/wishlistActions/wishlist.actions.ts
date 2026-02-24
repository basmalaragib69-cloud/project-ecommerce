"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addToWishlist(productId: string) {
    const token = await getMyToken();
    if (!token) return { status: "fail", message: "You must be logged in first" };

    const res = await fetch(`${process.env.API}/wishlist`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId
        })
    });
    return await res.json();
}

export async function removeFromWishlist(productId: string) {
    const token = await getMyToken();
    if (!token) return { status: "fail", message: "You must be logged in first" };

    const res = await fetch(`${process.env.API}/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
            token
        }
    });
    return await res.json();
}

export async function getUserWishlist() {
    const token = await getMyToken();
    if (!token) return { status: "fail", message: "You must be logged in first" };

    const res = await fetch(`${process.env.API}/wishlist`, {
        method: "GET",
        headers: {
            token
        }
    });
    return await res.json();
}

