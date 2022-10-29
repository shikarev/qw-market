import React from 'react';
import ConfirmDialog from "../../../Dialogs/ConfirmDialog";
import { useRemoveQuestionMutation } from '../../../../api/productQuestions';


const QuestionDeleteConfirmDialog = ({questionId, onClose, onConfirm, onCancel, open}: {
    questionId: string;
    open: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}) => {

    const [removeQuestion] = useRemoveQuestionMutation();


    function deleteConfirm() {
        removeQuestion(questionId);
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
            title={'Удаление вопроса'}
            text={'Вы действительно хотите удалить вопрос ?'}
            btnText='Удалить'
            onConfirm={deleteConfirm}
            onClose={onClose}
            onCancel={cancelHandler}
        />
    );
}

export default QuestionDeleteConfirmDialog;