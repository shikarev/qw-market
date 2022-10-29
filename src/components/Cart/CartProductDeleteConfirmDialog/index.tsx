import React, { useEffect, useState } from 'react';
import ConfirmDialog from "../../Dialogs/ConfirmDialog";
import { useDeleteAllProductsMutation, useMultipleDeleteMutation } from "../../../api/cart";


const CartProductDeleteConfirmDialog = ({cartProductIds, onClose, onConfirm, onCancel, open}: {
    cartProductIds: string[];
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [multipleDeleteProductRequest] = useMultipleDeleteMutation();
    const [deleteAllProductsRequest] = useDeleteAllProductsMutation();

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    function deleteConfirm() {
        multipleDeleteProductRequest(cartProductIds);
        deleteConfirmDialogClose();
        if(onConfirm) {
            onConfirm();
        }
    }

    function deleteConfirmDialogCloseHandler() {
        deleteConfirmDialogClose();
        if(onClose) {
            onClose();
        }
    }

    function deleteConfirmDialogClose() {
        setDialogOpen(false);
    }

    function cancelHandler() {
        onCancel && onCancel();
    }

    return (
        <ConfirmDialog
            open={dialogOpen}
            title={`Удаление ${cartProductIds.length > 1 ? 'товаров' : 'товара'}`}
            text={`Вы действительно хотите удалить 
                    ${cartProductIds.length > 1 ? 'выбранные товары' : 'выбранный товар'}?`}
            btnText='Удалить'
            onConfirm={deleteConfirm}
            onClose={deleteConfirmDialogCloseHandler}
            onCancel={cancelHandler}
        />
    );
}

export default CartProductDeleteConfirmDialog;