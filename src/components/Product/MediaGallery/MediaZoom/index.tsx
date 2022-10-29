import {ZoomBtn} from "../../../svgComponents/Icons";
import Modal from "@mui/material/Modal";
import FullView from "../FullView";
import React, {useState} from "react";
import {styled, withStyles} from "@mui/material";
import MuiBackdrop from "@mui/material/Backdrop";
import classNames from "classnames/bind";
import styles from "./mediaZoom.module.scss";

const cx = classNames.bind(styles);

const MediaZoom = ({productMedia}:any) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const Backdrop = styled(MuiBackdrop)(() => ({
        root: {
            transition: 'opacity 0ms !important',
            backgroundColor: 'rgba(26, 32, 44, 0.3)',
            backdropFilter: 'blur(10px)'
        }
    }))

    return (
        <>
            <ZoomBtn className={cx('zoom')} onClick={() => handleOpen()}  />
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className=""
                open={open}
                onClose={handleClose}
                closeAfterTransition
                disableEnforceFocus
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <>
                    <FullView handleClose={handleClose} productMedia={productMedia} />
                </>
            </Modal>
        </>
    )
}

export default MediaZoom;