import React from 'react';
import CheckCard from "../CheckCard";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {
    orderDeliveryType,
    getSelectedPaymentId,
    selectedRecipientId, setCreationStep,
    setOrderStatus, setOrderId
} from "../../../store/order";
import {useAddOrderMutation} from "../../../api/orders";
import {useMultipleDeleteMutation} from "../../../api/cart";

function OrderVerify() {
    const [placeOrder] = useAddOrderMutation();
    const selectedRecipient = useAppSelector(selectedRecipientId);
    const selectedPayment = useAppSelector(getSelectedPaymentId);
    const selectedDeliveryType = useAppSelector(orderDeliveryType);
    const [deleteCartItems] = useMultipleDeleteMutation();
    const dispatch = useAppDispatch();

    function handleOrder (itemsToOrderIds: string[]) {
        placeOrder({
            recipient: selectedRecipient,
            bankCard: selectedPayment,
            deliveryType: selectedDeliveryType === 0 ? 'delivery' : 'pickup',
            paymentMethod: 'c46f8dc6-201b-4f52-9055-97d380c07702',
            deliveryWay: 'faa708ee-47b7-4379-9889-1ada157e5abe',
        }).unwrap()
            .then( r => {
                if(r.order_status === "created"){
                    dispatch(setCreationStep(0));
                    dispatch(setOrderStatus(2));
                    dispatch(setOrderId(r.id));
                    deleteCartItems(itemsToOrderIds);
                }
            })
            .catch( e => {
                alert(JSON.stringify(e, null, 4))
            })
    }

    return (
        <div>
            <CheckCard placeOrder={handleOrder}/>
        </div>
    );
}

export default OrderVerify;