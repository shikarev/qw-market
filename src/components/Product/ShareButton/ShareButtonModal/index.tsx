import React, {useState} from "react";
import {Share} from "../../../svgComponents/Icons/outlined";
import IconLink from "../../../IconLink";
import ShareConfirmDialog from "./ShareConfirmDialog";

export default function ShareButtonModal() {

    const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);

    function deleteConfirmDialogCloseHandler() {
        setShareDialogOpen(false);
    }

    return (
        <>
            <IconLink
                icon={Share}
                text='Поделиться'
                active={false}
                callback={() => setShareDialogOpen(true)}
            />

            <ShareConfirmDialog
                open={shareDialogOpen}
                onClose={deleteConfirmDialogCloseHandler}
            />
        </>
    )
}