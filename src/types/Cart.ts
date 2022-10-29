import {IProductCard, IProductData} from "./Product";

export enum CartProductStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
}

export interface ICartItem {
    id: string;
    cost: number;
    quantity: number;
    product: IProductCard | IProductData;
    price_id: string;
    vendor_point_id: string;
    vendor_point_name: string;
    status: CartProductStatus;
    oldCost?: number;
}
/*
export interface AddProductToCartArgs {
    product: string;
    vendor_point: string;
    price: string; // Идентификатор предложения
    quantity: number;
    status: CartProductStatus;
}
*/

export type ProductPriceList = Array<ProductPriceListItem>;

export interface ProductPriceListItem {
    id: string;
    cost: number;
    quantity: number;
}

export interface AddProductToCartArgs {
    status: CartProductStatus;
    price: string; // Идентификатор предложения
    quantity: number;
    // points: number;
    // cost: number;
}

export interface UpdateCartProductArgs {
    id: string;
    quantity?: number;
    status?: CartProductStatus;
}

export interface FetchAddProductArgs {
    isAuthenticated: boolean;
    productId: string;
    priceId?: string;
    status?: CartProductStatus;
}

export interface FetchUpdateProductArgs extends UpdateCartProductArgs {
    isAuthenticated: boolean;
}

export interface CalculateResult {
    currency_name: string;
    currency_short_name: string;
    summary: number;
    discount?: number;
}
