import React from 'react';
import { useRemoveFeedbackMutation } from '../../../../api/productReviews';
import { redirectToLogin } from '../../../../utils/utils';
import ConfirmDialog from '../../../Dialogs/ConfirmDialog';

const QuestionCreateConfirmDialog = ({commentaryId, onClose, onConfirm, onCancel, open}: {
    commentaryId?: string;
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}) => {

    const [removeFeedback] = useRemoveFeedbackMutation();


    function deleteConfirm() {
        if(commentaryId) {
            removeFeedback(commentaryId);
            if(onClose) {
                onClose();
            }
        }
    }

    function authConfirm() {
        redirectToLogin();

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
            title={'Авторизация'}
            text={'Для написания вопроса, пожалуйста авторизуйтесь'}
            btnText='Авторизироваться'
            onConfirm={authConfirm}
            onClose={onClose}
            onCancel={cancelHandler}
        />
    );
}

export default QuestionCreateConfirmDialog;
