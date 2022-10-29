import React from 'react';
import ConfirmDialog from "../../../Dialogs/ConfirmDialog";
import {useRemoveNoteNoteMutation} from "../../../../api/productReviews";
//import { useDeleteAllProductsMutation, useMultipleDeleteMutation } from "../../../api/cart";

const AnswerDeleteConfirmDialog = ({CommentaryId, onClose, onConfirm, onCancel, open, setNotesComments, setCommentsCount, commentsCount}: {
    CommentaryId: string;
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    setNotesComments?: any,
    setCommentsCount?: any,
    commentsCount?: any,
}) => {

    const [removeNote] = useRemoveNoteNoteMutation();

    function deleteConfirm() {
        removeNote(CommentaryId).then((r:any) => {
            /*if(r.data && r.data.code && r.data.code === 500) {
                alert('500!');
            } else if(r.data && r.data.code && r.data.code === 200) {
                setCommentsCount(commentsCount - 1)
                setNotesComments([])
            }*/
            setCommentsCount(commentsCount - 1)
            setNotesComments([])
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

export default AnswerDeleteConfirmDialog;