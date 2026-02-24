import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";


export const AuthOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: "post",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                const payload = await response.json()
                console.log(payload);
                if (payload.message == "success") {
                    const decode: { id: string } = jwtDecode(payload.token)
                    console.log(decode)
                    return {
                        id: decode.id,
                        user: payload.user,
                        token: payload.token
                    }
                } else {
                    throw new Error("invaled email or password")
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user as { role: string; email: string; name: string }
            return session
        },
    }
}