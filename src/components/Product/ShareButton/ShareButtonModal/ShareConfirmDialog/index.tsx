import React, { useEffect, useState } from 'react';
import ShareContent from "./ShareContent";

//import { useDeleteAllProductsMutation, useMultipleDeleteMutation } from "../../../api/cart";


const ShareConfirmDialog = ({onClose, onCancel, open}: { open: boolean; onClose?: () => void; onCancel?: () => void; }) => {

    function cancelHandler() {
        onCancel && onCancel();
    }

    return (
        <ShareContent
            open={open}
            title={'Поделиться'}
            onClose={onClose}
            onCancel={cancelHandler}
        />
    );
}

export default ShareConfirmDialog;