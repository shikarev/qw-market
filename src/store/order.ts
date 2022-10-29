import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './'
import {
    deliveryType,
    ICourierForm,
    IOrderSettingsType,
    IPaymentForm,
    IRecipientForm,
    ISelfForm,
    paymentType
} from "../types/Order";
import SecureLS from "secure-ls";

const ls = new SecureLS();

const initialRecipientForm = {
    name: '',
    email: '',
    phone: ''
}

const initialBankCardForm = {
    name: '',
    number: '',
    expired: '',
    code: '',
}

const initialCourierForm = {
    address: '',
    apart: '',
    floor: '',
    entrance: '',
    comment: '',
    code: '',
}

function addLocalData(data: any) {
    ls.set('order', {...ls.get('order'), ...data});
}

function getLocalInt(arg: any) {
    return parseInt(ls.get('order')[arg]) || 0;
}

function getLocalString(arg: any) {
    return ls.get('order')[arg];
}

// Define the initial state using that type
const initialState: IOrderSettingsType = {
    step: getLocalInt('orderstep'),
    deliveryType: getLocalInt('deliveryType'),
    paymentType: getLocalInt('paymentType'),
    selectedCardId: getLocalString('selectedCardId'),
    selectedRecipientId: getLocalString('selectedRecipientId'),
    selectedPaymentId: getLocalString('selectedPaymentId'),
    selectedAddressId: getLocalString('selectedAddressId'),
    courierForm: getLocalString('courierForm') ?? initialCourierForm,
    selfForm: getLocalString('selfForm') ?? {address: ''},
    recipientForm: getLocalString('recipientForm') ?? initialRecipientForm,
    paymentForm: getLocalString('paymentForm') ?? initialBankCardForm,
    inProgress: getLocalString('inProgress') ?? true,
    allowNextStep: false,
    submitSuccess: false,
    submitting: false,
    creationStep: 0,
    disableNextButton: true,
    recipientToEditId: undefined,
    paymentToEditId: undefined,
    orderId: undefined
}

export const orderSlice = createSlice({
    name: 'order',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setOrderStatus: (state, action: PayloadAction<number>) => {
            if (action.payload < 0) {
                return
            } else if (action.payload > 2) {
                state.step = 0
                addLocalData({orderstep: 0});
            } else {
                state.step = action.payload;
                addLocalData({orderstep: action.payload});
            }
        },
        setOrderProgress: (state, action: PayloadAction<boolean>) => {
            addLocalData({inProgress: action.payload});
            state.inProgress = action.payload;
        },
        setDeliveryType: (state, action: PayloadAction<deliveryType>) => {
            addLocalData({deliveryType: action.payload});
            state.deliveryType = action.payload;
        },
        setPaymentType: (state, action: PayloadAction<paymentType>) => {
            addLocalData({paymentType: action.payload});
            state.paymentType = action.payload;
        },
        setSelectedCardId: (state, action: PayloadAction<string>) => {
            addLocalData({selectedCardId: action.payload});
            state.selectedCardId = action.payload;
        },
        setSelectedAddressId: (state, action: PayloadAction<string | undefined>) => {
            addLocalData({selectedAddressId: action.payload});
            state.selectedAddressId = action.payload;
        },
        setSelectedRecipientId: (state, action: PayloadAction<string | undefined>) => {
            addLocalData({selectedRecipientId: action.payload});
            state.selectedRecipientId = action.payload;
        },
        setSelectedPaymentId: (state, action: PayloadAction<string | undefined>) => {
            addLocalData({selectedPaymentId: action.payload});
            state.selectedPaymentId = action.payload;
        },
        setCourierForm: (state, action: PayloadAction<ICourierForm>) => {
            addLocalData({courierForm: action.payload});
            state.courierForm = action.payload;
        },
        setSelfForm: (state, action: PayloadAction<ISelfForm>) => {
            addLocalData({selfForm: action.payload});
            state.selfForm = action.payload;
        },
        setRecipientForm: (state, action: PayloadAction<IRecipientForm>) => {
            addLocalData({recipientForm: action.payload});
            state.recipientForm = action.payload;
        },
        clearRecipientForm: (state) => {
            addLocalData({recipientForm: initialRecipientForm});
            state.recipientForm = initialRecipientForm;
        },
        setPaymentForm: (state, action: PayloadAction<IPaymentForm>) => {
            addLocalData({paymentForm: action.payload})
            state.paymentForm = action.payload;
        },
        clearBankCardForm: (state) => {
            addLocalData({paymentForm: initialBankCardForm});
            state.paymentForm = initialBankCardForm;
        },
        clearCourierForm: (state) => {
            addLocalData({courierForm: initialCourierForm});
            state.courierForm = initialCourierForm;
        },
        setAllowNextStep: (state, action: PayloadAction<boolean>) => {
            state.allowNextStep = action.payload;
        },
        setSubmitSuccess: (state, action: PayloadAction<boolean>) => {
            state.submitSuccess = action.payload;
        },
        setSubmitting: (state, action: PayloadAction<boolean>) => {
            state.submitting = action.payload;
        },
        setCreationStep: (state, action: PayloadAction<number>) => {
            state.creationStep = action.payload;
        },
        setDisableNextButton: (state, action: PayloadAction<boolean>) => {
            state.disableNextButton = action.payload;
        },
        setRecipientToEditId: (state, action: PayloadAction<string>) => {
            state.recipientToEditId = action.payload;
        },
        setPaymentToEditId: (state, action: PayloadAction<string>) => {
            state.paymentToEditId = action.payload;
        },
        setOrderId: (state, action: PayloadAction<string>) => {
            state.orderId = action.payload;
        },
    },
})

