import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { Rating } from '@qwangy/styles';
import classNames from 'classnames/bind';
import moment from 'moment';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getDiscount } from '../../../pages/Product';
import { IOrderDetails } from '../../../types/Product'
import { numberWithSpaces } from '../../../utils/numberWithSpaces'
import { toTrueWordForm } from '../../../utils/toTrueWordForm';
import CartButton from '../../Cart/CartButton';
import styles from './orderDetails.module.scss'

moment.locale('ru')

const cx = classNames.bind(styles);

export function abbreviateNumber(value: any) {
    let newValue = value;
    const suffixes = ["", "K", "M", "B","T"];
    let suffixNum = 0;
    while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
    }

    newValue = Math.round(newValue * 100) / 100;

    newValue += suffixes[suffixNum];
    return newValue;
}

const OrderDetails = ({cost, oldCost, points, productId, vendorName, vendorRating, vendorFeedback, vendorPayment, vendorDelivery, offersCount, currency, minCost, priceId, isFetching}:IOrderDetails) => {

    const navigate = useNavigate()

    const matches = useMediaQuery('(max-width:300px)');

    let productMod = new URLSearchParams(window.location.search).toString();

    const handleClickOffers = (productId:any) => {
      navigate(`/product/${productId}/offers?${productMod}`);
    }

    const discount = getDiscount(oldCost, cost)

    return (
        <Box className={cx('wrapper')}>

            {discount > 0 &&
              <Typography className={cx('discount', 'noselect', 'text')}>{`Скидка ${discount}%`}</Typography>
            }

            {oldCost > cost &&
              <Typography className={cx('oldprice')}>{`${numberWithSpaces(oldCost) || 0} ${currency}`}</Typography>
            }

            <Box className={cx('price')}>
              {cost &&
                <Typography sx={{fontSize: '3.4rem', fontWeight: 700}}>
                  <span>{numberWithSpaces(cost) || 0}</span>
                  <span className={cx('currency')}>{currency}</span>
                </Typography>
              }

              {points &&
              <Typography className={cx('bonus')}>{`${points || 0} баллов`}</Typography>
              }
            </Box>

            <Box className={cx('info')}>
                {vendorDelivery?.map((data, index) =>
                  <Typography key={index} className={cx('delivery')}>{data.timeframe ? `${data.name},  ${moment().add(data.timeframe, 'days').format("Do MMMM")}` : data.name} — <span className={cx('bold')}>{data.cost ? `${data.cost} ${currency}` : `бесплатно`}</span></Typography>
                )}
                <Typography className={cx('storage')}>Склад продавца</Typography>
                {vendorPayment?.map((data, index) =>
                <Typography key={index} className={cx('delivery')}>{index + 1 !== vendorPayment?.length ? `${data.name},` : data.name}</Typography>
                )}
            </Box>

            <CartButton
                productId={productId || ''}
                priceId={priceId || ''}
                className={cx('cartButtonPosition')}
                size={matches ? 'small' : 'large'}
                bigSize
            >
                В корзину
            </CartButton>

            <Box className={cx('subInfo')}>
              <Typography className={cx('brandName')}>{vendorName}</Typography>
              {vendorRating! > 0 &&<Rating readOnly name="rating" value={vendorRating!} sx={{pr: '0.8rem', fontSize: '2rem', height: '2rem', '.MuiRating-iconEmpty': { color: 'rgba(0, 0, 0, 0.26)' }}} />}

              {vendorFeedback &&
              <Typography className={cx('review', 'color')}>{abbreviateNumber(vendorFeedback)}</Typography>
              }
            </Box>
            {offersCount > 0 ?
            <div className={cx('subButton')}>
                {!isFetching ?
                <Button className={cx('moreOffers')} sx={{border: '2px solid #eb4f5a', width: '100%', '&:hover':{backgroundColor: '#eb4f5a', color: 'white'}}} variant="outlined" color="primary" onClick={() => handleClickOffers(productId)}>
                   {`Еще ${toTrueWordForm(offersCount, ['предложение', 'предложения', 'предложений'])} от ${numberWithSpaces(minCost || cost)} ${currency}`}
                </Button>
                :
                <Button className={cx('moreOffers')} sx={{border: '2px solid #eb4f5a', width: '100%', '&:hover':{backgroundColor: '#eb4f5a', color: 'white'}}} variant="outlined" color="primary" onClick={() => handleClickOffers(productId)} disabled>
                    {`Еще ${toTrueWordForm(offersCount, ['предложение', 'предложения', 'предложений'])} от ${numberWithSpaces(minCost || cost)} ${currency}`}
                </Button>}
            </div>:null
            }
        </Box>
    )
}

export default OrderDetails;
