import React, { useCallback, useEffect, useState } from 'react';
import { useGetProductPriceQuery, useUpdateMutation } from "../../../api/cart";
import { useAppDispatch } from "../../../store/hooks";
import { debounceTime } from "../../../utils/utils";
import Counter from "../../Counter";
import { ICartItem } from "../../../types/Cart";
import CartProductDeleteConfirmDialog from "../CartProductDeleteConfirmDialog";

export interface CartProductQuantityControlProps {
    cartItem: ICartItem;
    className: string;
    value: number;
    bigSize?: boolean;
}

const CartProductQuantityControl = ({cartItem, value, bigSize, ...props}: CartProductQuantityControlProps) => {

    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);
    const [getProductPrice, {isLoading}] = useGetProductPriceQuery();
    const [counterValue, setCounterValue] = useState(value);
    const [disabled, setDisabled] = useState(false);
    const [cartProductUpdate] = useUpdateMutation();
    const [max, setMax] = useState<number>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(cartItem) {
            getProductPrice(cartItem.price_id).then(priceInfo => {
                priceInfo && ('quantity' in priceInfo) && setMax(priceInfo.quantity);
            });
        } else {
            setDisabled(true);
        }
    }, [cartItem]);

    useEffect(() => {
        setCounterValue(value);
    }, [value]);

    const changeQuantityHandler = useCallback(async (e: React.MouseEvent, quantity: number) => {
        if(cartItem) {
            e.preventDefault();
            quantity > 0 && setCounterValue(quantity);
            debounceTime(300, () => changeQuantity(quantity));
        }
    }, [cartItem]);

    function deleteConfirmDialogCloseHandler() {
        setDeleteConfirmDialogOpen(false);
    }

    function deleteConfirmDialogCancelHandler() {
        changeQuantity(1);
    }

    async function changeQuantity(quantity: number) {
        if(quantity === 0) {
            return setDeleteConfirmDialogOpen(true);
        }

        const priceInfo = await getProductPrice(cartItem.price_id);

        if(priceInfo) {
            if('quantity' in priceInfo) {
                setMax(priceInfo.quantity);
                if(quantity > priceInfo.quantity) {
                    setCounterValue(priceInfo.quantity);
                }
            }

            if((!('quantity' in priceInfo) || quantity <= priceInfo.quantity)) {
                await cartProductUpdate({id: cartItem!.id, quantity});
            }
        }
    }

    return (
        <>
            <Counter {...props} value={counterValue} disabled={isLoading}
                     onChange={changeQuantityHandler} min={0} max={max} bigSize={bigSize} />

            <CartProductDeleteConfirmDialog
                open={deleteConfirmDialogOpen}
                cartProductIds={[cartItem.id]}
                onClose={deleteConfirmDialogCloseHandler}
                onCancel={deleteConfirmDialogCancelHandler}
            />
        </>
    );
}

export default CartProductQuantityControl;