export const {
    setDeliveryType,
    setPaymentType,
    setCourierForm,
    setSelfForm,
    setRecipientForm,
    setPaymentForm,
    setSelectedCardId,
    setSelectedRecipientId,
    setSelectedPaymentId,
    setSelectedAddressId,
    setOrderStatus,
    setAllowNextStep,
    setSubmitSuccess,
    setSubmitting,
    setCreationStep,
    setDisableNextButton,
    clearRecipientForm,
    clearCourierForm,
    setRecipientToEditId,
    setPaymentToEditId,
    clearBankCardForm,
    setOrderId
} = orderSlice.actions;

export const orderDeliveryType = (state: RootState) => state.order.deliveryType;
export const orderPaymentType = (state: RootState) => state.order.paymentType;
export const orderCourierForm = (state: RootState) => state.order.courierForm;
export const orderSelfForm = (state: RootState) => state.order.selfForm;
export const orderRecipientForm = (state: RootState) => state.order.recipientForm;
export const orderPaymentForm = (state: RootState) => state.order.paymentForm;
export const orderInProgress = (state: RootState) => state.order.inProgress;
export const selectedCardId = (state: RootState) => state.order.selectedCardId;
export const selectedRecipientId = (state: RootState) => state.order.selectedRecipientId;
export const getSelectedPaymentId = (state: RootState) => state.order.selectedPaymentId;
export const getSelectedAddressId = (state: RootState) => state.order.selectedAddressId;
export const getOrderStatus = (state: RootState) => state.order.step;
export const getAllowNextStep = (state: RootState) => state.order.allowNextStep;
export const getSubmitSuccess = (state: RootState) => state.order.submitSuccess;
export const getIsSubmitting = (state: RootState) => state.order.submitting;
export const getCreationStep = (state: RootState) => state.order.creationStep;
export const getDisableNextButton = (state: RootState) => state.order.disableNextButton;
export const getRecipientToEditId = (state: RootState) => state.order.recipientToEditId;
export const getPaymentToEditId = (state: RootState) => state.order.paymentToEditId;
export const getOrderId = (state: RootState) => state.order.orderId;

export default orderSlice.reducer