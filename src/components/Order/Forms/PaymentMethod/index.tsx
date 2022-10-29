import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import styles from './PaymentMethod.module.scss';
import {QToggleButtonGroup} from "../../../common/Buttons/ToggleButtonGroup";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import { paymentType} from "../../../../types/Order";
import {
    orderPaymentType, setPaymentType,
    setAllowNextStep, setDisableNextButton,
} from "../../../../store/order";
import {QFormToggleButton} from "../../../common/Buttons/ToggleButtons";
import {Cash, CreditCard, Edit} from "../../../svgComponents/Icons/outlined";

import {DeleteIcon} from "../../../svgComponents/Icons";
import PaymentStep from "../PaymentByCard";
import { Button, Grid, Typography } from '@mui/material';


const cx = classNames.bind(styles);

export const OrderCard = ({icon, children, title, deleteCard, editCard, selected, disableEdit}: any) => {
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete(props: any) {
        setIsDeleting(true);
        deleteCard(props);
    }

    return (
        <div className={cx('card', selected && 'card__selected', isDeleting && 'card__disabled')}>
            {icon}
            <div className={cx('card-info')}>
                <Typography variant='h6' className={cx('card-info__title')}>
                    {title}
                </Typography>
                <div className={cx('card-description')}>
                    {children}
                </div>
            </div>
            {!disableEdit &&
            <div className={cx('card-controls')}>
                {!!editCard &&
                <Edit onClick={editCard}/>
                }
                {!!handleDelete &&
                <DeleteIcon className={cx('card-controls__danger')} onClick={handleDelete}/>
                }
            </div>
            }
        </div>
    )
}

const PaymentByCashForm = ({hideSubmit, setShow}:any) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setDisableNextButton(false));
    }, [])
    return (
        <>
            <Typography>Наличными при получении</Typography>
            {!hideSubmit &&
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        size='medium'
                        className={cx('button')}
                        onClick={() => setShow()}
                    >
                        Сохранить
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button className={cx('button')} variant='outlined' color='secondary' size='medium'
                            onClick={() => setShow()}>
                        Отменить
                    </Button>
                </Grid>
            </Grid>}
        </>)
}

function PaymentSteps({setShow, hideSubmit}:any) {
    const selectedPaymentType = useAppSelector(orderPaymentType);
    const [isNewCard, setIsNewCard] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const dispatch = useAppDispatch();

    const handleSelect = (event: React.MouseEvent<HTMLElement>, newType:paymentType) => {
        if (newType !== null) {
            dispatch(setPaymentType(newType))
        }
    }

    useEffect(() => {
        if(!selectedPaymentType){
            dispatch(setPaymentType(paymentType.cardOnline))
        }
        dispatch(setAllowNextStep(false));
    }, [selectedPaymentType])


    return (
        <div className={cx('cards_root')}>
            {!isNewCard && !isEdit &&
            <QToggleButtonGroup
                className={cx('method')}
                key="toggle_1"
                value={selectedPaymentType}
                exclusive
                onChange={handleSelect}
                aria-label="text alignment"
            >
                <QFormToggleButton value={0}><CreditCard/>Картой онлайн</QFormToggleButton>
                <QFormToggleButton value={1}><Cash/>При получении</QFormToggleButton>
            </QToggleButtonGroup>
            }
            {
                selectedPaymentType === paymentType.cardOnline &&
                <div className={cx('root')}>
                    <PaymentStep
                        setIsNewCard={setIsNewCard}
                        isNewCard={isNewCard}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        hideSubmit={hideSubmit}
                        setShow={setShow}/>
                </div>
            }
            {
                selectedPaymentType === paymentType.cash &&
                <div className={cx('root')}>
                    <PaymentByCashForm hideSubmit={hideSubmit} setShow={setShow}/>
                </div>
            }
        </div>
    );
}

export default PaymentSteps;