import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Grid,
  styled, Typography
} from '@mui/material';
import MuiCardContent from '@mui/material/CardContent';
import classNames from 'classnames/bind';
import styles from './CheckCard.module.scss';
import { QSimpleModal } from '../../common/Modals';
import PaymentMethodForm from '../Forms/PaymentMethod';
import RecipientForm from '../Forms/Recipient';
import DeliveryForms from '../Forms/Delivery';
import { Cash, CreditCard, Home, Location } from '../../svgComponents/Icons/outlined';
import CartPreview from '../CartPreview';

import { useGetRecipientsQuery } from '../../../api/orders';
import { useAppSelector } from '../../../store/hooks';
import {
  getSelectedAddressId,
  orderDeliveryType,
  orderPaymentType,
  orderSelfForm,
  selectedRecipientId
} from '../../../store/order';
import { Message, ProfileIcon } from '../../svgComponents/Icons';
import { useGetUserAddressesQuery } from '../../../api/address';
import { Address } from '../../../types/Address';

const cx = classNames.bind(styles);

const payments = ['Картой онлайн', 'Наличными при получении'];

const CardContent = styled(MuiCardContent)(() => ({
  root: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    },
    '& div:not(:last-child)': {
      marginBottom: '2rem'
    }
  }
}));

export function QCard({ children, title, editTitle, handleClick }: any) {

  return (
    <Card sx={{
      borderRadius: '4.4rem',
      padding: '2.4rem',
      border: `solid 2px`,
      borderColor: 'secondary.light',
      height: '100%',
      '& .MuiCardHeader-root': {
        padding: '0'
      },
      '& h4': {
        fontSize: '2.4rem'
      }}} elevation={0}>
      <Box sx={{
        marginBottom: '2.4rem',
        display: 'flex',
        justifyContent: 'space-between',
        '& p': {
          color: 'primary.main',
          fontWeight: 600,
          cursor: 'pointer'
        }}}>
        <Typography variant="h4">
          {title}
        </Typography>
        {handleClick &&
        <Typography onClick={handleClick}>
          {editTitle ?? 'изменить'}
        </Typography>
        }
      </Box>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

function CheckCard({ placeOrder }: any) {
  const { data: recipientsData } = useGetRecipientsQuery();
  const { data: addressesData } = useGetUserAddressesQuery({}, {
    selectFromResult: ({ data }) => ({
      data: data?.data
    })
  });
  const currentRecipientId = useAppSelector(selectedRecipientId);
  const currentAddressId = useAppSelector(getSelectedAddressId);
  const deliveryType = useAppSelector(orderDeliveryType);
  const selfFormData = useAppSelector(orderSelfForm);
  const paymentType = useAppSelector(orderPaymentType);
  const [currentRecipient, setCurrentRecipient] = useState<any>(undefined);
  const [openCourier, setOpenCourier] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openRecipient, setOpenRecipient] = useState(false);
  const [address, setAddress] = useState<Address | undefined>(undefined);

  useEffect(() => {
    if (currentRecipientId && recipientsData && recipientsData.data) {
      if (recipientsData.data.length < 1) {
        setCurrentRecipient(undefined);
      } else {
        setCurrentRecipient(recipientsData.data.find((x: any) => x.id === currentRecipientId));
      }
    } else {
      setCurrentRecipient(undefined);
    }
  }, [currentRecipientId, recipientsData]);

  useEffect(() => {
    if (currentAddressId && addressesData?.length) {
      const address = addressesData.find((x: any) => x.id === currentAddressId);
      setAddress(address.address);
    }
  }, [currentAddressId, addressesData]);

  return (
    <div className={cx('check')}>
      <Typography variant="h1">Проверьте данные</Typography>

      <QSimpleModal header='Доставка' show={openCourier} onClose={() => setOpenCourier(false)}>
        <DeliveryForms setShow={setOpenCourier} />
      </QSimpleModal>
      <QSimpleModal header='Способ оплаты' show={openPayment} onClose={() => setOpenPayment(false)}>
        <PaymentMethodForm setShow={setOpenPayment} />
      </QSimpleModal>
      <QSimpleModal header='Получатель' show={openRecipient} onClose={() => setOpenRecipient(false)}>
        <RecipientForm setShow={setOpenRecipient} />
      </QSimpleModal>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Grid alignItems='stretch' container spacing={4}>
            <Grid item xs={12}>
              {deliveryType === 1 &&
              <>
                <QCard title='Доставка курьером' handleClick={() => setOpenCourier(true)}>
                  {address &&
                  <div className={cx('card_content')}>
                    <Home />
                    <div className={cx('card_description')}>
                                                <span className={cx('card_description_main')}>
                                                    {`${address.name}, кв. ${address.room}`}
                                                </span>
                      <p
                        className={cx('card_description_additional')}>{`Подъезд ${address.entrance}, этаж ${address.floor}`}</p>
                    </div>
                  </div>
                  }
                  {address && address.description &&
                  <div className={cx('card_content')}>
                    <Message />
                    <div className={cx('card_description')}>
                                            <span className={cx('card_description_main')}>
                                                {`Комментарий`}
                                            </span>
                      <Typography className={cx('card_description_additional')}>{address.description}</Typography>
                    </div>
                  </div>}
                </QCard>
              </>
              }
              {deliveryType === 0 &&
              <QCard title='Самовывоз' handleClick={() => setOpenCourier(true)}>
                {selfFormData &&
                <div className={cx('card_content')}>
                  <Location />
                  <div className={cx('card_description')}>
                                                <Typography className={cx('card_description_main')}>
                                                    {`${selfFormData.address}`}
                                                </Typography>
                    <Typography className={cx('card_description_additional')}>{`Пн-Вс 9:00 - 23:00`}</Typography>
                  </div>
                </div>
                }
              </QCard>
              }
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <QCard title='Получатель' handleClick={() => setOpenRecipient(true)}>
                <>
                  {currentRecipient ?
                    <div className={cx('card_content')}>
                      <ProfileIcon />
                      <div className={cx('card_description')}>
                                                <span className={cx('card_description_main')}>
                                                    {`${currentRecipient.name}`}
                                                </span>
                        <Typography className={cx('card_description_additional')}>{currentRecipient.email}</Typography>
                        <Typography className={cx('card_description_additional')}>{currentRecipient.phone}</Typography>
                      </div>
                    </div>
                    :
                    <Typography>Не выбран!</Typography>
                  }
                </>
              </QCard>
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
              <QCard title='Способ оплаты' handleClick={() => setOpenPayment(true)}>
                <div className={cx('card_content')}>
                  {paymentType === 1 ? <Cash /> : <CreditCard />}
                  <div className={cx('card_description')}>
                                        <span className={cx('card_description_main')}>
                                            {payments[paymentType]}
                                        </span>
                  </div>
                </div>
              </QCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <CartPreview handleOrder={placeOrder} />
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckCard;