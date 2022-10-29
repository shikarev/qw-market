import React from 'react';
import styles from './wishesMiniLink.module.scss';
import SvgIcon from '@mui/material/SvgIcon';
import classNames from "classnames/bind";
import {WishesFilled} from "../../../../svgComponents/Icons/filled";

const cx = classNames.bind(styles);

type Props = {
    className?: string,
    icon?: any,
    text?: string | null,
    active?: boolean,
    callback?: (e:React.MouseEvent<HTMLDivElement>) => void
}

const WishesMiniLink: React.FunctionComponent<Props> = ({className, icon, text, active = false, callback}:Props) => {
    return (
        <div className={cx('wrapper', className)} onClick={callback}>
            {active ? <SvgIcon className={cx(active && 'iconactive', 'icon', 'size', 'shadow')} component={WishesFilled} /> : <SvgIcon className={cx(active && 'iconactive', 'icon', 'size', 'shadow')} component={icon} /> }
        </div>
    );
}

export default WishesMiniLink;
