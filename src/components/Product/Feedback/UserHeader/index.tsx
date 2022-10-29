import QwAvatar from "../../../Helpers/QwAvatar";
import moment from "moment";
import React from "react";
import classNames from "classnames/bind";
import styles from "./userHeader.module.scss";
import { Box, Typography } from '@mui/material';
import {Rating} from '@qwangy/styles';

const cx = classNames.bind(styles);

interface IUserHeader {
    user_name?: string,
    user_picture_path?: string,
    created?: string,
    rate?: number,
}

const UserHeader = (props:IUserHeader) => {

    return(
        <Box className={cx('container')}>
            <QwAvatar userName={props.user_name} userAvatar={props.user_picture_path} />
            <Box className={cx('main')}>
                <Box className={cx('title')}>
                    <Typography className={cx('userName')}>{props.user_name}</Typography>
                    <Typography className={cx('commentTime')}>{moment(props.created).format("DD MMMM YYYY")}</Typography>
                </Box>
                {props.rate ?
                <Box className={cx('rating')}>
                  <Rating value={props.rate!} name="rating" readOnly sx={{fontSize: '2rem', height: '2rem', '.MuiRating-iconEmpty': { color: 'rgba(0, 0, 0, 0.26)' }}} />
                  <Typography className={cx('ratingValue')}>{props.rate}</Typography>
                </Box>:null
                }
            </Box>
        </Box>
    )
}

export default UserHeader;