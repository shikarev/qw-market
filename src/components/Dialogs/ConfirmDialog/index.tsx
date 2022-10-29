import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, SvgIcon} from "@mui/material";
import {CloseIcon} from "../../svgComponents/Icons/outlined";

export interface ConfirmDialogArgs {
    open: boolean;
    title: string;
    text: string;
    btnText: string;
    onConfirm: () => void;
    onClose?: () => void;
    onCancel?: () => void;
}

const ConfirmDialog = ({open, text, btnText, title, onConfirm, onCancel, onClose}: ConfirmDialogArgs) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    function confirmHendler() {
        onConfirm();
    }

    function cancelHendler() {
        close();
        onCancel && onCancel();
    }

    function closeHendler(e: {}, reason: 'backdropClick' | 'escapeKeyDown') {
        if (reason === 'escapeKeyDown') {
            close();
        }

        if (reason === 'backdropClick') {
            close();
        }
    }

    function close() {
        setDialogOpen(false);
        if (onClose) {
            onClose();
        }
    }

    return (
        <Dialog
            // className={cx(classes.root)}
            onClose={closeHendler}
            open={dialogOpen}
            sx={{'& .MuiDialog-paperWidthSm': {
                    maxWidth: 650,
                },
                '& .MuiBackdrop-root': {
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(26, 32, 44, 0.3)',
                },
                '& .MuiPaper-root': {
                    padding: '1.6rem',
                    borderRadius: '4.4rem',
                    boxShadow: 'none'
                }}}
        >
            <IconButton sx={{position: 'absolute', top: '1.6rem', right: '1.6rem', '& svg': { width: '24px', height: '24px'}}} onClick={close}>
                <SvgIcon component={CloseIcon} />
            </IconButton>

            <DialogTitle sx={{fontWeight: 'bold', fontSize: 40}}>{title}</DialogTitle>
            <DialogContent sx={{paddingBottom: '3rem', fontWeight: 600, fontSize: 20}}>{text}</DialogContent>

            <DialogActions sx={{justifyContent: 'flex-start', padding: '16px 24px'}}>

                <Button onClick={confirmHendler}
                        variant='contained'
                        color='primary'
                        sx={{padding: '1.2rem 1.6rem',
                            fontSize: '1.6rem',
                            maxHeight: '4.4rem',
                            fontWeight: 600,
                            minWidth: '12rem',
                            lineHeight: '2rem'}}
                >{btnText}</Button>

                <Button /*className={cx(classes.cancelBtn)}*/
                        onClick={cancelHendler}
                        color='secondary'
                        sx={{padding: '1.2rem 1.6rem',
                            fontSize: '1.6rem',
                            maxHeight: '4.4rem',
                            fontWeight: 600,
                            minWidth: '12rem',
                            lineHeight: '2rem'}}
                >Отменить</Button>

            </DialogActions>

        </Dialog>
    );
}

export default ConfirmDialog;
