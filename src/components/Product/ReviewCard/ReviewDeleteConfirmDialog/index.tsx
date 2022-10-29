import React, { useEffect, useState } from 'react';
import ConfirmDialog from "../../../Dialogs/ConfirmDialog";
import {useRemoveFeedbackMutation} from "../../../../api/productReviews";
//import { useDeleteAllProductsMutation, useMultipleDeleteMutation } from "../../../api/cart";


const ReviewDeleteConfirmDialog = ({commentaryId, onClose, onConfirm, onCancel, open}: {
    commentaryId: string;
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}) => {

    const [removeFeedback] = useRemoveFeedbackMutation();


    function deleteConfirm() {
        removeFeedback(commentaryId);
        if(onClose) {
            onClose();
        }
    }


    function cancelHandler() {
        onCancel && onCancel();
    }

    return (
        <ConfirmDialog
            open={open}
            title={'Удаление отзыва'}
            text={'Вы действительно хотите удалить отзыв ?'}
            btnText='Удалить'
            onConfirm={deleteConfirm}
            onClose={onClose}
            onCancel={cancelHandler}
        />
    );
}

export default ReviewDeleteConfirmDialog;