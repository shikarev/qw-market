import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames/bind";
import { Typography } from '@mui/material';

const cx = classNames.bind(styles);

const UnderConstruction = ({...props}) => {
    const {id, title} = props
    return (
        <div className={cx('under_construction')}>
            <Typography variant="h1">Эта страница нахоодится в разработке</Typography>
            <Typography> {title} {id}</Typography>
        </div>
    )
};

export default UnderConstruction;