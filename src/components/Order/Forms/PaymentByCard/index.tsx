import { Grid, Typography, Button } from '@mui/material';
import {QFormTextField} from "../../../common/TextFields";
import {QCheckbox, QFormControlLabel} from "../../../common/Controls";
import InputMask from 'react-input-mask';
import {QCircularProgress} from "../../../common/Progress";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import classNames from "classnames/bind";
import styles from "../PaymentMethod/PaymentMethod.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {
    clearBankCardForm, getPaymentToEditId,
    getSelectedPaymentId, orderPaymentForm,
    setAllowNextStep,
    setCreationStep,
    setDisableNextButton,
    setPaymentForm,
    setPaymentToEditId,
    setSelectedPaymentId,
    setSubmitting
} from "../../../../store/order";
import {
    useAddCardMutation,
    useDeleteCardMutation,
    useGetCardsQuery,
    useUpdateCardMutation
} from "../../../../api/orders";
import {CreditCard} from "../../../svgComponents/Icons/outlined";
import {OrderCard} from "../PaymentMethod";

const cx = classNames.bind(styles);

export const PaymentByCardForm = ({hideSubmit, setShow, setCardEdit, totalCardsCount, title, isNewCard}: any) => {
    const [addCard] = useAddCardMutation();
    const [updateCard] = useUpdateCardMutation();
    const paymentFormData = useAppSelector(orderPaymentForm);
    const cardToEditId = useAppSelector(getPaymentToEditId);
    const dispatch = useAppDispatch();

    const validationSchemaCard = Yup.object().shape({
        name: Yup.string()
            .matches(/^[aA-zZ\s]+$/, "Только латинские символы")
            .required('Обязательное поле'),
        number: Yup.string()
            //.matches(/^[0-9]+$/, "Только цифры")
            .min(13, 'Номер карты не может быть менее 13 цифр')
            .max(19, 'Номер карты не может быть более 19 цифр')
            .required('Обязательное поле'),
        expired: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'формат ММ/ГГ')
            .required('Обязательное поле'),
        code: Yup.string()
            .matches(/^[0-9]+$/, "Только цифры")
            .min(3, 'Код состоит из 3 цифр')
            .max(3, 'Код состоит из 3 цифр')
            .required('Обязательное поле'),
    });

    function addNewCard(values: any) {
        dispatch(setSubmitting(true));
        dispatch(setPaymentForm(values));
        addCard(values)
            .unwrap()
            .then((r: any) => {
                if (r.id) {
                    dispatch(setSelectedPaymentId(r.id))
                }
                if (totalCardsCount) {
                    setCreationStep(3)
                }
                if (setShow) {
                    setShow(false)
                }
                dispatch(setAllowNextStep(true));
                dispatch(setDisableNextButton(false));
            })
            .catch((e: any) => {
                alert(e)
                dispatch(setSelectedPaymentId(undefined))
            })
            .finally(() => {
                dispatch(setSubmitting(false));
            })
    }

    function editCard(values: any) {
        if (cardToEditId) {
            updateCard({id: cardToEditId, body: values}).unwrap().then((r) => {
                dispatch(setAllowNextStep(true));
                dispatch(setDisableNextButton(false));
                dispatch(setSubmitting(false));
                handleClose();
            })
        }
    }

    const formik = useFormik({
        validateOnMount: true,
        enableReinitialize: true,
        validationSchema: validationSchemaCard,
        initialValues: {
            name: paymentFormData ? paymentFormData.name : '',
            number: paymentFormData ? paymentFormData.number : '',
            expired: paymentFormData ? paymentFormData.expired : '',
            code: '',
            saveCard: true,
        },
        onSubmit: (values) => {
            if (isNewCard) {
                addNewCard({name: values.name.toUpperCase() , number: values.number, expired: values.expired});
            } else {
                editCard({name: values.name.toUpperCase(), number: values.number, expired: values.expired});
            }
        }
    })

    function handleClose() {
        if (setShow) {
            setShow(false)
        }
        if (setCardEdit) {
            setCardEdit(false);
        }
    }

    useEffect(() => {
        if (formik.isValid) {
            dispatch(setDisableNextButton(false))
        } else {
            dispatch(setDisableNextButton(true))
        }
    }, [formik.isValid])


    return (
        <form id='order-creation' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">{title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <QFormTextField name="name"
                                    id="filled-basic"
                                    variant="filled"
                                    label="Фамилия Имя"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    fullWidth
                                    autoComplete="off"
                                    error={!!formik.errors.name && formik.touched.name}
                                    helperText={!!formik.errors.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputMask mask="9999 9999 9999 9999" value={formik.values.number} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                        {(inputProps:any) =>
                    <QFormTextField name="number"
                                    id="filled-basic"
                                    variant="filled"
                                    label="Номер карты"
                                    value={inputProps.value}
                                    fullWidth
                                    autoComplete="off"
                                    error={!!formik.errors.number && formik.touched.number}
                                    helperText={!!formik.errors.number && formik.errors.number}
                    />}
                    </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputMask mask="99/99" value={formik.values.expired} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                        {(inputProps:any) =>
                            <QFormTextField name="expired"
                                            id="filled-basic"
                                            variant="filled"
                                            label="ММ/ГГ"
                                            value={inputProps.value}
                                            fullWidth
                                            autoComplete="off"
                                            error={!!formik.errors.expired && formik.touched.expired}
                                            helperText={!!formik.errors.expired && formik.errors.expired}
                            />}
                    </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputMask mask="999" value={formik.values.code} onBlur={formik.handleBlur} onChange={formik.handleChange}>
                        {(inputProps:any) => <QFormTextField name="code"
                                    id="filled-basic"
                                    variant="filled"
                                    label="CVV"
                                    value={inputProps.value}
                                    fullWidth
                                    autoComplete="off"
                                    error={!!formik.errors.code && formik.touched.code}
                                    helperText={!!formik.errors.code && formik.errors.code}
                    />}
                    </InputMask>
                </Grid>
                <Grid item xs={12}>
                    <QFormControlLabel
                        label='Запомнить карту'
                        name='saveCard'
                        control={
                            <QCheckbox
                                color="primary"
                                name='saveCard'
                                checked={formik.values.saveCard}
                                value={formik.values.saveCard}
                                onChange={formik.handleChange}
                            />
                        }/>
                </Grid>

                {!hideSubmit &&
                <>
                    <Grid item xs={4}>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            size='medium'
                            className={cx('button')}
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            {formik.isSubmitting && <QCircularProgress size={24}/>}Сохранить
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={cx('button')} variant='outlined' color='secondary' size='medium'
                                onClick={() => handleClose()}>Отменить</Button>
                    </Grid>
                </>
                }
            </Grid>
        </form>
    )
}

