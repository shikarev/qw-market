import { Box, Button, IconButton, styled, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetVendorDataQuery } from '../../api/vendors';
import shopPlaceholder from '../../assets/placeHolders/shopPlaceholder.svg';
import BreadCrumbs from '../../components/common/BreadCrumbs';
import { ExpanderText } from '../../components/Expander';
import { abbreviateNumber } from '../../components/Product/OrderDetails';
import { RateStar, Verified } from '../../components/svgComponents/Icons/filled';
import { AvatarFrame, ChatIcon, PlusIcon, VendorLocation } from '../../components/svgComponents/Icons/outlined';
import TabPanel from '../../components/Vendor/TabPanel';
import { toTrueWordForm } from '../../utils/toTrueWordForm';
import styles from './vendor.module.scss';

const cx = classNames.bind(styles);

const QIconButton = styled(IconButton)(() => ({
    border: '1px solid rgba(235, 79, 90, 0.1)',
    padding: '11px',

    '& .span svg': {
        color: 'black',
    },
}))

const QSubscribeButton = styled(Button)(() => ({
    fontWeight: 'bold',
    fontSize: '1.6rem',
    lineHeight: '1.9rem',
    padding: '1.85rem 2rem',
}))

const QChatButton = styled(Button)(() => ({
    color: '#1A202C',
    fontWeight: 'bold',
    fontSize: '1.6rem',
    lineHeight: '1.9rem',
    padding: '1.85rem 2rem',
    backgroundColor: 'white',
    boxShadow: '0px 0px 18px 0px rgba(0, 0, 0, 0.08)',
    border: 0,
    '&:hover': {
        border: 0,
        boxShadow: '0px 0px 18px 0px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#fff4f4',
    },
    '&:focus': {
        border: '0',
        boxShadow: 'inset 0 0 0 1px #dfdfdf, 0 0 0 0.8rem #f6f7fbcc',
    },
}))

const VendorPage = () => {

    const {id} = useParams()
    const {data: vendorData} = useGetVendorDataQuery(id, {skip: !id});

    return (
        <Box className={cx('wrapper')}>
          <Box className={cx('vendor-bg')}/>
          <Box className={cx('nav')}>
            <BreadCrumbs />
          </Box>
          <Box className={cx('section')}>

            <div className={cx('titleContainer')}>
              <div className={cx('logoContainer')}>
                <AvatarFrame className={cx('frame')} />
                <Verified className={cx('verified')} />
                {vendorData &&
                  <div className={cx('rating')}>
                    {abbreviateNumber(vendorData.rating?.toFixed(1))}
                    <RateStar className={cx('star')} />
                  </div>
                }
                <div style={{backgroundImage: `url(${vendorData?.picturePath || shopPlaceholder})`}}
                     className={cx('companyLogo')}/>
              </div>

              <div className={cx('title')}>
                <Typography variant="h1">{vendorData?.name}</Typography>
              </div>

              {vendorData &&
                <div className={cx('subTitle')}>
                  {vendorData.address &&
                    <>
                      <VendorLocation/>
                      <Typography className={cx('city')}>{vendorData.address?.name}</Typography>
                    </>
                  }
                  <Typography>{toTrueWordForm(vendorData.product_count, ['товар', 'товара', 'товаров'])} • {toTrueWordForm(vendorData.subscriber_count, ['подписчик', 'подписчика', 'подписчиков'])}</Typography>
                </div>
              }

              {vendorData &&
                <div className={cx('description')}>
                  {vendorData.description &&
                    <ExpanderText showCount={200} >
                      {vendorData.description}
                    </ExpanderText>
                  }
                </div>
              }

              <div className={cx('buttonsContainer')}>
                <QSubscribeButton
                  variant="contained"
                  color="primary"
                  startIcon={<PlusIcon/>}
                >
                  Подписаться
                </QSubscribeButton>

                <QChatButton
                  variant="outlined"
                  color="secondary"
                  startIcon={<ChatIcon/>}
                >
                  Чат с консультантом
                </QChatButton>
              </div>

              <TabPanel />

            </div>
          </Box>
        </Box>
    )
}

export default VendorPage;
