import {IReviewArticle} from "../../types/ReviewArticle";
import { IconButton, SvgIcon, Typography } from '@mui/material';
import {PlayButton, ViewIcon} from "../svgComponents/Icons";
import classNames from "classnames/bind";
import React from "react";
import styles from "./PlayerCard.module.scss"
const cx = classNames.bind(styles)

function ProductPlayer(props:IReviewArticle) {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('media')} style={{backgroundImage: `url(${props.image || 'https://picsum.photos/id/668/300'})`}}>
                <IconButton className={cx('playButton')}><SvgIcon className={cx('playAction')} component={PlayButton} fill="none"
                                                                  width="80" height="80" viewBox="0 0 80 80"/></IconButton>
                <div className={cx('background')}/>
                <div className={cx('playerContainer')}>
                    <Typography className={cx('productName')}>{props.description}</Typography>
                    <div className={cx('viewCounter')}><SvgIcon component={ViewIcon} fill="none"/>&nbsp;&nbsp;{props.view_count === undefined? 0: props.view_count}</div>
                </div>
            </div>
        </div>
    )
}

export default ProductPlayer;