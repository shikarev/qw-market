export interface IVendors {
    data: IVendor[],
    total: number,
    'page-count': number
}

export interface IVendor {
    id: string,
    user_id: string,
    user_name: string,
    model_id: string,
    name: string,
    description: string,
    site: string,
    raiting: number,
    feedback_count: number,
    contact: string,
    position: string,
    phone: string,
    phone_ext: string,
    opening_hours: string,
    email: string,
    org_form_short_name: string,
    org_name: string,
    inn: string,
    return_phone: string,
    return_email: string,
    return_name: string,
    picture_path: string,
}

export interface IProductVendor {
    description: string,
    feedback_count?: number,
    id: string,
    name: string,
    picture_path: string,
    rating: number,
    site: string,
}

export interface IVendorPayment {
    description: string,
    id: string,
    name: string,
    payment_method_id: string,
    picture_path: string,
    cost?: number,
    timeframe?: number,
    vendor_payments?: [],
}

export interface IVendorDelivery {
    cost: number,
    delivery_id: string,
    description: string,
    id: string,
    name: string,
    picture_path: string,
    timeframe: number,
}

export interface IVendorData {
    user_id?: string,
    model?: IVendorModel,
    name?: string,
    description?: string,
    site?: string,
    rating?: number,
    feedback_count?: number,
    contact?: string,
    position?: string,
    phone?: string,
    phoneExt?: string,
    opening_hours?: string,
    email?: string,
    orgName?: string,
    inn?: string,
    ogrn?: string,
    kpp?: string,
    bik?: string,
    payment_account?: string,
    return_phone?: string,
    return_Email?: string,
    return_name?: string,
    picturePath?: string,
    picture_path?: string,
    subscriber_count?: number,
    order_count?: number,
    product_count?: number,
    address?: IVendorAddress,
    org_form?: IVendorForm,
    return_address?: IVendorReturnAddress,
}

export interface IVendorModel {
    model_id: string,
        name?: string,
        short_name?: string,
        description?: string,
}

export interface IVendorForm {
    id: string,
    shortName?: string,
    name?: string,
}

export interface IVendorAddress {
    id: string,
    name?: string,
}

export interface IVendorReturnAddress {
    id: string,
    name?: string,
}

export interface IVendorPartners {
    id: string,
    name?: string,
    description?: string,
    picture_path?: string,
    partners: IPartners[],
}

interface IPartners {
    id: string,
    name?: string,
    description?: string,
    site?: string,
    picture_path?: string,
}
