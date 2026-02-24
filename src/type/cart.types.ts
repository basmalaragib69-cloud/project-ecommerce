export interface CartItem {
    count: number;
    price: number;
    product: {
        _id?: string;
        id: string;
        title: string;
        imageCover: string;
        price: number;
    };
}

export interface CartResponse {
    status: string;
    numOfCartItems: number; 
    data: {
        _id: string;
        products: CartItem[];
        totalCartPrice: number;
        [key: string]: unknown;
    };
    message?: string;
}
