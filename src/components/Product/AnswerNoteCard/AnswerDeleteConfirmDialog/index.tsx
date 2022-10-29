import React from 'react';
import ConfirmDialog from "../../../Dialogs/ConfirmDialog";
import {useRemoveNoteNoteMutation} from "../../../../api/productReviews";
//import { useDeleteAllProductsMutation, useMultipleDeleteMutation } from "../../../api/cart";

const AnswerDeleteConfirmDialog = ({CommentaryId, onClose, onConfirm, onCancel, open}: {
    CommentaryId: string;
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}) => {

    const [removeNote] = useRemoveNoteNoteMutation();

    function deleteConfirm() {
        removeNote(CommentaryId);
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

export default AnswerDeleteConfirmDialog;