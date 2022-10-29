import React from 'react';
import styles from './Review.module.scss';
import classNames from "classnames/bind";
import placeholder from '../../../../assets/placeHolders/noImagePlaceholder.svg';
import {imageOnErrorHandler, imageOnLoadHandler} from "../../../../utils/imgError";
import {Typography} from "@mui/material";
import {sxUtils} from "@qwangy/styles";

const cx = classNames.bind(styles);

const Review = (props:any) => {

    return (
        <div className={cx('root')} onClick={props.onClick}>
            <Typography className={cx('badge')}>Обзор</Typography>
            <img src={props.image ?? placeholder} alt='...' onLoad={imageOnLoadHandler} onError={imageOnErrorHandler} />
            <Typography className={cx('description')} sx={{...sxUtils.fixedLines(2)}}>{props.description.replace('-', '-\u2060')}</Typography>
        </div>
    );
};

export default Review;