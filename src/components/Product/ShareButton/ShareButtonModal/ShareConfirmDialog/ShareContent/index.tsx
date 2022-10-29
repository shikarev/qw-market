import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import {Button, Dialog, IconButton} from "@mui/material";
import {CloseIcon} from "../../../../../svgComponents/Icons/outlined";
import ClipboardCopy from "../../ClipboardCopy";
// import {makeStyles} from "@mui/styles";

/*const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiDialog-paperWidthSm': {
                minWidth: 300,
                maxWidth: 690,
            },
            '& .MuiBackdrop-root': {
                backdropFilter: 'blur(10px)',
                background: 'rgba(26, 32, 44, 0.3)',
            },
            '& .MuiPaper-root': {
                padding: theme.spacing(2),
                borderRadius: 44,
                boxShadow: 'none'
            }
        },
    })
);*/

const cx = classNames.bind(styles);

export interface ConfirmDialogArgs {
    open: boolean;
    title: string;
    text?: string;
    btnText?: string;
    onConfirm?: () => void;
    onClose?: () => void;
    onCancel?: () => void;
}

const ShareContent = ({open, title, onCancel, onClose}: any) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    // const classes = useStyles();

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    function confirmHandler() {
        //onConfirm();
    }

    const viewLink = window.location.href

    function cancelHandler() {
        close();
        onCancel && onCancel();
    }

    function closeHandler(e: {}, reason: 'backdropClick' | 'escapeKeyDown') {
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
          onClose={closeHandler}
          open={dialogOpen}
          sx={{'& .MuiDialog-paperWidthSm': {
              minWidth: 300,
              maxWidth: 690,
            },
            '& .MuiBackdrop-root': {
              backdropFilter: 'blur(10px)',
              background: 'rgba(26, 32, 44, 0.3)',
            },
            '& .MuiPaper-root': {
              padding: '20px',
              borderRadius: '44px',
              boxShadow: 'none'
          }}}
        >
            <div className={cx('wrapper')}>
                <div className={cx('close')}>
                    <IconButton className={cx('closeBtn')} onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <div className={cx('container')}>
                    <div className={cx('title')}>{title}</div>

                    <ClipboardCopy copyText={viewLink} />

                    <Button
                        onClick={confirmHandler}
                        variant='contained'
                        color='primary'
                    >
                        В мессенджер
                    </Button>
                </div>




            </div>

        </Dialog>
    );
}

export default ShareContent;
