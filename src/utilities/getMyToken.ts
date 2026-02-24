"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    const cookieStore = await cookies()
    const decodeToken = cookieStore.get("next-auth.session-token")?.value || cookieStore.get("__Secure-next-auth.session-token")?.value;
    if (!decodeToken) return undefined;
    const secret = process.env.NEXTAUTH_SECRET || "FreshCart_Secret_123";

    try {
        const token = await decode({
            token: decodeToken,
            secret: secret
        });
        return token?.token as string | undefined;
    } catch (error) {
        console.error("JWT Decode Error:", error);
        return undefined;
    }
}