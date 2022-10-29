import {IProductVendor, IVendorDelivery, IVendorPayment} from "./Vendor";

export interface IProductPrices {
    data: IVendorPrices[],
    total: number,
    'page-count': number
}

export interface IVendorPrices {
    id: string,
    product_id: string,
    cost: number,
    old_cost: number,
    currency_id: string,
    currency_short_name: string,
    currency_name: string,
    code: string,
    picture_path?: string,
    mod_name?: string,
    vendor: IProductVendor,
    vendor_payments: IVendorPayment[],
    vendor_deliveries: IVendorDelivery[],
}