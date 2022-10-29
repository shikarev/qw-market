import React from 'react';
import styles from './wishesIconLink.module.scss';
import SvgIcon from '@mui/material/SvgIcon';
import classNames from "classnames/bind";
import {WishesFilled} from "../../../../svgComponents/Icons/filled";
import { Box, Typography } from '@mui/material';

const cx = classNames.bind(styles);

type Props = {
    className?: string,
    icon?: any,
    text?: string | null,
    active?: boolean,
    callback?: (e:React.MouseEvent<HTMLDivElement>) => void
}

const WishesIconLink: React.FunctionComponent<Props> = ({className, icon, text, active = false, callback}:Props) => {
    return (
        <Box className={cx('wrapper', className)} onClick={callback}>
            <span className={cx('size')}>
                {active ? <SvgIcon className={cx(active && 'iconactive', 'icon', 'size')} component={WishesFilled} /> : <SvgIcon className={cx(active && 'iconactive', 'icon', 'size')} component={icon} /> }
            </span>
          <Typography className={cx('text', active && 'active')} sx={{minWidth: '11rem'}}>{text}</Typography>
        </Box>
    );
}

export default WishesIconLink;
