import MuiModal from '@mui/material/Modal';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import MuiBackdrop from '@mui/material/Backdrop';
import {ReactComponent as CloseIcon} from '../../../assets/Icons/outlined/Close X.svg?svgr';
import {Box, styled, Typography} from "@mui/material";

const cx = classNames.bind(styles);

const Backdrop = styled(MuiBackdrop)(() => ({
    backgroundColor: 'rgba(26, 32, 44, 0.3)',
    backdropFilter: 'blur(10px)'
}))

const Modal = styled(MuiModal)(() => ({}))

interface IQSimpleModal {
    header?: string;
    children: JSX.Element | JSX.Element[];
    show: boolean;
    onClose: () => void;
    scrollable?: boolean;
}

export const QSimpleModal = ({header, children, show, onClose, scrollable}: IQSimpleModal) => {
    return (<Modal
            disableEnforceFocus
            disableAutoFocus
            open={show}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Box className={cx('root')}>
                <Box className={cx('inner')} sx={{backgroundColor: 'white'}}>
                    <div className={cx('header')}>
                        {header ? <Typography sx={{fontSize: '2.4rem', fontWeight: 600}}>{header}</Typography> :
                            <span/>}
                        <CloseIcon className={cx('icon')} onClick={() => onClose()}/>
                    </div>
                    <div className={cx('inner-scroll')}>
                        {children}
                    </div>
                </Box>
            </Box>
        </Modal>
    );
};