import React from 'react';
import styles from './favoritesMiniLink.module.scss';
import SvgIcon from '@mui/material/SvgIcon';
import classNames from "classnames/bind";
import {FavoriteIconActive, FavoritesFilled} from "../../../../svgComponents/Icons/filled";

const cx = classNames.bind(styles);

type Props = {
    className?: string,
    icon?: any,
    text?: string | null,
    active?: boolean,
    callback?: (e:React.MouseEvent<HTMLDivElement>) => void
}

const FavoritesMiniLink: React.FunctionComponent<Props> = ({className, icon, text, active = false, callback}:Props) => {
    return (
        <div className={cx('wrapper', className)} onClick={callback}>
            {active ? <SvgIcon className={cx(active && 'iconactive', 'icon', 'size', 'shadow')} component={FavoritesFilled} /> : <SvgIcon className={cx(active && 'iconactive', 'icon', 'size', 'shadow')} component={icon} /> }
        </div>
    );
}

export default FavoritesMiniLink;
