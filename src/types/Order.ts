import {orderStatus} from "../components/Profile/OrderCard";

export enum deliveryType {
    self,
    courier
}

export enum paymentType {
    cardOnline,
    cash
}

export interface OrderInfo {
    id: string,
    recipientName: string,
    recipientEmail: string,
    recipientPhone:string,
    created: string,
    deliveryType: string,
    orderStatus: string,
    paymentStatus: string,
    deliveryWayId: string,
    deliveryWayName: string,
    paymentMethodId: string,
    paymentMethodName: string,
}

export interface OrderProduct {
    id: string,
    cost: number,
    quantity: number,
    created: string,
    productId: string,
    name: string,
    rating: number,
    feedbackCount: number,
    image: string,
    currencyId: string,
    currencyName: string,
    vendorId: string,
    vendorName: string,
}

export interface IOrderData extends OrderInfo{
    orderProducts: OrderProduct[];
}

export interface IDeliveryWays{
    id: string;
    name?: string;
    created?: string;
    image?: string;
}

export interface ICourierForm{
    address: string;
    apart: string;
    floor: string;
    entrance?: string;
    comment?: string;
    code?: string;
}

export interface ISelfForm{
    address?: string;
}

export interface IRecipientUpdate{
    id: string;
    body: IRecipientForm;
}

export interface IRecipientForm{
    name?: string;
    email?: string;
    phone?: string;
}

export interface ICardBody{
    name: string;
    number: string;
    expired: string;
    note?: string;
    description?: string;
}

export interface IPlaceOrder{
    description?: string,
    note?: string,
    promo?: string,
    deliveryWay?: string,
    paymentMethod?: string,
    deliveryType?: string,
    bankCard?: string,
    recipient?: string,
}

export interface IPaymentForm extends ICardBody{
    saveCard?: boolean;
}

export interface IOrderSettingsType{
    step: number;
    deliveryType: deliveryType;
    paymentType: paymentType;
    selectedCardId?: string;
    selectedRecipientId?: string;
    selectedPaymentId?: string;
    selectedAddressId?: string;
    courierForm: ICourierForm;
    selfForm: ISelfForm;
    recipientForm: IRecipientForm;
    paymentForm: IPaymentForm;
    inProgress: boolean;
    allowNextStep: boolean;
    submitSuccess: boolean;
    submitting: boolean;
    creationStep: number;
    disableNextButton: boolean;
    recipientToEditId?: string;
    paymentToEditId?: string;
    orderId?: string;
}

export enum OrderStatuses {
    'Создан',
    'В обработке'
}