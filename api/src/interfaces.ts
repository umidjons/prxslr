export interface IProduct {
    user_id: string;
    created_at: string | Date;
    title: string;
    price: number;
    type: string;
    protocols: string[];
    country_id: string;
    state: number;
}

export interface ICartItem {
    product: IProduct;
    count: number;
    duration: number;
}

export interface ICart {
    count: number;
    price: number;
    items: ICartItem[];
}

export interface IProxy {
    user_id: string;
    protocols: string[];
    ip: string;
    port: number;
    login: string;
    password: string;
    created_at: string | Date;
    activated_at: string | Date;
    expired_at: string | Date;
    state: number;
    country_id: string;
    order_id: string;
}