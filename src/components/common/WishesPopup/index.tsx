import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {closePopup, getWishAdding, getWishPayload} from "../../../store/wishlist";
import classNames from "classnames/bind";
import styles from './WishesPopup.module.scss';
import {wishlistsAPI} from "../../../api/wishlists";
import {BackUndo, CloseIcon} from "../../svgComponents/Icons/outlined";
import { Snackbar, Typography } from '@mui/material';
import {FavoritesFilled, WishesFilled} from "../../svgComponents/Icons/filled";
import {favoritesAPI} from "../../../api/favorites";
import {useLazyGetUserActivityQuery} from "../../../api/user";

const cx = classNames.bind(styles);

function WishesPopup() {
    const dispatch = useAppDispatch();
    const showPopup = useAppSelector(getWishAdding);
    const lastWishId = useAppSelector(getWishPayload);

    function handleRedo() {
        if (lastWishId.productId && lastWishId.type === 'wish') {
            dispatch(wishlistsAPI.endpoints.addWish.initiate(lastWishId.productId));
        } else if(lastWishId.productId && lastWishId.type === 'favorite') {
            dispatch(favoritesAPI.endpoints.addFavorite.initiate(lastWishId.productId));
        }
        dispatch(closePopup());
    }

    const [trigger, {data: userActivityData}] = useLazyGetUserActivityQuery();

    function handleClose(){
        dispatch(closePopup());
        trigger();
    }

    return <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={showPopup} autoHideDuration={5000} onClose={handleClose}>
        <div className={cx('root')}>
            <div className={cx('message')}>
                {(lastWishId.type === 'wish') ?
                    <>
                        <WishesFilled />
                        <Typography sx={{fontSize: '14px', fontWeight: 600}}>Товар удален из вишлиста</Typography>
                    </>
                        :
                    <>
                        <FavoritesFilled/>
                        <Typography sx={{fontSize: '14px', fontWeight: 600}}>Товар удален из избранного</Typography>
                    </>
                }
                <CloseIcon onClick={() => handleClose()}/>
            </div>
            <div className={cx('bottom')} onClick={() => handleRedo()}>
                <BackUndo/>
                <Typography className={cx('back')}>вернуть</Typography>
            </div>
        </div>
    </Snackbar>
}


export default WishesPopup;
