import styles from './offers.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import { Typography } from '@mui/material';
import honor from "../../../assets/brands_logo/huawei-honor-logo.png";
import apple from "../../../assets/brands_logo/apple_logo.png";
import samsung from "../../../assets/brands_logo/samsung_logo.png";
import offers from "../../../assets/offers/test_offer.png";

const cx= classNames.bind(styles);

const OffersBlock = React.memo(({brands}:{brands: boolean}) => { // TEST
    return (
        <div className={cx('offers')}>
            <div className={cx('offer')}>
                <img src={offers} alt='offer'/>
                <div className={cx('description')}>
                    <Typography className={cx('offerfirst')}>- Skincare Product</Typography>
                    <Typography className={cx('offersecond')}>Скидка 50% на продукты для вашей кожи</Typography>
                    <div className={cx('offerthird')}>
                        <Typography>Подойдет для подарка</Typography>
                    </div>
                </div>
            </div> 
            {brands &&
            <>
                <div className={cx('brand')}>
                    <img src={honor} alt='honor'/>
                </div>
                <div className={cx('brand')}>
                    <img src={apple} alt='apple'/>
                </div>
                <div className={cx('brand')}>
                    <img src={samsung} alt='samsung'/>
                </div>
            </>
            }
        </div>
    )
})

export default OffersBlock;