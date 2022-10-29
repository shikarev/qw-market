import React, { useEffect, useState } from 'react';
import ConfirmDialog from "../../../Dialogs/ConfirmDialog";
import {useRemoveFeedbackMutation, useRemoveNoteMutation} from "../../../../api/productReviews";
//import { useDeleteAllProductsMutation, useMultipleDeleteMutation } from "../../../api/cart";


const NotesDeleteConfirmDialog = ({commentaryId, onClose, onConfirm, onCancel, open, commentsCount, setCommentsCount, setComments}:{
    commentaryId: string;
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    commentsCount?: any;
    setCommentsCount?: any;
    setComments?: any,
}) => {

    const [removeNote] = useRemoveNoteMutation();


    function deleteConfirm() {
        removeNote(commentaryId).then(() => {
            setCommentsCount(commentsCount - 1)
            setComments([])
        });

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
            title={'Удаление комментария'}
            text={'Вы действительно хотите удалить комментарий ?'}
            btnText='Удалить'
            onConfirm={deleteConfirm}
            onClose={onClose}
            onCancel={cancelHandler}
        />
    );
}

export default NotesDeleteConfirmDialog;