export const BankCards = ({setIsNewCard, setPrevCardId, setIsEdit}: any) => {
    const {data: bankCardsData, isFetching} = useGetCardsQuery();
    const dispatch = useAppDispatch();
    const selectedPaymentId = useAppSelector(getSelectedPaymentId);
    const [deleteCard] = useDeleteCardMutation();

    function handleDelete(id: string) {
        deleteCard(id).then(() => {
            if (id === selectedPaymentId) {
                dispatch(setSelectedPaymentId(undefined));
            }
        });
    }

    function handleEdit(cardId: string) {
        const cardToEdit = bankCardsData.data.find((card: any) => card.id === cardId);
        dispatch(setPaymentForm({...cardToEdit}));
        dispatch(setPaymentToEditId(cardId));
        dispatch(setAllowNextStep(false));
        setIsEdit(true);
    }

    function selectCard(cardId: string) {
        dispatch(setSelectedPaymentId(cardId))
        setIsNewCard(false);
    }

    function handleNewCard() {
        setIsNewCard(true);
        dispatch(clearBankCardForm());
        dispatch(setSelectedPaymentId(undefined));
        dispatch(setAllowNextStep(false));
    }

    useEffect(() => {
        if (bankCardsData && bankCardsData.data.length > 0) {
            setIsNewCard(false)
            if (!selectedPaymentId) {
                dispatch(setSelectedPaymentId(bankCardsData.data[0].id))
            }
        } else {
            setIsNewCard(true);
        }
    }, [bankCardsData])

    useEffect(() => {

        if (selectedPaymentId) {
            dispatch(setAllowNextStep(true));
            dispatch(setDisableNextButton(false))
        } else {
            dispatch(setAllowNextStep(false));
            dispatch(setDisableNextButton(true))
        }
    }, [selectedPaymentId])

    useEffect(() => {
        if (selectedPaymentId) {
            setPrevCardId(selectedPaymentId);
        }
    }, [selectedPaymentId])

    return (
        <>
            {(bankCardsData && bankCardsData.data.length > 0) &&
            <div className={cx('cards_root')}>
                <div className={cx('form-header')}>
                    <Typography variant="h2">Выберите карту</Typography>
                    <Typography sx={{color: '#D34650',
                        fontWeight: 600,
                        marginBottom: '4rem',
                        cursor: 'pointer'}} onClick={() => handleNewCard()}>Добавить новую</Typography>
                </div>
                <div className={cx('cards_content')}>
                    <Grid container spacing={2} className={cx('cards-container')}>
                        {bankCardsData.data.map((card: any) => <Grid item xs={12} sm={6} key={card.id}
                                                                     onClick={() => selectCard(card.id)}>
                                <OrderCard icon={<CreditCard/>} id={card.id}
                                           title={`...${card.number.slice(-4)}`}
                                           selected={selectedPaymentId === card.id}
                                           editCard={(e: Event) => {
                                               e.stopPropagation();
                                               handleEdit(card.id);
                                           }}
                                           deleteCard={() => handleDelete(card.id)} card={card}>
                                    <Typography variant='h6'>истекает {card.expired}</Typography>
                                    <Typography variant='h6'>{card.name}</Typography>
                                </OrderCard>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </div>}
        </>
    )

}

const PaymentStep = ({setShow, hideSubmit, isNewCard, setIsNewCard, isEdit, setIsEdit}: any) => {
    const {data: cardsData} = useGetCardsQuery();

    const [prevCardId, setPrevCardId] = useState<string>();

    return (
        <>
            {!cardsData
                ?
                <div>
                    <QCircularProgress/>
                </div>
                :
                <>
                    {!isEdit && !isNewCard &&
                    <BankCards setIsEdit={setIsEdit}
                               setIsNewCard={setIsNewCard}
                               setPrevCardId={setPrevCardId}
                               disableEdit={isNewCard}
                    />
                    }
                    {isNewCard &&
                    <PaymentByCardForm
                        isNewCard={isNewCard}
                        title='Добавить карту'
                        hideSubmit={hideSubmit}
                        setShow={setShow}
                        totalCardsCount={cardsData.data.length === 0}
                    />
                    }
                    {isEdit &&
                    <PaymentByCardForm
                        title='Редактировать карту'
                        isNewCard={isNewCard}
                        hideSubmit={hideSubmit}
                        setShow={setShow}
                        totalCardsCount={cardsData.data.length === 0}
                    />
                    }
                    {!hideSubmit && !isNewCard && !isEdit &&
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
                </>
            }
        </>
    )
}

export default PaymentStep;