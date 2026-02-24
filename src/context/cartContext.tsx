"use client";

import { getUserCart } from "@/cartActions/getUserCart.action";
import {
    createContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
} from "react";



type CartProduct = {
    count: number;
};

type GetUserCartResponse = {
    status: "success" | "error";
    data?: {
        products: CartProduct[];
    };
};

type CartContextType = {
    number: number;
    setnumber: React.Dispatch<React.SetStateAction<number>>;
};

type CartContextProviderProps = {
    children: ReactNode;
};


export const CartContext = createContext<CartContextType | null>(null);


export function CartContextProvider({
    children,
}: CartContextProviderProps) {
    const [number, setnumber] = useState<number>(0);

    const getuserincard = useCallback(async (): Promise<number | void> => {
        try {
            const res = (await getUserCart()) as GetUserCartResponse;

            if (res.status === "success" && res.data?.products) {
                const sum = res.data.products.reduce((acc, product) => acc + product.count, 0);
                return sum;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getuserincard().then((sum) => {
            if (typeof sum === "number") {
                setnumber(sum);
            }
        });
    }, [getuserincard]);

    return (
        <CartContext.Provider value={{ number, setnumber }}>
            {children}
        </CartContext.Provider>
    );
}
